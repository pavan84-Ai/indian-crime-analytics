import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, IndianRupee, Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext'
import ProgressSteps from '../components/ProgressSteps'
import { PrimaryButton, FieldLabel } from '../components/ui'
import { Profile } from '../types'

const lookingForOptions: Profile['lookingFor'][] = ['Flat', 'PG', 'Shared Room']

export default function AccommodationRequirements() {
  const navigate = useNavigate()
  const { profile, updateProfile } = useApp()
  const [groupSize, setGroupSize] = useState(profile.groupSize)
  const [budget, setBudget] = useState(profile.budget)
  const [lookingFor, setLookingFor] = useState(profile.lookingFor)
  const [bachelorFriendly, setBachelorFriendly] = useState(profile.bachelorFriendly)

  const perPerson = Math.round(budget / groupSize) || 0

  const handleSubmit = () => {
    updateProfile({ groupSize, budget, lookingFor, bachelorFriendly })
    navigate('/home')
  }

  return (
    <div className="h-full flex flex-col scroll-area px-6 pt-6 pb-8">
      <button onClick={() => navigate('/moving')} className="btn-press h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <ArrowLeft size={17} />
      </button>

      <p className="text-center text-[11px] font-bold text-muted tracking-wide uppercase mb-3">Accommodation Requirements · Step 3 of 3</p>
      <ProgressSteps step={3} />

      <h2 className="text-[21px] font-extrabold">Let's find the perfect place 🏠</h2>
      <p className="text-muted text-[13.5px] mt-1 mb-6">For you and your circle.</p>

      <div className="space-y-6">
        <div>
          <FieldLabel>Group Size</FieldLabel>
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl2 px-4 py-2.5">
            <button
              onClick={() => setGroupSize((n) => Math.max(1, n - 1))}
              className="btn-press h-9 w-9 rounded-full bg-white border border-gray-200 flex items-center justify-center"
            >
              <Minus size={16} />
            </button>
            <span className="font-extrabold text-[17px]">{groupSize} People</span>
            <button
              onClick={() => setGroupSize((n) => Math.min(12, n + 1))}
              className="btn-press h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center"
            >
              <Plus size={16} />
            </button>
          </div>
          <p className="text-[12px] text-muted mt-2">
            Finding a place for you and {Math.max(0, groupSize - 1)} flatmate{groupSize - 1 === 1 ? '' : 's'}
          </p>
        </div>

        <div>
          <FieldLabel>Total Budget</FieldLabel>
          <div className="relative">
            <IndianRupee size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value) || 0)}
              className="w-full h-12 pl-10 pr-20 rounded-xl2 bg-gray-50 border border-gray-200 text-[15px] font-bold focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[12px] text-muted font-semibold">/ month</span>
          </div>
          <div className="mt-2 bg-primary-light text-primary text-[12.5px] font-semibold rounded-xl px-3.5 py-2 inline-flex items-center gap-1.5">
            Equals ₹{perPerson.toLocaleString('en-IN')} per person / month
          </div>
        </div>

        <div>
          <FieldLabel>Looking for</FieldLabel>
          <div className="grid grid-cols-3 gap-2.5">
            {lookingForOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setLookingFor(opt)}
                className={`btn-press h-11 rounded-xl2 font-bold text-[13px] border flex items-center justify-center gap-1
                  ${lookingFor === opt ? 'bg-primary text-white border-primary' : 'bg-white text-ink border-gray-200'}`}
              >
                {lookingFor === opt && <span className="text-white">▾</span>} {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl2 px-4 py-3.5">
          <span className="font-bold text-[14px]">Bachelor-Friendly Only</span>
          <button
            onClick={() => setBachelorFriendly((b) => !b)}
            className={`h-7 w-12 rounded-full transition-colors relative shrink-0 ${bachelorFriendly ? 'bg-primary' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-0.5 h-6 w-6 bg-white rounded-full shadow transition-transform ${bachelorFriendly ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <PrimaryButton onClick={handleSubmit} className="flex items-center justify-center gap-2">
          Show 12 Matching Places <Sparkles size={16} />
        </PrimaryButton>
      </div>
    </div>
  )
}
