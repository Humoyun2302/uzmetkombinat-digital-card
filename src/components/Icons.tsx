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

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M12 3.75a8.25 8.25 0 0 0-7.1 12.45L3.75 20.25l4.2-1.1A8.25 8.25 0 1 0 12 3.75Z" />
      <path d="M9.4 8.6c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.3l.7 1.7c.1.2 0 .4-.1.6l-.4.5c-.1.1-.1.3 0 .4.4.7 1.1 1.4 1.8 1.8.2.1.3.1.4 0l.5-.4c.2-.1.4-.2.6-.1l1.7.7c.3.1.3.3.3.5v.5c0 .2 0 .4-.4.6-.4.2-1 .4-1.6.3-1.5-.2-3.1-1.1-4.3-2.3-1.2-1.2-2-2.8-2.3-4.3-.1-.6.1-1.2.3-1.6Z" />
    </svg>
  )
}

export function WeChatIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M9.2 4.6C5.7 4.6 2.9 6.9 2.9 9.8c0 1.7 1 3.2 2.6 4.1l-.4 1.7 1.9-1c.6.2 1.3.3 2 .3.2 0 .5 0 .7 0-.1-.4-.2-.9-.2-1.3 0-2.8 2.6-5.1 5.8-5.1.2 0 .5 0 .7.1C14.8 6.3 12.3 4.6 9.2 4.6Z" />
      <path d="M8.2 8.3a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Zm3.8 0a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Z" />
      <path d="M18.3 11.2c-2.6 0-4.7 1.7-4.7 3.8 0 1.3.8 2.4 2.1 3.1l-.3 1.2 1.5-.8c.4.1.9.2 1.4.2 2.6 0 4.7-1.7 4.7-3.7s-2.1-3.8-4.7-3.8Z" />
      <path d="M16.7 14.3a.55.55 0 1 1 0-1.1.55.55 0 0 1 0 1.1Zm2.9 0a.55.55 0 1 1 0-1.1.55.55 0 0 1 0 1.1Z" />
    </svg>
  )
}

export function WikipediaIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M3.5 6.5h2.8l2.6 10.5L12 6.5l3.1 10.5L17.7 6.5h2.8" />
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.75" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M14 8.5h2.5V5.8H14c-2.2 0-3.7 1.4-3.7 3.8v1.7H8.2v2.8h2.1V20h3.1v-5.9h2.4l.5-2.8h-2.9V9.8c0-.7.3-1.3 1.6-1.3Z" />
    </svg>
  )
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M8 10.5V16M8 7.8v.2M12 16v-3.2c0-1.2.8-2 1.9-2 1.1 0 1.6.8 1.6 2V16M12 10.5V16" />
    </svg>
  )
}

export function LocationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  )
}

export function LinkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M10 13a5 5 0 0 0 7.1.2l1.7-1.7a5 5 0 0 0-7.1-7.1L10.2 6" />
      <path d="M14 11a5 5 0 0 0-7.1-.2L5.2 12.5a5 5 0 0 0 7.1 7.1L14 18" />
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
