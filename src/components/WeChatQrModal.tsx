import { useEffect, useId, useRef } from 'react'
import { CloseIcon } from '@/components/Icons'
import type { Language } from '@/content/types'

const WECHAT_QR_SRC = '/assets/wechat-qr.png'

const COPY: Record<
  Language,
  { title: string; subtitle: string; close: string; imageAlt: string }
> = {
  uz: {
    title: 'WeChat',
    subtitle: 'WeChat orqali bog‘lanish uchun QR-kodni skanerlang',
    close: 'Yopish',
    imageAlt: 'WeChat QR-kod',
  },
  ru: {
    title: 'WeChat',
    subtitle: 'Отсканируйте QR-код, чтобы связаться через WeChat',
    close: 'Закрыть',
    imageAlt: 'QR-код WeChat',
  },
  en: {
    title: 'WeChat',
    subtitle: 'Scan the QR code to connect via WeChat',
    close: 'Close',
    imageAlt: 'WeChat QR code',
  },
  zh: {
    title: '微信',
    subtitle: '扫描二维码，通过微信联系',
    close: '关闭',
    imageAlt: '微信二维码',
  },
}

type WeChatQrModalProps = {
  open: boolean
  language: Language
  onClose: () => void
}

export function WeChatQrModal({ open, language, onClose }: WeChatQrModalProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const copy = COPY[language]

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="wechat-modal-backdrop"
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose()
      }}
    >
      <div
        className="wechat-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="wechat-modal-close"
          aria-label={copy.close}
          onClick={onClose}
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <div className="wechat-modal-header">
          <h2 id={titleId} className="wechat-modal-title">
            {copy.title}
          </h2>
          <p className="wechat-modal-subtitle">{copy.subtitle}</p>
        </div>

        <img
          className="wechat-modal-qr"
          src={WECHAT_QR_SRC}
          alt={copy.imageAlt}
          width={711}
          height={1024}
          decoding="async"
        />
      </div>
    </div>
  )
}
