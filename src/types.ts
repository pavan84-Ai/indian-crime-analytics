export type Occupation = 'Student' | 'Working Professional'

export interface Profile {
  name: string
  occupation: Occupation
  hometown: string
  college: string
  movingCity: string
  moveInDate: string
  reason: 'Internship' | 'College' | 'Job' | 'Other'
  groupSize: number
  budget: number
  lookingFor: 'Flat' | 'PG' | 'Shared Room'
  bachelorFriendly: boolean
  avatar: string
}

export interface User {
  id: string
  name: string
  profileImage: string
  college: string
  hometown: string
  city: string
  occupation: Occupation
  reasonForMoving: string
  lookingForFlatmate: boolean
  tag: string
  note: string
}

export interface Property {
  id: string
  title: string
  location: string
  city: string
  price: number
  securityDeposit: number
  bedrooms: number
  occupants: number
  distanceToCollege: string
  amenities: string[]
  images: string[]
  bachelorFriendly: boolean
  brokerage: string
  curfew: string
  nearby: { label: string; distance: string }[]
}

export interface CommunityPost {
  id: string
  author: string
  avatar: string
  title?: string
  content: string
  category: 'Questions' | 'Recommendations' | 'Events'
  location: string
  upvotes: number
  replies: number
  createdAt: string
  bookmarked?: boolean
}
