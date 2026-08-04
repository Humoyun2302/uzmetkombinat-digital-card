import { useEffect, useMemo, useState, type FormEvent } from 'react'
import {
  clearToken,
  fetchContent,
  loginAdmin,
  readStoredToken,
  saveContent,
  storeToken,
  verifyAdminToken,
} from '@/content/api'
import { cloneContent, defaultContent } from '@/content/defaults'
import type { CardContent, ContactButton, Language, LocalizedString } from '@/content/types'
import {
  CONTACT_ICON_OPTIONS,
  createButtonId,
  detectActionType,
  emptyLocalized,
  LANGUAGES,
  LANGUAGE_LABELS,
  sortButtons,
} from '@/content/types'
import { ContactIcon } from '@/content/iconMap'
import { ContentProvider } from '@/content/ContentContext'
import { LanguageProvider } from '@/i18n/LanguageContext'
import { PublicCard } from '@/App'
import { cn } from '@/utils/cn'

type Section = 'profile' | 'languages' | 'buttons' | 'settings'

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

function LocalizedFields({
  label,
  value,
  onChange,
}: {
  label: string
  value: LocalizedString
  onChange: (next: LocalizedString) => void
}) {
  return (
    <div className="admin-field-group">
      <div className="admin-label">{label}</div>
      <div className="grid gap-2 sm:grid-cols-2">
        {LANGUAGES.map((lang) => (
          <label key={lang} className="admin-field">
            <span>{LANGUAGE_LABELS[lang]}</span>
            <input
              value={value[lang]}
              onChange={(event) =>
                onChange({ ...value, [lang]: event.target.value })
              }
            />
          </label>
        ))}
      </div>
    </div>
  )
}

function LoginPage({ onSuccess }: { onSuccess: (token: string) => void }) {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const token = await loginAdmin(username.trim(), password)
      storeToken(token)
      onSuccess(token)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={handleSubmit}>
        <p className="admin-kicker">Admin</p>
        <h1>Digital card CMS</h1>
        <p className="admin-login__hint">
          Sign in to manage profile, languages, and contact buttons.
        </p>

        <label className="admin-field">
          <span>Username</span>
          <input
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>

        <label className="admin-field">
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        {error ? <p className="admin-error">{error}</p> : null}

        <button type="submit" className="admin-btn admin-btn--primary" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

function ButtonEditor({
  button,
  onChange,
  onClose,
}: {
  button: ContactButton
  onChange: (next: ContactButton) => void
  onClose: () => void
}) {
  const action = detectActionType(button.href)

  return (
    <div className="admin-drawer">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-ink">Edit button</h3>
        <button type="button" className="admin-btn admin-btn--ghost" onClick={onClose}>
          Close
        </button>
      </div>

      <label className="admin-field">
        <span>Icon</span>
        <select
          value={button.icon}
          onChange={(event) =>
            onChange({
              ...button,
              icon: event.target.value as ContactButton['icon'],
            })
          }
        >
          {CONTACT_ICON_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <LocalizedFields
        label="Labels"
        value={button.labels}
        onChange={(labels) => onChange({ ...button, labels })}
      />

      <label className="admin-field">
        <span>Link</span>
        <input
          value={button.href}
          onChange={(event) => onChange({ ...button, href: event.target.value })}
          placeholder="tel:+998... / https://... / mailto:..."
        />
      </label>

      <p className="text-sm text-muted">
        Action type: <strong className="text-graphite">{action}</strong>
      </p>

      {(action === 'phone' || action === 'email') && (
        <label className="admin-field">
          <span>Subtitle (optional display value)</span>
          <input
            value={button.subtitle || ''}
            onChange={(event) =>
              onChange({ ...button, subtitle: event.target.value })
            }
            placeholder="+998 50 710 88 88"
          />
        </label>
      )}

      <label className="admin-check">
        <input
          type="checkbox"
          checked={button.visible}
          onChange={(event) =>
            onChange({ ...button, visible: event.target.checked })
          }
        />
        <span>Visible on public card</span>
      </label>
    </div>
  )
}

function AdminDashboard({
  token,
  onLogout,
}: {
  token: string
  onLogout: () => void
}) {
  const [section, setSection] = useState<Section>('profile')
  const [draft, setDraft] = useState<CardContent>(() => cloneContent(defaultContent))
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [previewLang, setPreviewLang] = useState<Language>('uz')

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const content = await fetchContent()
        if (active) setDraft(content)
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Failed to load')
        }
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => {
      active = false
    }
  }, [])

  const editingButton = useMemo(
    () => draft.buttons.find((button) => button.id === editingId) ?? null,
    [draft.buttons, editingId],
  )

  const updateDraft = (updater: (current: CardContent) => CardContent) => {
    setDraft((current) => updater(current))
    setStatus(null)
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setStatus(null)
    try {
      const normalized = {
        ...draft,
        buttons: sortButtons(draft.buttons).map((button, index) => ({
          ...button,
          order: index,
        })),
      }
      const saved = await saveContent(normalized, token)
      setDraft(saved)
      setStatus('Saved. Public card updated.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const moveButton = (id: string, direction: -1 | 1) => {
    updateDraft((current) => {
      const buttons = sortButtons(current.buttons)
      const index = buttons.findIndex((button) => button.id === id)
      const target = index + direction
      if (index < 0 || target < 0 || target >= buttons.length) return current
      const next = [...buttons]
      const [item] = next.splice(index, 1)
      next.splice(target, 0, item)
      return {
        ...current,
        buttons: next.map((button, order) => ({ ...button, order })),
      }
    })
  }

  const addButton = () => {
    const button: ContactButton = {
      id: createButtonId(),
      icon: 'link',
      labels: emptyLocalized('New button'),
      href: 'https://',
      visible: true,
      order: draft.buttons.length,
    }
    updateDraft((current) => ({
      ...current,
      buttons: [...current.buttons, button],
    }))
    setEditingId(button.id)
    setSection('buttons')
  }

  if (loading) {
    return <div className="admin-shell admin-loading">Loading admin…</div>
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <p className="admin-kicker">O‘ZMETKOMBINAT</p>
          <h1 className="admin-sidebar__title">Card admin</h1>
        </div>

        <nav className="admin-nav">
          {(
            [
              ['profile', 'Profile'],
              ['languages', 'Languages'],
              ['buttons', 'Contact buttons'],
              ['settings', 'Settings'],
            ] as Array<[Section, string]>
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={cn('admin-nav__btn', section === id && 'is-active')}
              onClick={() => setSection(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-2">
          <button
            type="button"
            className="admin-btn admin-btn--primary"
            onClick={() => void handleSave()}
            disabled={saving}
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          <button type="button" className="admin-btn admin-btn--ghost" onClick={onLogout}>
            Log out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-main__header">
          <div>
            <h2>
              {section === 'profile' && 'Profile'}
              {section === 'languages' && 'Languages'}
              {section === 'buttons' && 'Contact buttons'}
              {section === 'settings' && 'Settings'}
            </h2>
            <p>Edits appear instantly in the live preview. Click Save to publish.</p>
          </div>
          {status ? <p className="admin-status">{status}</p> : null}
          {error ? <p className="admin-error">{error}</p> : null}
        </header>

        <div className="admin-layout">
          <section className="admin-editor">
            {section === 'profile' && (
              <div className="admin-stack">
                <label className="admin-field">
                  <span>Full name</span>
                  <input
                    value={draft.profile.fullName}
                    onChange={(event) =>
                      updateDraft((current) => ({
                        ...current,
                        profile: {
                          ...current.profile,
                          fullName: event.target.value,
                        },
                      }))
                    }
                  />
                </label>

                <div className="grid gap-3 sm:grid-cols-3">
                  <label className="admin-field">
                    <span>Last name</span>
                    <input
                      value={draft.profile.lastName}
                      onChange={(event) =>
                        updateDraft((current) => ({
                          ...current,
                          profile: {
                            ...current.profile,
                            lastName: event.target.value,
                          },
                        }))
                      }
                    />
                  </label>
                  <label className="admin-field">
                    <span>First name</span>
                    <input
                      value={draft.profile.firstName}
                      onChange={(event) =>
                        updateDraft((current) => ({
                          ...current,
                          profile: {
                            ...current.profile,
                            firstName: event.target.value,
                          },
                        }))
                      }
                    />
                  </label>
                  <label className="admin-field">
                    <span>Middle name</span>
                    <input
                      value={draft.profile.middleName}
                      onChange={(event) =>
                        updateDraft((current) => ({
                          ...current,
                          profile: {
                            ...current.profile,
                            middleName: event.target.value,
                          },
                        }))
                      }
                    />
                  </label>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="admin-media">
                    <div className="admin-label">Profile photo</div>
                    <img src={draft.profile.photoUrl} alt="Profile preview" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (event) => {
                        const file = event.target.files?.[0]
                        if (!file) return
                        const dataUrl = await readFileAsDataUrl(file)
                        updateDraft((current) => ({
                          ...current,
                          profile: { ...current.profile, photoUrl: dataUrl },
                        }))
                      }}
                    />
                  </div>

                  <div className="admin-media">
                    <div className="admin-label">Logo</div>
                    <img
                      src={draft.profile.logoUrl}
                      alt="Logo preview"
                      className="admin-media__logo"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (event) => {
                        const file = event.target.files?.[0]
                        if (!file) return
                        const dataUrl = await readFileAsDataUrl(file)
                        updateDraft((current) => ({
                          ...current,
                          profile: { ...current.profile, logoUrl: dataUrl },
                        }))
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {section === 'languages' && (
              <div className="admin-stack">
                <LocalizedFields
                  label="Last name (display)"
                  value={draft.translations.displayLast}
                  onChange={(displayLast) =>
                    updateDraft((current) => ({
                      ...current,
                      translations: { ...current.translations, displayLast },
                    }))
                  }
                />
                <LocalizedFields
                  label="Given names (display)"
                  value={draft.translations.displayGiven}
                  onChange={(displayGiven) =>
                    updateDraft((current) => ({
                      ...current,
                      translations: { ...current.translations, displayGiven },
                    }))
                  }
                />
                <LocalizedFields
                  label="Position"
                  value={draft.translations.position}
                  onChange={(position) =>
                    updateDraft((current) => ({
                      ...current,
                      translations: { ...current.translations, position },
                    }))
                  }
                />
                <LocalizedFields
                  label="Organization"
                  value={draft.translations.organization}
                  onChange={(organization) =>
                    updateDraft((current) => ({
                      ...current,
                      translations: { ...current.translations, organization },
                    }))
                  }
                />
              </div>
            )}

            {section === 'buttons' && (
              <div className="admin-stack">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-muted">
                    Add, reorder, hide, or edit contact buttons.
                  </p>
                  <button
                    type="button"
                    className="admin-btn admin-btn--primary"
                    onClick={addButton}
                  >
                    Add button
                  </button>
                </div>

                <div className="admin-button-list">
                  {sortButtons(draft.buttons).map((button, index) => (
                    <div key={button.id} className="admin-button-row">
                      <div className="admin-button-row__icon">
                        <ContactIcon id={button.icon} className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold text-ink">
                          {button.labels.en || button.labels.uz || 'Button'}
                        </div>
                        <div className="truncate text-sm text-muted">
                          {button.href}
                        </div>
                      </div>
                      <span
                        className={cn(
                          'admin-pill',
                          button.visible ? 'is-on' : 'is-off',
                        )}
                      >
                        {button.visible ? 'Visible' : 'Hidden'}
                      </span>
                      <span className="admin-pill">#{index + 1}</span>
                      <div className="flex flex-wrap gap-1">
                        <button
                          type="button"
                          className="admin-btn admin-btn--ghost"
                          onClick={() => moveButton(button.id, -1)}
                        >
                          Up
                        </button>
                        <button
                          type="button"
                          className="admin-btn admin-btn--ghost"
                          onClick={() => moveButton(button.id, 1)}
                        >
                          Down
                        </button>
                        <button
                          type="button"
                          className="admin-btn admin-btn--ghost"
                          onClick={() =>
                            updateDraft((current) => ({
                              ...current,
                              buttons: current.buttons.map((item) =>
                                item.id === button.id
                                  ? { ...item, visible: !item.visible }
                                  : item,
                              ),
                            }))
                          }
                        >
                          {button.visible ? 'Hide' : 'Show'}
                        </button>
                        <button
                          type="button"
                          className="admin-btn admin-btn--ghost"
                          onClick={() => setEditingId(button.id)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="admin-btn admin-btn--danger"
                          onClick={() => {
                            updateDraft((current) => ({
                              ...current,
                              buttons: current.buttons
                                .filter((item) => item.id !== button.id)
                                .map((item, order) => ({ ...item, order })),
                            }))
                            if (editingId === button.id) setEditingId(null)
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {editingButton ? (
                  <ButtonEditor
                    button={editingButton}
                    onClose={() => setEditingId(null)}
                    onChange={(next) =>
                      updateDraft((current) => ({
                        ...current,
                        buttons: current.buttons.map((item) =>
                          item.id === next.id ? next : item,
                        ),
                      }))
                    }
                  />
                ) : null}
              </div>
            )}

            {section === 'settings' && (
              <div className="admin-stack">
                <label className="admin-check">
                  <input
                    type="checkbox"
                    checked={draft.settings.showSaveContact}
                    onChange={(event) =>
                      updateDraft((current) => ({
                        ...current,
                        settings: {
                          ...current.settings,
                          showSaveContact: event.target.checked,
                        },
                      }))
                    }
                  />
                  <span>Show “Save contact” button</span>
                </label>

                <label className="admin-field">
                  <span>Footer website URL</span>
                  <input
                    value={draft.settings.footerWebsiteHref}
                    onChange={(event) =>
                      updateDraft((current) => ({
                        ...current,
                        settings: {
                          ...current.settings,
                          footerWebsiteHref: event.target.value,
                        },
                      }))
                    }
                  />
                </label>

                <label className="admin-field">
                  <span>Footer website label</span>
                  <input
                    value={draft.settings.footerWebsiteLabel}
                    onChange={(event) =>
                      updateDraft((current) => ({
                        ...current,
                        settings: {
                          ...current.settings,
                          footerWebsiteLabel: event.target.value,
                        },
                      }))
                    }
                  />
                </label>

                <LocalizedFields
                  label="Save contact label"
                  value={draft.translations.saveContact}
                  onChange={(saveContact) =>
                    updateDraft((current) => ({
                      ...current,
                      translations: { ...current.translations, saveContact },
                    }))
                  }
                />
              </div>
            )}
          </section>

          <aside className="admin-preview">
            <div className="admin-preview__toolbar">
              <span className="admin-label">Live preview</span>
              <div className="lang-switcher">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    className={cn(
                      'lang-switcher__btn',
                      previewLang === lang && 'is-active',
                    )}
                    onClick={() => setPreviewLang(lang)}
                  >
                    {LANGUAGE_LABELS[lang]}
                  </button>
                ))}
              </div>
            </div>
            <div className="admin-preview__frame">
              <ContentProvider value={draft}>
                <LanguageProvider
                  language={previewLang}
                  onLanguageChange={setPreviewLang}
                >
                  <div className="pointer-events-none origin-top scale-[0.82] sm:scale-90">
                    <PublicCard preview className="flex flex-col" />
                  </div>
                </LanguageProvider>
              </ContentProvider>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default function AdminApp() {
  const [token, setToken] = useState<string | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let active = true
    ;(async () => {
      const stored = readStoredToken()
      if (!stored) {
        if (active) {
          setChecking(false)
        }
        return
      }
      const valid = await verifyAdminToken(stored)
      if (!active) return
      if (valid) setToken(stored)
      else clearToken()
      setChecking(false)
    })()
    return () => {
      active = false
    }
  }, [])

  if (checking) {
    return <div className="admin-shell admin-loading">Checking session…</div>
  }

  if (!token) {
    return (
      <LoginPage
        onSuccess={(nextToken) => {
          setToken(nextToken)
        }}
      />
    )
  }

  return (
    <AdminDashboard
      token={token}
      onLogout={() => {
        clearToken()
        setToken(null)
      }}
    />
  )
}
