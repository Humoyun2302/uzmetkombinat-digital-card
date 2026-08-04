import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useContent } from '@/content/ContentContext'
import {
  isLanguage,
  LANGUAGE_LABELS,
  LANGUAGES,
  type Language,
} from '@/content/types'

export const LANGUAGE_STORAGE_KEY = 'preferredLanguage'

export const languageOptions = LANGUAGES.map((code) => ({
  code,
  label: LANGUAGE_LABELS[code],
}))

type UiStrings = {
  displayLast: string
  displayGiven: string
  position: string
  organization: string
  saveContact: string
  copied: string
  contactsSection: string
}

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: UiStrings
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (isLanguage(stored)) return stored
  } catch {
    // Ignore storage access errors
  }
  return 'uz'
}

type LanguageProviderProps = {
  children: ReactNode
  /** Controlled language for admin preview */
  language?: Language
  onLanguageChange?: (language: Language) => void
}

export function LanguageProvider({
  children,
  language: controlledLanguage,
  onLanguageChange,
}: LanguageProviderProps) {
  const { content } = useContent()
  const [uncontrolledLanguage, setUncontrolledLanguage] = useState<Language>(
    () => {
      if (typeof window === 'undefined') return 'uz'
      return readStoredLanguage()
    },
  )

  const language = controlledLanguage ?? uncontrolledLanguage

  const setLanguage = useCallback(
    (next: Language) => {
      if (onLanguageChange) {
        onLanguageChange(next)
        return
      }
      setUncontrolledLanguage(next)
    },
    [onLanguageChange],
  )

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : language
    document.documentElement.dataset.lang = language
    if (controlledLanguage) return
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    } catch {
      // Ignore storage access errors
    }
  }, [language, controlledLanguage])

  const t = useMemo<UiStrings>(
    () => ({
      displayLast: content.translations.displayLast[language],
      displayGiven: content.translations.displayGiven[language],
      position: content.translations.position[language],
      organization: content.translations.organization[language],
      saveContact: content.translations.saveContact[language],
      copied: content.translations.copied[language],
      contactsSection: content.translations.contactsSection[language],
    }),
    [content.translations, language],
  )

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
