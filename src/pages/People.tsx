import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, Users } from 'lucide-react'
import { users } from '../data/users'
import PersonCard from '../components/PersonCard'
import { FilterChip } from '../components/FilterChip'
import BottomNav from '../components/BottomNav'

const filters = ['All', 'Same College', 'Same Hometown', 'Same State'] as const

export default function People() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (filter !== 'All' && u.tag !== filter) return false
      if (query) {
        const q = query.toLowerCase()
        if (!u.name.toLowerCase().includes(q) && !u.college.toLowerCase().includes(q) && !u.hometown.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [query, filter])

  return (
    <div className="h-full flex flex-col relative">
      <div className="scroll-area no-scrollbar px-5 pt-6 pb-24">
        <h1 className="text-[19px] font-extrabold flex items-center gap-2">
          <Users size={19} className="text-primary" /> Find your circle
        </h1>

        <div className="flex items-center gap-2 mt-4">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search people, college, hometown..."
              className="w-full h-11 pl-10 pr-4 rounded-xl2 bg-gray-50 border border-gray-200 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <button className="btn-press h-11 w-11 rounded-xl2 bg-gray-100 flex items-center justify-center shrink-0">
            <SlidersHorizontal size={16} />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-3.5 pb-1">
          {filters.map((f) => (
            <FilterChip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
          ))}
        </div>

        <p className="text-[12px] text-muted font-semibold mt-4 mb-2.5">{filtered.length} people moving to your city</p>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-14">
              <p className="text-3xl mb-2">🧑‍🤝‍🧑</p>
              <p className="font-bold text-[14px]">No one matches this filter yet</p>
              <p className="text-muted text-[12.5px] mt-1">Try a different filter or search term.</p>
            </div>
          ) : (
            filtered.map((u) => <PersonCard key={u.id} person={u} />)
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
