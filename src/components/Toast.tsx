import { cn } from '@/utils/cn'

type ToastProps = {
  message: string
  visible: boolean
}

export function Toast({ message, visible }: ToastProps) {
  return (
    <div
      className={cn('toast', visible && 'is-visible')}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  )
}
