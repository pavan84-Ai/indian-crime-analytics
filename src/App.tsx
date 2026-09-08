import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useApp } from './context/AppContext'
import Welcome from './pages/Welcome'
import ProfileSetup from './pages/ProfileSetup'
import MovingSetup from './pages/MovingSetup'
import AccommodationRequirements from './pages/AccommodationRequirements'
import Home from './pages/Home'
import ListingDetails from './pages/ListingDetails'
import People from './pages/People'
import Community from './pages/Community'
import Profile from './pages/Profile'

function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useApp()
  if (!isAuthenticated) return <Navigate to="/" replace />
  return children
}

export default function App() {
  const location = useLocation()

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <div className="phone-screen">
          <div key={location.pathname} className="page-enter h-full">
            <Routes location={location}>
              <Route path="/" element={<Welcome />} />
              <Route path="/profile-setup" element={<ProfileSetup />} />
              <Route path="/moving" element={<MovingSetup />} />
              <Route path="/requirements" element={<AccommodationRequirements />} />
              <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
              <Route path="/places" element={<RequireAuth><Home /></RequireAuth>} />
              <Route path="/listing/:id" element={<RequireAuth><ListingDetails /></RequireAuth>} />
              <Route path="/people" element={<RequireAuth><People /></RequireAuth>} />
              <Route path="/community" element={<RequireAuth><Community /></RequireAuth>} />
              <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}
