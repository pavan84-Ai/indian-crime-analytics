import { ButtonHTMLAttributes, InputHTMLAttributes, forwardRef } from 'react'

export const PrimaryButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = '', children, ...props }, ref) => (
    <button
      ref={ref}
      className={`btn-press w-full h-[52px] rounded-2xl bg-primary text-white font-bold text-[15px] shadow-soft
        disabled:opacity-50 disabled:pointer-events-none hover:bg-primary-dark transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  )
)

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full h-12 px-4 rounded-xl2 bg-gray-50 border border-gray-200 text-[14px] placeholder:text-gray-400
        focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${className}`}
      {...props}
    />
  )
)

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-[13px] font-bold text-ink mb-1.5">{children}</label>
}
