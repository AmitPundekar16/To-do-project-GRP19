import { X } from 'lucide-react'

type Props = {
  message: string | null
  onClose: () => void
}

export default function Toast({ message, onClose }: Props) {
  if (!message) return null

  return (
    <div className="toast-notification" role="status" aria-live="polite">
      <span>{message}</span>
      <button onClick={onClose} aria-label="Dismiss notification">
        <X size={16} />
      </button>
    </div>
  )
}
