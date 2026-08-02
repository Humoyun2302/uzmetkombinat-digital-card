import { profile } from '@/data/contact'
import { TopAccentBar } from '@/components/CorporateDecoration'
import { HeroPortrait } from '@/components/HeroPortrait'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/utils/cn'

export function ProfileHeader() {
  const { language, t } = useLanguage()

  return (
    <header className="relative">
      <TopAccentBar className="absolute inset-x-0 top-0 z-20 sm:rounded-t-[22px]" />

      <div className="relative z-10 px-4 pb-4 pt-4 sm:px-6 sm:pt-5">
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>

        <div className="mt-3 flex justify-center">
          <img
            src="/logo.png"
            alt="O‘ZMETKOMBINAT"
            className="h-auto w-[min(100%,248px)] select-none"
            width={248}
            height={69}
            decoding="async"
          />
        </div>
      </div>

      <HeroPortrait />

      <div className="relative z-10 -mt-10 flex flex-col items-center px-5 pb-5 text-center sm:-mt-12 sm:px-6 sm:pb-6">
        <div className="max-w-[22rem]">
          <h1 className="font-display text-[1.85rem] font-semibold leading-[0.95] tracking-[0.04em] text-ink sm:text-[2rem]">
            <span className="block">{profile.displayLast}</span>
            <span className="mt-1 block text-[1.35rem] font-medium tracking-[0.035em] text-graphite sm:text-[1.45rem]">
              {profile.displayGiven}
            </span>
          </h1>

          <p
            className={cn(
              'mt-3 font-medium leading-snug text-muted',
              language === 'zh' ? 'text-[0.98rem]' : 'text-[0.95rem]',
              language === 'ru' && 'text-balance',
            )}
          >
            {t.position}
          </p>
          <p
            className={cn(
              'mt-1.5 font-semibold text-graphite',
              language === 'zh'
                ? 'text-[1rem] tracking-normal'
                : 'font-display text-[1.05rem] tracking-[0.06em]',
            )}
          >
            {t.organization}
          </p>
        </div>
      </div>
    </header>
  )
}
