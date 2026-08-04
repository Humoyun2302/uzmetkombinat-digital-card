import defaultContentJson from '../../shared/default-content.json'
import type { CardContent, ContactButton, Language } from '@/content/types'
import { detectActionType, sortButtons } from '@/content/types'

export const defaultContent = defaultContentJson as CardContent

export function cloneContent(content: CardContent): CardContent {
  return structuredClone(content)
}

export function normalizeContent(input: unknown): CardContent {
  const base = cloneContent(defaultContent)
  if (!input || typeof input !== 'object') return base

  const raw = input as Partial<CardContent>
  const buttons = Array.isArray(raw.buttons)
    ? raw.buttons
        .filter((button): button is ContactButton => {
          return (
            !!button &&
            typeof button === 'object' &&
            typeof button.id === 'string' &&
            typeof button.href === 'string' &&
            typeof button.icon === 'string'
          )
        })
        .map((button, index) => ({
          id: button.id,
          icon: button.icon,
          labels: {
            uz: button.labels?.uz ?? '',
            ru: button.labels?.ru ?? '',
            en: button.labels?.en ?? '',
            zh: button.labels?.zh ?? '',
          },
          href: button.href,
          subtitle: button.subtitle || undefined,
          visible: button.visible !== false,
          order: typeof button.order === 'number' ? button.order : index,
        }))
    : base.buttons

  return {
    version: 1,
    profile: {
      ...base.profile,
      ...(raw.profile ?? {}),
    },
    translations: {
      displayLast: { ...base.translations.displayLast, ...raw.translations?.displayLast },
      displayGiven: {
        ...base.translations.displayGiven,
        ...raw.translations?.displayGiven,
      },
      position: { ...base.translations.position, ...raw.translations?.position },
      organization: {
        ...base.translations.organization,
        ...raw.translations?.organization,
      },
      saveContact: {
        ...base.translations.saveContact,
        ...raw.translations?.saveContact,
      },
      copied: { ...base.translations.copied, ...raw.translations?.copied },
      contactsSection: {
        ...base.translations.contactsSection,
        ...raw.translations?.contactsSection,
      },
    },
    buttons: sortButtons(buttons),
    settings: {
      ...base.settings,
      ...(raw.settings ?? {}),
    },
  }
}

export function buttonLabel(button: ContactButton, language: Language): string {
  return button.labels[language] || button.labels.en || button.labels.uz || 'Link'
}

export function buttonSubtitle(button: ContactButton): string | undefined {
  if (button.subtitle?.trim()) return button.subtitle.trim()
  const action = detectActionType(button.href)
  if (action === 'phone') {
    return button.href.replace(/^tel:/i, '').trim() || undefined
  }
  if (action === 'email') {
    return button.href.replace(/^mailto:/i, '').trim() || undefined
  }
  return undefined
}

export function buildVCardFromContent(content: CardContent): string {
  const phones = sortButtons(content.buttons).filter(
    (button) => button.visible && detectActionType(button.href) === 'phone',
  )
  const emails = sortButtons(content.buttons).filter(
    (button) => button.visible && detectActionType(button.href) === 'email',
  )
  const websites = sortButtons(content.buttons).filter(
    (button) =>
      button.visible &&
      detectActionType(button.href) === 'external' &&
      button.icon === 'website',
  )

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${content.profile.lastName};${content.profile.firstName};${content.profile.middleName};;`,
    `FN:${content.profile.fullName}`,
    `ORG:${content.translations.organization.uz}`,
    `TITLE:${content.translations.position.uz}`,
  ]

  for (const phone of phones) {
    lines.push(`TEL;TYPE=CELL,VOICE:${phone.href.replace(/^tel:/i, '')}`)
  }
  for (const email of emails) {
    lines.push(`EMAIL;TYPE=INTERNET:${email.href.replace(/^mailto:/i, '')}`)
  }
  const website = websites[0]?.href || content.settings.footerWebsiteHref
  if (website) lines.push(`URL:${website}`)
  lines.push('END:VCARD')
  return lines.join('\r\n')
}
