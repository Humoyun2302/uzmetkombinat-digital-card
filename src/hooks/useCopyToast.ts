import { useCallback, useEffect, useRef, useState } from 'react'

export function useCopyToast(copiedLabel: string, duration = 1800) {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState(copiedLabel)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  const copy = useCallback(
    async (value: string, toastMessage = copiedLabel) => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value)
        } else {
          const input = document.createElement('textarea')
          input.value = value
          input.setAttribute('readonly', '')
          input.style.position = 'fixed'
          input.style.opacity = '0'
          document.body.appendChild(input)
          input.select()
          document.execCommand('copy')
          input.remove()
        }

        setMessage(toastMessage)
        setVisible(true)
        if (timer.current) window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setVisible(false), duration)
      } catch {
        setMessage(toastMessage)
        setVisible(true)
        if (timer.current) window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setVisible(false), duration)
      }
    },
    [copiedLabel, duration],
  )

  return { copy, visible, message }
}
