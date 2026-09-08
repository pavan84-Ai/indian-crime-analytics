import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Backpack, ChevronDown } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { PrimaryButton } from '../components/ui'
import Modal from '../components/Modal'

export default function Welcome() {
  const navigate = useNavigate()
  const { phone, setPhone, login } = useApp()
  const [error, setError] = useState('')
  const [otpOpen, setOtpOpen] = useState(false)
  const [otp, setOtp] = useState('')
  const [sending, setSending] = useState(false)

  const handleSendOtp = () => {
    if (!/^\d{10}$/.test(phone)) {
      setError('Enter a valid 10-digit mobile number')
      return
    }
    setError('')
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setOtpOpen(true)
    }, 700)
  }

  const handleVerify = () => {
    if (otp.length !== 4) return
    login()
    navigate('/profile-setup')
  }

  const handleGoogle = () => {
    login()
    navigate('/profile-setup')
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-primary to-primary-dark relative overflow-hidden">
      {/* Top illustration section */}
      <div className="px-6 pt-12 pb-8 text-white relative">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center">
            <Backpack size={18} />
          </div>
          <span className="text-2xl font-extrabold tracking-tight">CIRCLO</span>
        </div>
        <p className="text-white/85 text-[13.5px] mt-1.5 font-medium">Build your circle anywhere.</p>

        <div className="mt-8 flex items-end justify-center gap-3 h-36 relative">
          <Traveler emoji="🎒" delay="0s" />
          <Traveler emoji="🧳" delay="0.15s" tall />
          <Traveler emoji="🚶" delay="0.3s" />
          <div className="absolute -top-3 right-4 h-11 w-11 rounded-full border-2 border-white/40 flex items-center justify-center text-white/70">
            <ChevronDown size={16} className="rotate-180" />
          </div>
        </div>
      </div>

      {/* Bottom card */}
      <div className="mt-auto bg-white rounded-t-3xl px-6 pt-7 pb-8 shadow-soft">
        <h2 className="text-[20px] font-extrabold text-center">Let's get you started!</h2>
        <p className="text-center text-muted text-[13px] mt-1">Enter your mobile number to continue</p>

        <div className="flex gap-2 mt-5">
          <button className="h-12 px-3 rounded-xl2 bg-gray-50 border border-gray-200 font-bold text-[14px] flex items-center gap-1 shrink-0">
            +91 <ChevronDown size={14} />
          </button>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="Enter mobile number"
            inputMode="numeric"
            className="flex-1 h-12 px-4 rounded-xl2 bg-gray-50 border border-gray-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        {error && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{error}</p>}

        <PrimaryButton className="mt-4" onClick={handleSendOtp} disabled={sending}>
          {sending ? 'Sending OTP…' : 'Send OTP'}
        </PrimaryButton>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-[11.5px] text-muted font-medium">or continue with</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <button
          onClick={handleGoogle}
          className="btn-press w-full h-12 rounded-2xl border border-gray-200 font-bold text-[14px] flex items-center justify-center gap-2.5"
        >
          <GoogleIcon /> Continue with Google
        </button>

        <p className="text-center text-[11px] text-muted mt-5 leading-snug">
          By continuing, you agree to our <span className="text-primary font-semibold">Terms &amp; Privacy Policy</span>
        </p>
      </div>

      <Modal open={otpOpen} onClose={() => setOtpOpen(false)} title="Verify your number">
        <p className="text-[13px] text-muted mb-4">Enter the 4-digit code sent to +91 {phone}. (Hint: use 1234)</p>
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
          inputMode="numeric"
          placeholder="• • • •"
          className="w-full h-14 text-center text-2xl tracking-[0.5em] rounded-xl2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary mb-4"
        />
        <PrimaryButton onClick={handleVerify} disabled={otp.length !== 4}>Verify &amp; Continue</PrimaryButton>
      </Modal>
    </div>
  )
}

function Traveler({ emoji, delay, tall }: { emoji: string; delay: string; tall?: boolean }) {
  return (
    <div
      className={`text-5xl animate-slide-up ${tall ? 'mb-0' : 'mb-3'}`}
      style={{ animationDelay: delay, animationFillMode: 'backwards' }}
    >
      {emoji}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4c-7.9 0-14.7 4.4-18.2 10.9z"/>
      <path fill="#4CAF50" d="M24 44c5.4 0 10.3-1.9 14.1-5.5l-6.5-5.5C29.6 34.7 27 35.5 24 35.5c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.4 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.5 5.5C41 36 44 30.6 44 24c0-1.2-.1-2.4-.4-3.5z"/>
    </svg>
  )
}
