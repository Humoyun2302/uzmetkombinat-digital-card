import { profile } from '@/data/contact'
import { ProfileHeader } from '@/components/ProfileHeader'
import { ContactCard } from '@/components/ContactCard'
import { SaveContactButton } from '@/components/SaveContactButton'
import { Footer } from '@/components/Footer'
import { Toast } from '@/components/Toast'
import {
  EmailIcon,
  PhoneIcon,
  TelegramIcon,
  WebsiteIcon,
  WeChatIcon,
  WikipediaIcon,
} from '@/components/Icons'
import { useCopyToast } from '@/hooks/useCopyToast'
import { useLanguage } from '@/i18n/LanguageContext'

export default function App() {
  const { t } = useLanguage()
  const { copy, visible, message } = useCopyToast(t.copied)

  return (
    <div className="flex min-h-dvh flex-col pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] sm:px-6 sm:py-12 lg:py-16">
      <div className="page-shell flex flex-1 flex-col">
        <article className="card-panel flex min-h-dvh flex-col sm:min-h-0">
          <ProfileHeader />

          <div className="section-rule mx-auto w-[78%]" />

          <section
            className="flex flex-col gap-3 px-4 py-5 sm:px-5"
            aria-label={t.contactsSection}
          >
            {profile.phones.map((phone) => (
              <ContactCard
                key={phone.id}
                href={phone.href}
                title={t.phone}
                subtitle={phone.display}
                icon={<PhoneIcon className="h-full w-full" />}
                ariaLabel={`${t.phone}: ${phone.display}`}
                copyValue={phone.display}
                onCopy={copy}
              />
            ))}

            <ContactCard
              href={profile.telegram.href}
              title={t.telegram}
              icon={<TelegramIcon className="h-full w-full" />}
              ariaLabel={`${t.telegram}: ${profile.telegram.display}`}
              external
            />

            <ContactCard
              href={profile.wechat.href}
              title={t.wechat}
              icon={<WeChatIcon className="h-full w-full" />}
              ariaLabel={t.wechat}
              external
            />

            <ContactCard
              href={profile.wikipedia.href}
              title={t.wikipedia}
              icon={<WikipediaIcon className="h-full w-full" />}
              ariaLabel={t.wikipedia}
              external
            />

            <ContactCard
              href={profile.email.href}
              title={t.email}
              icon={<EmailIcon className="h-full w-full" />}
              ariaLabel={`${t.email}: ${profile.email.display}`}
            />

            <ContactCard
              href={profile.website.href}
              title={t.website}
              icon={<WebsiteIcon className="h-full w-full" />}
              ariaLabel={`${t.website}: ${profile.website.display}`}
              external
            />

            <div className="pt-1">
              <SaveContactButton />
            </div>
          </section>

          <Footer />
        </article>
      </div>

      <Toast message={message} visible={visible} />
    </div>
  )
}
