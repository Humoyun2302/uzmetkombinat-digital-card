import { profile } from '@/data/contact'
import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/utils/cn'

export function Footer() {
  const { language, t } = useLanguage()

  return (
    <footer className="border-t border-border/80 px-5 pb-7 pt-6 sm:px-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <img
          src="/logo.png"
          alt=""
          className="h-auto w-[148px] opacity-95"
          width={148}
          height={41}
          decoding="async"
        />
        <p
          className={cn(
            'font-semibold text-graphite',
            language === 'zh'
              ? 'text-[0.95rem] tracking-normal'
              : 'font-display text-[0.95rem] tracking-[0.05em]',
          )}
        >
          {t.organization}
        </p>
        <a
          href={profile.website.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.9rem] font-medium text-muted transition-colors duration-200 hover:text-orange"
        >
          {profile.website.display}
        </a>
      </div>
    </footer>
  )
}
