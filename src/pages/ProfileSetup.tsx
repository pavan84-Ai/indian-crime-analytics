import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search } from 'lucide-react'
import { useApp } from '../context/AppContext'
import ProgressSteps from '../components/ProgressSteps'
import { PrimaryButton, FieldLabel, TextInput } from '../components/ui'
import { Occupation } from '../types'

const colleges = [
  'DY Patil College of Engineering',
  'Shivaji University, Kolhapur',
  "KIT's College of Engineering",
  'KLE Technological University',
]

export default function ProfileSetup() {
  const navigate = useNavigate()
  const { profile, updateProfile } = useApp()
  const [name, setName] = useState(profile.name)
  const [occupation, setOccupation] = useState<Occupation>(profile.occupation)
  const [hometown, setHometown] = useState(profile.hometown)
  const [college, setCollege] = useState(profile.college)
  const [showColleges, setShowColleges] = useState(false)

  const canContinue = name.trim().length > 1 && hometown.trim().length > 1 && college.trim().length > 1

  const handleNext = () => {
    updateProfile({ name, occupation, hometown, college })
    navigate('/moving')
  }

  return (
    <div className="h-full flex flex-col scroll-area px-6 pt-6 pb-8">
      <button onClick={() => navigate('/')} className="btn-press h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <ArrowLeft size={17} />
      </button>

      <p className="text-center text-[11px] font-bold text-muted tracking-wide uppercase mb-3">Create Profile · Step 1 of 3</p>
      <ProgressSteps step={1} />

      <h2 className="text-[21px] font-extrabold">Tell us about yourself</h2>
      <p className="text-muted text-[13.5px] mt-1 mb-6">This helps us connect you better.</p>

      <div className="space-y-5">
        <div>
          <FieldLabel>Full Name</FieldLabel>
          <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" />
        </div>

        <div>
          <FieldLabel>I am a</FieldLabel>
          <div className="grid grid-cols-2 gap-3">
            {(['Student', 'Working Professional'] as Occupation[]).map((opt) => (
              <button
                key={opt}
                onClick={() => setOccupation(opt)}
                className={`btn-press h-11 rounded-xl2 font-bold text-[13.5px] border transition-colors
                  ${occupation === opt ? 'bg-primary text-white border-primary' : 'bg-white text-ink border-gray-200'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <FieldLabel>Hometown</FieldLabel>
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <TextInput className="pl-10" value={hometown} onChange={(e) => setHometown(e.target.value)} placeholder="Search your hometown" />
          </div>
        </div>

        <div>
          <FieldLabel>College / Organization</FieldLabel>
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <TextInput
              className="pl-10"
              value={college}
              onFocus={() => setShowColleges(true)}
              onChange={(e) => { setCollege(e.target.value); setShowColleges(true) }}
              placeholder="Search your college or organization"
            />
          </div>
          {showColleges && (
            <div className="mt-2 bg-white border border-gray-100 rounded-xl2 shadow-card overflow-hidden">
              {colleges.filter((c) => c.toLowerCase().includes(college.toLowerCase())).map((c) => (
                <button
                  key={c}
                  onClick={() => { setCollege(c); setShowColleges(false) }}
                  className="w-full text-left px-4 py-3 text-[13.5px] hover:bg-primary-light border-b border-gray-50 last:border-0"
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <PrimaryButton disabled={!canContinue} onClick={handleNext}>Next: Where are you heading?</PrimaryButton>
      </div>
    </div>
  )
}
