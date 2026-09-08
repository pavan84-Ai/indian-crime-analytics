import { MessageCircle, GraduationCap, Home as HomeIcon, Check } from 'lucide-react'
import { User } from '../types'
import { useApp } from '../context/AppContext'

export default function PersonCard({ person }: { person: User }) {
  const { connections, connect } = useApp()
  const isConnected = connections.has(person.id)

  return (
    <div className="bg-white rounded-xl2 shadow-card border border-gray-100 p-3.5 animate-fade-in">
      <div className="flex gap-3">
        <img src={person.profileImage} alt={person.name} className="h-14 w-14 rounded-full object-cover bg-primary-light shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-bold text-[15px] truncate">{person.name}</p>
          <p className="text-[12px] text-muted flex items-center gap-1 truncate">
            <GraduationCap size={12} /> {person.college}
          </p>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <span className="text-[10.5px] font-semibold bg-primary-light text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
              <HomeIcon size={10} /> From {person.hometown}
            </span>
            <span className="text-[10.5px] font-semibold bg-violet-soft text-violet px-2 py-0.5 rounded-full">
              {person.reasonForMoving}
            </span>
          </div>
        </div>
      </div>
      <p className="text-[12px] text-muted mt-2.5 leading-snug">{person.note}</p>
      <div className="flex items-center gap-2 mt-3">
        <button
          onClick={() => connect(person.id)}
          disabled={isConnected}
          className={`btn-press flex-1 h-9 rounded-full text-[13px] font-bold border transition-colors flex items-center justify-center gap-1.5
            ${isConnected ? 'bg-primary-light text-primary border-primary/20' : 'border-primary text-primary hover:bg-primary-light'}`}
        >
          {isConnected ? (<><Check size={14} /> Connected</>) : 'Connect'}
        </button>
        <button className="btn-press h-9 w-9 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0">
          <MessageCircle size={16} />
        </button>
      </div>
    </div>
  )
}
