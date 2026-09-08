import { X, LucideIcon } from 'lucide-react'

export function FilterChip({
  label, active, onClick, onRemove, icon: Icon,
}: {
  label: string
  active?: boolean
  onClick?: () => void
  onRemove?: () => void
  icon?: LucideIcon
}) {
  return (
    <button
      onClick={onClick}
      className={`btn-press shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-semibold border transition-colors whitespace-nowrap
        ${active ? 'bg-primary-light text-primary border-primary/30' : 'bg-white text-ink border-gray-200'}`}
    >
      {Icon && <Icon size={13} strokeWidth={2.3} />}
      {label}
      {onRemove && (
        <span
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          className="ml-0.5 -mr-1 rounded-full hover:bg-primary/10 p-0.5"
        >
          <X size={12} />
        </span>
      )}
    </button>
  )
}
