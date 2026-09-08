import React, { createContext, useContext, useMemo, useState } from 'react'
import { Profile, CommunityPost } from '../types'
import { communityPosts as initialPosts } from '../data/community'

interface AppState {
  isAuthenticated: boolean
  phone: string
  setPhone: (p: string) => void
  login: () => void
  logout: () => void

  profile: Profile
  updateProfile: (patch: Partial<Profile>) => void

  favorites: Set<string>
  toggleFavorite: (id: string) => void

  connections: Set<string>
  connect: (id: string) => void

  posts: CommunityPost[]
  upvote: (id: string) => void
  bookmark: (id: string) => void
  addPost: (post: Omit<CommunityPost, 'id' | 'upvotes' | 'replies' | 'createdAt'>) => void
}

const defaultProfile: Profile = {
  name: 'Rahul Patil',
  occupation: 'Student',
  hometown: 'Radhanagari',
  college: 'DY Patil College of Engineering',
  movingCity: 'Kolhapur',
  moveInDate: '2026-09-01',
  reason: 'Internship',
  groupSize: 5,
  budget: 10000,
  lookingFor: 'Flat',
  bachelorFriendly: true,
  avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=rahul-patil&backgroundColor=EAF8F2',
}

const AppContext = createContext<AppState | null>(null)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [phone, setPhone] = useState('')
  const [profile, setProfile] = useState<Profile>(defaultProfile)
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['p2', 'p5']))
  const [connections, setConnections] = useState<Set<string>>(new Set())
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts)

  const login = () => setIsAuthenticated(true)
  const logout = () => setIsAuthenticated(false)

  const updateProfile = (patch: Partial<Profile>) => setProfile((p) => ({ ...p, ...patch }))

  const toggleFavorite = (id: string) =>
    setFavorites((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const connect = (id: string) =>
    setConnections((prev) => new Set(prev).add(id))

  const upvote = (id: string) =>
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p)))

  const bookmark = (id: string) =>
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, bookmarked: !p.bookmarked } : p)))

  const addPost: AppState['addPost'] = (post) =>
    setPosts((prev) => [
      { ...post, id: `c${Date.now()}`, upvotes: 0, replies: 0, createdAt: 'Just now' },
      ...prev,
    ])

  const value = useMemo(
    () => ({
      isAuthenticated, phone, setPhone, login, logout,
      profile, updateProfile,
      favorites, toggleFavorite,
      connections, connect,
      posts, upvote, bookmark, addPost,
    }),
    [isAuthenticated, phone, profile, favorites, connections, posts]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
