import type { ReactNode } from 'react'
import {
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  LinkIcon,
  LinkedInIcon,
  LocationIcon,
  PhoneIcon,
  TelegramIcon,
  WebsiteIcon,
  WeChatIcon,
  WhatsAppIcon,
  WikipediaIcon,
} from '@/components/Icons'
import type { ContactIconId } from '@/content/types'

const iconMap: Record<
  ContactIconId,
  (props: { className?: string }) => ReactNode
> = {
  phone: (props) => <PhoneIcon {...props} />,
  telegram: (props) => <TelegramIcon {...props} />,
  whatsapp: (props) => <WhatsAppIcon {...props} />,
  wechat: (props) => <WeChatIcon {...props} />,
  email: (props) => <EmailIcon {...props} />,
  website: (props) => <WebsiteIcon {...props} />,
  wikipedia: (props) => <WikipediaIcon {...props} />,
  instagram: (props) => <InstagramIcon {...props} />,
  facebook: (props) => <FacebookIcon {...props} />,
  linkedin: (props) => <LinkedInIcon {...props} />,
  location: (props) => <LocationIcon {...props} />,
  link: (props) => <LinkIcon {...props} />,
}

export function ContactIcon({
  id,
  className,
}: {
  id: ContactIconId
  className?: string
}) {
  const render = iconMap[id] ?? iconMap.link
  return <>{render({ className })}</>
}
