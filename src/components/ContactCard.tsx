import type { ReactNode, MouseEvent } from 'react'
import { cn } from '@/utils/cn'
import { ChevronIcon, CopyIcon } from '@/components/Icons'

type ContactCardProps = {
  href: string
  title: string
  subtitle: string
  icon: ReactNode
  ariaLabel: string
  external?: boolean
  copyValue?: string
  onCopy?: (value: string) => void
  className?: string
}

export function ContactCard({
  href,
  title,
  subtitle,
  icon,
  ariaLabel,
  external = false,
  copyValue,
  onCopy,
  className,
}: ContactCardProps) {
  const handleCopy = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (copyValue && onCopy) onCopy(copyValue)
  }

  return (
    <a
      href={href}
      className={cn('contact-card', className)}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="contact-icon">
        <span className="h-[22px] w-[22px]">{icon}</span>
      </span>

      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[0.82rem] font-medium uppercase tracking-[0.08em] text-muted">
          {title}
        </span>
        <span className="mt-0.5 block break-all text-[0.95rem] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[0.98rem]">
          {subtitle}
        </span>
      </span>

      <span className="flex shrink-0 items-center gap-0.5">
        {copyValue && onCopy ? (
          <button
            type="button"
            className="copy-btn"
            aria-label={`${subtitle} nusxalash`}
            onClick={handleCopy}
          >
            <CopyIcon className="h-[15px] w-[15px]" />
          </button>
        ) : null}
        <span className="text-steel">
          <ChevronIcon className="h-[18px] w-[18px]" />
        </span>
      </span>
    </a>
  )
}
