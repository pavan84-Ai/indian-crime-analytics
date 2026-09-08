import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import ProgressSteps from '../components/ProgressSteps'
import { PrimaryButton, FieldLabel, TextInput } from '../components/ui'
import { Profile } from '../types'

const popularCities = ['Pune', 'Mumbai', 'Bengaluru', 'Hyderabad']
const reasons: Profile['reason'][] = ['Internship', 'College', 'Job', 'Other']

export default function MovingSetup() {
  const navigate = useNavigate()
  const { profile, updateProfile } = useApp()
  const [city, setCity] = useState(profile.movingCity)
  const [moveInDate, setMoveInDate] = useState(profile.moveInDate)
  const [reason, setReason] = useState(profile.reason)

  const handleNext = () => {
    updateProfile({ movingCity: city, moveInDate, reason })
    navigate('/requirements')
  }

  const formattedDate = new Date(moveInDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div className="h-full flex flex-col scroll-area px-6 pt-6 pb-8">
      <button onClick={() => navigate('/profile-setup')} className="btn-press h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <ArrowLeft size={17} />
      </button>

      <p className="text-center text-[11px] font-bold text-muted tracking-wide uppercase mb-3">I'm Moving To · Step 2 of 3</p>
      <ProgressSteps step={2} />

      <h2 className="text-[21px] font-extrabold">Where are you heading?</h2>
      <p className="text-muted text-[13.5px] mt-1 mb-6">We'll help you settle in.</p>

      <div className="space-y-5">
        <div>
          <FieldLabel>City</FieldLabel>
          <div className="relative">
            <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" />
            <TextInput className="pl-10 pr-9 font-semibold" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Search a city" />
            {city && (
              <button onClick={() => setCity('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <X size={14} />
              </button>
            )}
          </div>

          <p className="text-[11.5px] font-semibold text-muted mt-3 mb-2">Popular near you</p>
          <div className="flex gap-2 flex-wrap">
            {popularCities.map((c) => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={`btn-press px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold border
                  ${city === c ? 'bg-primary-light text-primary border-primary/30' : 'bg-white text-ink border-gray-200'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <FieldLabel>Move-in Date</FieldLabel>
          <div className="relative">
            <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl2 bg-gray-50 border border-gray-200 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <p className="text-[11.5px] text-muted mt-1.5">Selected: {formattedDate}</p>
        </div>

        <div>
          <FieldLabel>Why are you moving?</FieldLabel>
          <div className="grid grid-cols-4 gap-2">
            {reasons.map((r) => (
              <button
                key={r}
                onClick={() => setReason(r)}
                className={`btn-press h-11 rounded-xl2 font-bold text-[12px] border transition-colors
                  ${reason === r ? 'bg-primary text-white border-primary' : 'bg-white text-ink border-gray-200'}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex-1 flex items-end justify-center opacity-90">
        <svg viewBox="0 0 200 90" className="w-full max-w-[240px] text-primary-light">
          <path d="M0 90 L20 60 L40 90 M40 90 L60 40 L80 90 M100 90 L120 20 L140 90" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="160" cy="55" r="18" fill="currentColor" />
          <path d="M148 55 h24 M160 43 v24" stroke="white" strokeWidth="2.5" />
        </svg>
      </div>

      <div className="pt-4">
        <PrimaryButton disabled={!city} onClick={handleNext}>Next: Group &amp; Budget</PrimaryButton>
      </div>
    </div>
  )
}
