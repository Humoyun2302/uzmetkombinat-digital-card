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
} from '@/components/Icons'
import { useCopyToast } from '@/hooks/useCopyToast'

export default function App() {
  const { copy, visible, message } = useCopyToast()

  return (
    <div className="flex min-h-dvh flex-col px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:py-12 lg:py-16">
      <div className="page-shell flex flex-1 flex-col justify-center">
        <article className="card-panel sm:shadow-[0_20px_50px_rgba(30,36,48,0.10)]">
          <ProfileHeader />

          <div className="section-rule mx-auto w-[78%]" />

          <section
            className="flex flex-col gap-3 px-4 py-5 sm:px-5"
            aria-label="Aloqa ma'lumotlari"
          >
            {profile.phones.map((phone) => (
              <ContactCard
                key={phone.id}
                href={phone.href}
                title={phone.label}
                subtitle={phone.display}
                icon={<PhoneIcon className="h-full w-full" />}
                ariaLabel={`${phone.label}: ${phone.display}`}
                copyValue={phone.display}
                onCopy={copy}
              />
            ))}

            <ContactCard
              href={profile.telegram.href}
              title={profile.telegram.label}
              subtitle={profile.telegram.display}
              icon={<TelegramIcon className="h-full w-full" />}
              ariaLabel={`Telegram: ${profile.telegram.display}`}
              external
              copyValue={profile.telegram.copyValue}
              onCopy={copy}
            />

            <ContactCard
              href={profile.email.href}
              title={profile.email.label}
              subtitle={profile.email.display}
              icon={<EmailIcon className="h-full w-full" />}
              ariaLabel={`Email: ${profile.email.display}`}
              copyValue={profile.email.copyValue}
              onCopy={copy}
            />

            <ContactCard
              href={profile.website.href}
              title={profile.website.label}
              subtitle={profile.website.display}
              icon={<WebsiteIcon className="h-full w-full" />}
              ariaLabel={`Veb-sayt: ${profile.website.display}`}
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
