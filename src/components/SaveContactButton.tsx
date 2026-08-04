import { ContactSaveIcon } from '@/components/Icons'
import { useContent } from '@/content/ContentContext'
import { buildVCardFromContent } from '@/content/defaults'
import { useLanguage } from '@/i18n/LanguageContext'

function isAppleMobile() {
  if (typeof navigator === 'undefined') return false
  return /iPad|iPhone|iPod/i.test(navigator.userAgent)
}

export function SaveContactButton() {
  const { t } = useLanguage()
  const { content } = useContent()

  const handleSave = () => {
    const vcard = buildVCardFromContent(content)
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const filename = `${content.profile.lastName}_${content.profile.firstName}.vcf`

    if (isAppleMobile()) {
      window.location.assign(url)
      window.setTimeout(() => URL.revokeObjectURL(url), 2000)
      return
    }

    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = filename
    anchor.rel = 'noopener'
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 2000)
  }

  return (
    <button
      type="button"
      className="save-contact"
      onClick={handleSave}
      aria-label={t.saveContact}
    >
      <ContactSaveIcon className="h-5 w-5 text-orange" />
      <span>{t.saveContact}</span>
    </button>
  )
}
