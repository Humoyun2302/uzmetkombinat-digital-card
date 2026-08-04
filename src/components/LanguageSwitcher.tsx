import { cn } from '@/utils/cn'
import { useLanguage, languageOptions } from '@/i18n/LanguageContext'
import type { Language } from '@/content/types'

type LanguageSwitcherProps = {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className={cn('lang-switcher', className)}
      role="group"
      aria-label="Language"
    >
      {languageOptions.map((option) => {
        const active = language === option.code
        return (
          <button
            key={option.code}
            type="button"
            className={cn('lang-switcher__btn', active && 'is-active')}
            aria-pressed={active}
            onClick={() => {
              if (option.code === language) return
              setLanguage(option.code as Language)
            }}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
