import { Home, Building2, Users, MessagesSquare, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/places', label: 'Places', icon: Building2 },
  { to: '/people', label: 'People', icon: Users },
  { to: '/community', label: 'Community', icon: MessagesSquare },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function BottomNav() {
  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 pt-2 pb-[max(8px,env(safe-area-inset-bottom))] flex items-center justify-between z-30">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className="flex-1 flex flex-col items-center gap-1 py-1.5 rounded-xl transition-colors"
        >
          {({ isActive }) => (
            <>
              <Icon
                size={22}
                strokeWidth={isActive ? 2.4 : 1.9}
                className={isActive ? 'text-primary' : 'text-muted'}
              />
              <span className={`text-[10.5px] font-semibold ${isActive ? 'text-primary' : 'text-muted'}`}>
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
