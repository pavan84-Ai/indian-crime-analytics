import { Heart, Users, MapPin, BadgeCheck } from 'lucide-react'
import { Property } from '../types'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

export default function PropertyCard({ property, compact }: { property: Property; compact?: boolean }) {
  const { favorites, toggleFavorite } = useApp()
  const navigate = useNavigate()
  const isFav = favorites.has(property.id)
  const perPerson = Math.round(property.price / property.occupants)

  return (
    <div
      onClick={() => navigate(`/listing/${property.id}`)}
      className={`card-hover cursor-pointer bg-white rounded-xl2 shadow-card border border-gray-100 overflow-hidden ${compact ? 'w-[190px] shrink-0' : ''}`}
    >
      <div className="relative">
        <img src={property.images[0]} alt={property.title} className={`w-full object-cover ${compact ? 'h-28' : 'h-40'}`} loading="lazy" />
        {property.bachelorFriendly && (
          <span className="absolute top-2 left-2 bg-white/95 text-primary text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <BadgeCheck size={11} /> Bachelor-Friendly
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(property.id) }}
          className="btn-press absolute top-2 right-2 h-8 w-8 rounded-full bg-white/95 flex items-center justify-center shadow-sm"
        >
          <Heart size={16} className={`${isFav ? 'fill-red-500 text-red-500 animate-pop' : 'text-gray-500'}`} />
        </button>
      </div>
      <div className={`p-3 ${compact ? '' : 'p-3.5'}`}>
        <p className={`font-bold leading-snug ${compact ? 'text-[13px] line-clamp-1' : 'text-[15px]'}`}>{property.title}</p>
        {!compact && (
          <p className="text-[12px] text-muted flex items-center gap-1 mt-0.5">
            <MapPin size={11} /> {property.location}
          </p>
        )}
        <div className="flex items-baseline gap-1.5 mt-1.5">
          <span className="font-extrabold text-primary text-[15px]">₹{property.price.toLocaleString('en-IN')}/mo</span>
          <span className="text-[11px] text-muted">total</span>
          <span className="text-[11px] text-muted">· ₹{perPerson.toLocaleString('en-IN')}/person</span>
        </div>
        {!compact && (
          <div className="flex items-center gap-3 mt-2 text-[11.5px] text-muted">
            <span className="flex items-center gap-1"><Users size={12} /> Fits {property.occupants} students</span>
            <span className="flex items-center gap-1"><MapPin size={12} /> {property.distanceToCollege}</span>
          </div>
        )}
      </div>
    </div>
  )
}
