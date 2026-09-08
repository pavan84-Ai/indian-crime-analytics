import { ArrowUp, MessageSquare, Bookmark, MapPin } from 'lucide-react'
import { CommunityPost } from '../types'
import { useApp } from '../context/AppContext'

export default function CommunityCard({ post }: { post: CommunityPost }) {
  const { upvote, bookmark } = useApp()

  return (
    <div className="bg-white rounded-xl2 shadow-card border border-gray-100 p-3.5 animate-fade-in">
      <div className="flex items-center gap-2.5">
        <img src={post.avatar} alt={post.author} className="h-9 w-9 rounded-full bg-primary-light" />
        <div className="min-w-0 flex-1">
          <p className="font-bold text-[13.5px] truncate">{post.author}</p>
          <p className="text-[11px] text-muted flex items-center gap-1">
            {post.createdAt} <span>·</span> <MapPin size={10} /> {post.location}
          </p>
        </div>
        <span className="text-[10px] font-bold text-violet bg-violet-soft px-2 py-1 rounded-full shrink-0">
          {post.category === 'Questions' ? 'Question' : post.category === 'Recommendations' ? 'Tip' : 'Event'}
        </span>
      </div>

      {post.title && <p className="font-bold text-[14px] mt-2.5">{post.title}</p>}
      <p className="text-[13.5px] text-ink mt-2 leading-relaxed">{post.content}</p>

      <div className="flex items-center gap-4 mt-3 pt-2.5 border-t border-gray-100">
        <button onClick={() => upvote(post.id)} className="btn-press flex items-center gap-1.5 text-[12.5px] font-semibold text-muted hover:text-primary">
          <ArrowUp size={15} /> {post.upvotes}
        </button>
        <button className="flex items-center gap-1.5 text-[12.5px] font-semibold text-muted">
          <MessageSquare size={14} /> {post.replies} Replies
        </button>
        <button onClick={() => bookmark(post.id)} className="btn-press ml-auto text-muted">
          <Bookmark size={16} className={post.bookmarked ? 'fill-primary text-primary' : ''} />
        </button>
      </div>
    </div>
  )
}
