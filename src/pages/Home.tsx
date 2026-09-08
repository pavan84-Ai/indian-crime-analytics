import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, Search, SlidersHorizontal, Bell, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { properties } from '../data/properties'
import PropertyCard from '../components/PropertyCard'
import { FilterChip } from '../components/FilterChip'
import BottomNav from '../components/BottomNav'
import Modal from '../components/Modal'

export default function Home() {
  const { profile } = useApp()
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [maxBudget, setMaxBudget] = useState(profile.budget)
  const [bedsFilter, setBedsFilter] = useState(profile.groupSize)
  const [bachelorOnly, setBachelorOnly] = useState(profile.bachelorFriendly)
  const [activeFilters, setActiveFilters] = useState({
    beds: true, budget: true, bachelor: true,
  })

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (query && !p.title.toLowerCase().includes(query.toLowerCase()) && !p.location.toLowerCase().includes(query.toLowerCase())) return false
      if (activeFilters.budget && p.price > maxBudget) return false
      if (activeFilters.beds && p.occupants < bedsFilter - 1) return false
      if (activeFilters.bachelor && bachelorOnly && !p.bachelorFriendly) return false
      return true
    })
  }, [query, maxBudget, bedsFilter, bachelorOnly, activeFilters])

  return (
    <div className="h-full flex flex-col relative">
      <div className="scroll-area no-scrollbar px-5 pt-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-1 font-extrabold text-[16px]">
            📍 {profile.movingCity} <ChevronDown size={16} />
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(true)} className="btn-press h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
              <Search size={16} />
            </button>
            <button onClick={() => setFilterOpen(true)} className="btn-press h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
              <SlidersHorizontal size={15} />
            </button>
            <button className="btn-press h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center relative">
              <Bell size={16} />
              <span className="absolute top-1.5 right-2 h-1.5 w-1.5 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-4 pb-1">
          {activeFilters.beds && (
            <FilterChip label={`${bedsFilter} Beds`} active onRemove={() => setActiveFilters((f) => ({ ...f, beds: false }))} />
          )}
          {activeFilters.budget && (
            <FilterChip label={`₹${Math.round(maxBudget / 1000)}k Max`} active onRemove={() => setActiveFilters((f) => ({ ...f, budget: false }))} />
          )}
          {activeFilters.bachelor && bachelorOnly && (
            <FilterChip label="Bachelor-Friendly" active onRemove={() => setActiveFilters((f) => ({ ...f, bachelor: false }))} />
          )}
          <button onClick={() => setFilterOpen(true)} className="btn-press shrink-0 h-[34px] w-[34px] rounded-full bg-primary-light text-primary flex items-center justify-center">
            <SlidersHorizontal size={14} />
          </button>
        </div>

        <p className="text-[12.5px] text-muted font-semibold mt-4 mb-2.5">{filtered.length} places matching your circle</p>

        {/* Results */}
        <div className="space-y-4">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-52 rounded-xl2" />)
            : filtered.length === 0
              ? <EmptyState onReset={() => { setActiveFilters({ beds: false, budget: false, bachelor: false }); setQuery('') }} />
              : filtered.map((p) => <PropertyCard key={p.id} property={p} />)
          }
        </div>
      </div>

      <BottomNav />

      {/* Search modal */}
      <Modal open={searchOpen} onClose={() => setSearchOpen(false)} title="Search places">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by area, e.g. Tarabai Park"
            className="w-full h-12 pl-10 pr-4 rounded-xl2 bg-gray-50 border border-gray-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <button onClick={() => setSearchOpen(false)} className="btn-press w-full h-12 rounded-2xl bg-primary text-white font-bold text-[14px] mt-4">
          Search
        </button>
      </Modal>

      {/* Filter modal */}
      <Modal open={filterOpen} onClose={() => setFilterOpen(false)} title="Filters">
        <div className="space-y-5">
          <div>
            <p className="text-[13px] font-bold mb-2">Group size</p>
            <div className="flex items-center gap-3">
              <input type="range" min={1} max={10} value={bedsFilter} onChange={(e) => setBedsFilter(Number(e.target.value))} className="flex-1 accent-primary" />
              <span className="font-bold text-[13px] w-16 text-right">{bedsFilter} people</span>
            </div>
          </div>
          <div>
            <p className="text-[13px] font-bold mb-2">Max budget</p>
            <div className="flex items-center gap-3">
              <input type="range" min={4000} max={16000} step={500} value={maxBudget} onChange={(e) => setMaxBudget(Number(e.target.value))} className="flex-1 accent-primary" />
              <span className="font-bold text-[13px] w-16 text-right">₹{Math.round(maxBudget / 1000)}k</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold">Bachelor-Friendly only</span>
            <button
              onClick={() => setBachelorOnly((b) => !b)}
              className={`h-7 w-12 rounded-full transition-colors relative ${bachelorOnly ? 'bg-primary' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 h-6 w-6 bg-white rounded-full shadow transition-transform ${bachelorOnly ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>
        <button
          onClick={() => { setActiveFilters({ beds: true, budget: true, bachelor: true }); setFilterOpen(false) }}
          className="btn-press w-full h-12 rounded-2xl bg-primary text-white font-bold text-[14px] mt-6"
        >
          Apply Filters
        </button>
      </Modal>
    </div>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-14 px-4">
      <div className="h-16 w-16 rounded-full bg-primary-light flex items-center justify-center text-3xl mb-3">🔍</div>
      <p className="font-bold text-[15px]">No places match yet</p>
      <p className="text-muted text-[13px] mt-1 mb-4">Try widening your budget or group size filters.</p>
      <button onClick={onReset} className="btn-press px-5 h-10 rounded-full bg-primary-light text-primary font-bold text-[13px] flex items-center gap-1.5">
        <X size={13} /> Clear filters
      </button>
    </div>
  )
}
