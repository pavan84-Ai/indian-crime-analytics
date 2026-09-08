import { Check } from 'lucide-react'

export default function ProgressSteps({ step, total = 3 }: { step: number; total?: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {Array.from({ length: total }).map((_, i) => {
        const idx = i + 1
        const done = idx < step
        const active = idx === step
        return (
          <div key={idx} className="flex items-center">
            <div
              className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                ${done ? 'bg-primary text-white' : active ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}`}
            >
              {done ? <Check size={14} /> : idx}
            </div>
            {idx < total && (
              <div className={`h-0.5 w-10 sm:w-14 mx-1 rounded ${idx < step ? 'bg-primary' : 'bg-gray-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
