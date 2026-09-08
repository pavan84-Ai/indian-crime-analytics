import { X } from 'lucide-react'
import { ReactNode } from 'react'

export default function Modal({
  open, onClose, title, children,
}: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null
  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-3xl p-5 pb-[max(20px,env(safe-area-inset-bottom))] animate-slide-up max-h-[85%] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-[17px]">{title}</h3>
          <button onClick={onClose} className="btn-press h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
