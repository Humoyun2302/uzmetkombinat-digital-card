import { useState } from 'react'
import { ProfileHeader } from '@/components/ProfileHeader'
import { ContactCard } from '@/components/ContactCard'
import { SaveContactButton } from '@/components/SaveContactButton'
import { Footer } from '@/components/Footer'
import { Toast } from '@/components/Toast'
import { WeChatQrModal } from '@/components/WeChatQrModal'
import { ContactIcon } from '@/content/iconMap'
import { useContent } from '@/content/ContentContext'
import {
  buttonLabel,
  buttonSubtitle,
} from '@/content/defaults'
import { detectActionType, visibleButtons } from '@/content/types'
import { useCopyToast } from '@/hooks/useCopyToast'
import { useLanguage } from '@/i18n/LanguageContext'

type PublicCardProps = {
  preview?: boolean
  className?: string
}

export function PublicCard({ preview = false, className }: PublicCardProps) {
  const { t, language } = useLanguage()
  const { content, loading } = useContent()
  const { copy, visible, message } = useCopyToast(t.copied)
  const [wechatOpen, setWechatOpen] = useState(false)
  const buttons = visibleButtons(content.buttons)

  return (
    <div
      className={
        className ??
        'flex min-h-dvh flex-col pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] sm:px-6 sm:py-12 lg:py-16'
      }
    >
      <div className="page-shell flex flex-1 flex-col">
        <article
          className={
            preview
              ? 'card-panel flex flex-col overflow-hidden'
              : 'card-panel flex min-h-dvh flex-col sm:min-h-0'
          }
        >
          {loading && !preview ? (
            <div className="flex flex-1 items-center justify-center px-6 py-20 text-sm text-muted">
              Loading…
            </div>
          ) : (
            <>
              <ProfileHeader />

              <div className="section-rule mx-auto w-[78%]" />

              <section
                className="flex flex-col gap-3 px-4 py-5 sm:px-5"
                aria-label={t.contactsSection}
              >
                {buttons.map((button) => {
                  const action = detectActionType(button.href)
                  const label = buttonLabel(button, language)
                  const subtitle =
                    action === 'phone' ? buttonSubtitle(button) : undefined
                  const isWeChat = button.id === 'wechat'
                  const external = action === 'external' && !isWeChat

                  return (
                    <ContactCard
                      key={button.id}
                      href={isWeChat ? '#wechat-qr' : button.href}
                      title={label}
                      subtitle={subtitle}
                      icon={
                        <ContactIcon
                          id={button.icon}
                          className="h-full w-full"
                        />
                      }
                      ariaLabel={subtitle ? `${label}: ${subtitle}` : label}
                      external={external}
                      copyValue={action === 'phone' ? subtitle : undefined}
                      onCopy={action === 'phone' ? copy : undefined}
                      onActivate={
                        isWeChat ? () => setWechatOpen(true) : undefined
                      }
                    />
                  )
                })}

                {content.settings.showSaveContact ? (
                  <div className="pt-1">
                    <SaveContactButton />
                  </div>
                ) : null}
              </section>

              <Footer />
            </>
          )}
        </article>
      </div>

      {!preview ? <Toast message={message} visible={visible} /> : null}

      <WeChatQrModal
        open={wechatOpen}
        language={language}
        onClose={() => setWechatOpen(false)}
      />
    </div>
  )
}

export default function App() {
  return <PublicCard />
}
