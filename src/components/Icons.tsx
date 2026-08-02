import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M8.2 4.8c.3-.7 1.1-1.1 1.8-.9l1.7.5c.7.2 1.1.9.9 1.6l-.5 1.8a1.4 1.4 0 0 1-1.2 1l-.7.1a9.6 9.6 0 0 0 4.7 4.7l.1-.7a1.4 1.4 0 0 1 1-1.2l1.8-.5c.7-.2 1.4.2 1.6.9l.5 1.7c.2.7-.2 1.5-.9 1.8l-1.3.5a3.3 3.3 0 0 1-2.6-.3A15.4 15.4 0 0 1 6.3 9.6a3.3 3.3 0 0 1-.3-2.6l.5-1.3Z" />
    </svg>
  )
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M20.4 4.7 3.9 11.1c-1.1.4-1.1 1.1-.2 1.4l4.2 1.3 1.6 5c.2.6.1.8.8.8.5 0 .7-.2 1-.5l2.4-2.3 4.9 3.6c.9.5 1.5.2 1.8-.8L21.6 6c.3-1.2-.4-1.7-1.2-1.3Z" />
      <path d="m9.8 13.7 8.4-5.3c.4-.2.8 0 .5.3l-6.8 6.4-.3 2.9" />
    </svg>
  )
}

export function EmailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
    </svg>
  )
}

export function WebsiteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M3.75 12h16.5M12 3.75c2.4 2.6 3.6 5.3 3.6 8.25S14.4 17.65 12 20.25C9.6 17.65 8.4 14.95 8.4 12S9.6 6.35 12 3.75Z" />
    </svg>
  )
}

export function ChevronIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

export function CopyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
      <path d="M15.5 8.5V6.8A2.3 2.3 0 0 0 13.2 4.5H6.8A2.3 2.3 0 0 0 4.5 6.8v6.4A2.3 2.3 0 0 0 6.8 15.5H8.5" />
    </svg>
  )
}

export function ContactSaveIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="3.5" />
      <path d="M19 8v6M16 11h6" />
    </svg>
  )
}
