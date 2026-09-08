import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Pencil, Settings, ChevronRight, Languages, HelpCircle, LogOut, SlidersHorizontal, User as UserIcon,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { properties } from '../data/properties'
import { users } from '../data/users'
import BottomNav from '../components/BottomNav'
import Modal from '../components/Modal'
import { PrimaryButton, TextInput, FieldLabel } from '../components/ui'

export default function Profile() {
  const navigate = useNavigate()
  const { profile, updateProfile, favorites, logout } = useApp()
  const [editOpen, setEditOpen] = useState(false)
  const [groupOpen, setGroupOpen] = useState(false)
  const [name, setName] = useState(profile.name)
  const [hometown, setHometown] = useState(profile.hometown)
  const [college, setCollege] = useState(profile.college)

  const savedProperties = properties.filter((p) => favorites.has(p.id))
  const groupMembers = [profile, ...users.slice(0, profile.groupSize - 1)]

  const handleSave = () => {
    updateProfile({ name, hometown, college })
    setEditOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="h-full flex flex-col relative">
      <div className="scroll-area no-scrollbar pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-primary-dark px-5 pt-7 pb-8 rounded-b-3xl text-white relative">
          <div className="flex items-center gap-3">
            <img src={profile.avatar} className="h-16 w-16 rounded-full bg-white/20 border-2 border-white/40" alt={profile.name} />
            <div className="min-w-0">
              <p className="font-extrabold text-[18px] truncate">{profile.name}</p>
              <p className="text-white/85 text-[12.5px]">From {profile.hometown}</p>
              <p className="text-white/85 text-[12.5px]">{profile.college}</p>
            </div>
          </div>
          <div className="absolute top-6 right-5 flex gap-2">
            <button onClick={() => setEditOpen(true)} className="btn-press h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
              <Pencil size={14} />
            </button>
            <button className="btn-press h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
              <Settings size={14} />
            </button>
          </div>
        </div>

        <div className="px-5 -mt-4">
          {/* My Move */}
          <button onClick={() => setGroupOpen(true)} className="w-full bg-white rounded-xl2 shadow-card border border-gray-100 p-4 text-left">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-extrabold text-[14.5px]">Moving to {profile.movingCity} · Group of {profile.groupSize}</p>
                <div className="flex -space-x-2 mt-2.5">
                  {groupMembers.map((m: any, i) => (
                    <img key={i} src={m.avatar ?? m.profileImage} className="h-8 w-8 rounded-full border-2 border-white" alt="" />
                  ))}
                </div>
              </div>
              <span className="btn-press px-3.5 py-2 rounded-full border border-primary text-primary font-bold text-[12px] shrink-0">
                View Group
              </span>
            </div>
          </button>

          {/* Saved Places */}
          <div className="flex items-center justify-between mt-6 mb-2.5">
            <p className="font-extrabold text-[15px]">Saved Places</p>
            <button onClick={() => navigate('/places')} className="text-primary text-[12.5px] font-bold">View all</button>
          </div>
          {savedProperties.length === 0 ? (
            <p className="text-muted text-[12.5px] bg-gray-50 rounded-xl2 p-4 text-center">No saved places yet — tap the heart on any listing.</p>
          ) : (
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {savedProperties.map((p) => (
                <div key={p.id} onClick={() => navigate(`/listing/${p.id}`)} className="card-hover cursor-pointer w-32 shrink-0">
                  <img src={p.images[0]} className="h-20 w-32 object-cover rounded-xl2" alt={p.title} />
                  <p className="text-[12px] font-extrabold text-primary mt-1.5">₹{p.price.toLocaleString('en-IN')}/mo</p>
                </div>
              ))}
            </div>
          )}

          {/* Account & Settings */}
          <p className="font-extrabold text-[15px] mt-6 mb-2.5">Account &amp; Settings</p>
          <div className="bg-white rounded-xl2 shadow-card border border-gray-100 divide-y divide-gray-100">
            <SettingsRow icon={UserIcon} label="Edit Profile" onClick={() => setEditOpen(true)} />
            <SettingsRow icon={SlidersHorizontal} label="Preferences" />
            <SettingsRow icon={Languages} label="Language" trailing="English / मराठी" />
            <SettingsRow icon={HelpCircle} label="Help & Support" />
            <SettingsRow icon={LogOut} label="Log Out" danger onClick={handleLogout} />
          </div>
        </div>
      </div>

      <BottomNav />

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Profile">
        <div className="space-y-4">
          <div>
            <FieldLabel>Full Name</FieldLabel>
            <TextInput value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <FieldLabel>Hometown</FieldLabel>
            <TextInput value={hometown} onChange={(e) => setHometown(e.target.value)} />
          </div>
          <div>
            <FieldLabel>College / Organization</FieldLabel>
            <TextInput value={college} onChange={(e) => setCollege(e.target.value)} />
          </div>
        </div>
        <PrimaryButton onClick={handleSave} className="mt-5">Save Changes</PrimaryButton>
      </Modal>

      <Modal open={groupOpen} onClose={() => setGroupOpen(false)} title={`Group of ${profile.groupSize}`}>
        <div className="space-y-3">
          {groupMembers.map((m: any, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl2 p-3">
              <img src={m.avatar ?? m.profileImage} className="h-11 w-11 rounded-full" alt="" />
              <div>
                <p className="font-bold text-[13.5px]">{m.name} {i === 0 && <span className="text-primary">(You)</span>}</p>
                <p className="text-[11.5px] text-muted">{m.college}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}

function SettingsRow({
  icon: Icon, label, trailing, danger, onClick,
}: { icon: any; label: string; trailing?: string; danger?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3.5 text-left">
      <Icon size={17} className={danger ? 'text-red-500' : 'text-primary'} />
      <span className={`flex-1 text-[13.5px] font-semibold ${danger ? 'text-red-500' : 'text-ink'}`}>{label}</span>
      {trailing && <span className="text-[11.5px] text-muted">{trailing}</span>}
      <ChevronRight size={15} className="text-gray-300" />
    </button>
  )
}
