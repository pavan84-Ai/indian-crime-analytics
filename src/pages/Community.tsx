import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useApp } from '../context/AppContext'
import CommunityCard from '../components/CommunityCard'
import BottomNav from '../components/BottomNav'
import Modal from '../components/Modal'
import { PrimaryButton, TextInput, FieldLabel } from '../components/ui'
import { CommunityPost } from '../types'

const tabs: CommunityPost['category'][] = ['Questions', 'Recommendations', 'Events']

export default function Community() {
  const { posts, addPost, profile } = useApp()
  const [tab, setTab] = useState<CommunityPost['category']>('Questions')
  const [askOpen, setAskOpen] = useState(false)
  const [content, setContent] = useState('')

  const filtered = useMemo(() => posts.filter((p) => p.category === tab).sort((a, b) => b.upvotes - a.upvotes), [posts, tab])

  const handleAsk = () => {
    if (!content.trim()) return
    addPost({
      author: profile.name,
      avatar: profile.avatar,
      content: content.trim(),
      category: 'Questions',
      location: profile.movingCity,
    })
    setContent('')
    setAskOpen(false)
    setTab('Questions')
  }

  return (
    <div className="h-full flex flex-col relative">
      <div className="scroll-area no-scrollbar px-5 pt-6 pb-28">
        <h1 className="text-[19px] font-extrabold">Community</h1>
        <p className="text-muted text-[13px] mt-0.5">Local forum for {profile.movingCity}</p>

        <div className="flex items-center gap-1 mt-4 bg-gray-50 rounded-xl2 p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 h-9 rounded-[10px] text-[12.5px] font-bold transition-colors
                ${tab === t ? 'bg-white text-primary shadow-sm' : 'text-muted'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-3 mt-4">
          {filtered.length === 0 ? (
            <div className="text-center py-14">
              <p className="text-3xl mb-2">💬</p>
              <p className="font-bold text-[14px]">Nothing here yet</p>
              <p className="text-muted text-[12.5px] mt-1">Be the first to post in {tab.toLowerCase()}.</p>
            </div>
          ) : (
            filtered.map((p) => <CommunityCard key={p.id} post={p} />)
          )}
        </div>
      </div>

      <button
        onClick={() => setAskOpen(true)}
        className="btn-press absolute right-4 bottom-24 h-12 pl-4 pr-5 rounded-full bg-primary text-white font-bold text-[13px] shadow-soft flex items-center gap-1.5 z-20"
      >
        <Plus size={16} /> Ask Question
      </button>

      <BottomNav />

      <Modal open={askOpen} onClose={() => setAskOpen(false)} title="Ask the community">
        <FieldLabel>Your question</FieldLabel>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="e.g. Looking for a reliable tiffin service near..."
          className="w-full p-3.5 rounded-xl2 bg-gray-50 border border-gray-200 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none mb-4"
        />
        <PrimaryButton onClick={handleAsk} disabled={!content.trim()}>Post Question</PrimaryButton>
      </Modal>
    </div>
  )
}
