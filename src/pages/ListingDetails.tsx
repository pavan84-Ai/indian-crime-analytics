import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, Heart, Share2, Users, BedDouble, ShieldOff, Percent,
  Wifi, UtensilsCrossed, Droplets, Bike, MoreHorizontal, MapPin, Phone, MessageCircle,
} from 'lucide-react'
import { properties } from '../data/properties'
import { useApp } from '../context/AppContext'

const amenityIcon: Record<string, any> = {
  WiFi: Wifi, Kitchen: UtensilsCrossed, '24/7 Water': Droplets, 'Bike Parking': Bike,
}

export default function ListingDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useApp()
  const property = properties.find((p) => p.id === id) ?? properties[0]
  const [imgIndex, setImgIndex] = useState(0)
  const [toast, setToast] = useState('')
  const isFav = favorites.has(property.id)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 1800)
  }

  const visibleAmenities = property.amenities.slice(0, 4)
  const moreCount = property.amenities.length - visibleAmenities.length

  return (
    <div className="h-full flex flex-col relative">
      <div className="scroll-area no-scrollbar pb-28">
        {/* Gallery */}
        <div className="relative h-64">
          <img src={property.images[imgIndex]} className="w-full h-full object-cover" alt={property.title} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
          <button onClick={() => navigate(-1)} className="btn-press absolute top-4 left-4 h-9 w-9 rounded-full bg-white/90 flex items-center justify-center">
            <ArrowLeft size={17} />
          </button>
          <div className="absolute top-4 right-4 flex gap-2">
            <button onClick={() => toggleFavorite(property.id)} className="btn-press h-9 w-9 rounded-full bg-white/90 flex items-center justify-center">
              <Heart size={16} className={isFav ? 'fill-red-500 text-red-500 animate-pop' : ''} />
            </button>
            <button onClick={() => showToast('Link copied to clipboard')} className="btn-press h-9 w-9 rounded-full bg-white/90 flex items-center justify-center">
              <Share2 size={15} />
            </button>
          </div>
          <div className="absolute bottom-3 right-4 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
            {imgIndex + 1} / {property.images.length}
          </div>
          <div className="absolute bottom-3 left-4 flex gap-1.5">
            {property.images.map((_, i) => (
              <button key={i} onClick={() => setImgIndex(i)} className={`h-1.5 rounded-full transition-all ${i === imgIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50'}`} />
            ))}
          </div>
        </div>

        <div className="px-5 pt-5">
          <h1 className="text-[19px] font-extrabold leading-snug">{property.title}</h1>
          <p className="text-muted text-[13px] flex items-center gap-1 mt-1">
            <MapPin size={12} /> {property.location}
          </p>

          <div className="flex items-end justify-between mt-3">
            <div>
              <p className="text-[22px] font-extrabold text-primary">₹{property.price.toLocaleString('en-IN')}<span className="text-[13px] font-semibold text-muted"> / month</span></p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-muted font-semibold">Security Deposit</p>
              <p className="font-bold text-[14px]">₹{property.securityDeposit.toLocaleString('en-IN')}</p>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-4 gap-2 mt-5">
            <InfoPill icon={Users} label={`${property.occupants} Occupants`} />
            <InfoPill icon={BedDouble} label={`${property.bedrooms} BHK`} />
            <InfoPill icon={ShieldOff} label={property.curfew} />
            <InfoPill icon={Percent} label={property.brokerage} />
          </div>

          {/* Amenities */}
          <p className="font-extrabold text-[15px] mt-6 mb-3">Amenities</p>
          <div className="grid grid-cols-4 gap-3">
            {visibleAmenities.map((a) => {
              const Icon = amenityIcon[a] ?? Wifi
              return (
                <div key={a} className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl2 py-3">
                  <Icon size={18} className="text-primary" />
                  <span className="text-[10px] font-semibold text-center leading-tight">{a}</span>
                </div>
              )
            })}
            {moreCount > 0 && (
              <div className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl2 py-3">
                <MoreHorizontal size={18} className="text-muted" />
                <span className="text-[10px] font-semibold">+{moreCount} More</span>
              </div>
            )}
          </div>

          {/* Location */}
          <p className="font-extrabold text-[15px] mt-6 mb-3">Location</p>
          <div className="rounded-xl2 overflow-hidden border border-gray-100">
            <div className="h-32 bg-primary-light flex items-center justify-center relative">
              <MapPin size={28} className="text-primary" />
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,143,104,0.15) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
            </div>
            <div className="divide-y divide-gray-100">
              {property.nearby.map((n) => (
                <div key={n.label} className="flex items-center justify-between px-4 py-2.5 text-[12.5px]">
                  <span className="text-muted">{n.label}</span>
                  <span className="font-bold">{n.distance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky actions */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3">
        <button onClick={() => showToast('Calling owner…')} className="btn-press flex-1 h-12 rounded-2xl border-2 border-primary text-primary font-bold text-[13.5px] flex items-center justify-center gap-1.5">
          <Phone size={15} /> Call Owner
        </button>
        <button onClick={() => showToast('Opening WhatsApp chat…')} className="btn-press flex-1 h-12 rounded-2xl bg-primary text-white font-bold text-[13.5px] flex items-center justify-center gap-1.5">
          <MessageCircle size={15} /> Chat on WhatsApp
        </button>
      </div>

      {toast && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-ink text-white text-[12.5px] font-semibold px-4 py-2.5 rounded-full shadow-soft animate-slide-up z-40">
          {toast}
        </div>
      )}
    </div>
  )
}

function InfoPill({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 bg-gray-50 rounded-xl2 py-2.5 px-1">
      <Icon size={15} className="text-primary" />
      <span className="text-[9.5px] font-bold text-center leading-tight">{label}</span>
    </div>
  )
}
