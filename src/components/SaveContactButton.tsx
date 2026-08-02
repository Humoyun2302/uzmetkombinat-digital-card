import { profile } from '@/data/contact'
import { ContactSaveIcon } from '@/components/Icons'
import { useLanguage } from '@/i18n/LanguageContext'

function isAppleMobile() {
  if (typeof navigator === 'undefined') return false
  return /iPad|iPhone|iPod/i.test(navigator.userAgent)
}

export function SaveContactButton() {
  const { t } = useLanguage()

  const handleSave = () => {
    if (isAppleMobile()) {
      window.location.assign('/abdullayev.vcf')
      return
    }

    const filename = `${profile.lastName}_${profile.firstName}.vcf`
    const anchor = document.createElement('a')
    anchor.href = '/abdullayev.vcf'
    anchor.download = filename
    anchor.rel = 'noopener'
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
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
