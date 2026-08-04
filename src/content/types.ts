export type Language = 'uz' | 'ru' | 'en' | 'zh'

export type LocalizedString = Record<Language, string>

export const LANGUAGES: Language[] = ['uz', 'ru', 'en', 'zh']

export const LANGUAGE_LABELS: Record<Language, string> = {
  uz: 'UZ',
  ru: 'RU',
  en: 'EN',
  zh: '中文',
}

export type ContactIconId =
  | 'phone'
  | 'telegram'
  | 'whatsapp'
  | 'wechat'
  | 'email'
  | 'website'
  | 'wikipedia'
  | 'instagram'
  | 'facebook'
  | 'linkedin'
  | 'location'
  | 'link'

export const CONTACT_ICON_OPTIONS: Array<{
  id: ContactIconId
  label: string
}> = [
  { id: 'phone', label: 'Phone' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'wechat', label: 'WeChat' },
  { id: 'email', label: 'Email' },
  { id: 'website', label: 'Website' },
  { id: 'wikipedia', label: 'Wikipedia' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'location', label: 'Location' },
  { id: 'link', label: 'Link' },
]

export type ContactActionType = 'phone' | 'email' | 'external'

export type ContactButton = {
  id: string
  icon: ContactIconId
  labels: LocalizedString
  href: string
  subtitle?: string
  visible: boolean
  order: number
}

export type CardContent = {
  version: 1
  profile: {
    fullName: string
    firstName: string
    lastName: string
    middleName: string
    photoUrl: string
    logoUrl: string
  }
  translations: {
    displayLast: LocalizedString
    displayGiven: LocalizedString
    position: LocalizedString
    organization: LocalizedString
    saveContact: LocalizedString
    copied: LocalizedString
    contactsSection: LocalizedString
  }
  buttons: ContactButton[]
  settings: {
    showSaveContact: boolean
    footerWebsiteHref: string
    footerWebsiteLabel: string
  }
}

export function emptyLocalized(value = ''): LocalizedString {
  return { uz: value, ru: value, en: value, zh: value }
}

export function detectActionType(href: string): ContactActionType {
  const value = href.trim().toLowerCase()
  if (value.startsWith('tel:')) return 'phone'
  if (value.startsWith('mailto:')) return 'email'
  return 'external'
}

export function isLanguage(value: string | null | undefined): value is Language {
  return value === 'uz' || value === 'ru' || value === 'en' || value === 'zh'
}

export function sortButtons(buttons: ContactButton[]): ContactButton[] {
  return [...buttons].sort((a, b) => a.order - b.order)
}

export function visibleButtons(buttons: ContactButton[]): ContactButton[] {
  return sortButtons(buttons).filter((button) => button.visible)
}

export function createButtonId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `btn-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
