import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getCurrentUser, clearCurrentUser, getUserResumes } from '../services/userService'
import './Navbar.css'

export default function Navbar({ onUploadClick }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [userStats, setUserStats] = useState({ resumes: 0, savedJobs: 0 })
  const dropdownRef = useRef(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    
    if (currentUser) {
      const resumes = getUserResumes(currentUser.id)
      setUserStats({
        resumes: resumes.length,
        savedJobs: 0 // Can be extended later
      })
    }
  }, [location])

  const isActive = (path) => {
    return location.pathname === path
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const handleProfileClick = () => {
    setIsDropdownOpen(false)
    navigate('/profile')
  }

  const handleLogout = () => {
    setIsDropdownOpen(false)
    clearCurrentUser()
    navigate('/login')
  }

  if (!user) {
    return null // Don't show navbar if not logged in
  }

  return (
    <>
      {/* Top Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-section">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="4" fill="#667eea"/>
                <path d="M10 10L22 22M22 10L10 22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1 className="brand-title">Revyse</h1>
              <p className="brand-subtitle">AI-Powered Resume Platform</p>
            </div>
          </div>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-details">
              <p className="user-name">{user.fullName}</p>
              <p className="user-stats">{userStats.resumes} resumes • {userStats.savedJobs} saved jobs</p>
            </div>
            {onUploadClick && (
              <button className="upload-btn" onClick={onUploadClick}>+ Upload Resume</button>
            )}
            <div className="user-icon-container" ref={dropdownRef}>
              <button 
                className="user-icon-btn" 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label="User menu"
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="20" fill="#e0e7ff"/>
                  <circle cx="20" cy="16" r="6" fill="#667eea"/>
                  <path d="M8 32C8 26 13 22 20 22C27 22 32 26 32 32" fill="#667eea"/>
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="user-dropdown">
                  <button className="dropdown-item" onClick={handleProfileClick}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="currentColor"/>
                      <path d="M8 10C4.68629 10 2 12.6863 2 16V16H14V16C14 12.6863 11.3137 10 8 10Z" fill="currentColor"/>
                    </svg>
                    <span>Profile</span>
                  </button>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M11 11L14 8L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Secondary Navigation */}
      <nav className="secondary-nav">
        <Link to="/dashboard" className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '8px' }}>
            <rect x="2" y="2" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="10" y="2" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="2" y="10" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="10" y="10" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          Dashboard
        </Link>
        <Link to="/analysis" className={`nav-item ${isActive('/analysis') ? 'active' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '8px' }}>
            <path d="M2 12L6 8L9 11L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6H14V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Analysis
        </Link>
        <Link to="/job-matching" className={`nav-item ${isActive('/job-matching') ? 'active' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '8px' }}>
            <path d="M7 3L3 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 3L9 7L13 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8" cy="7" r="2" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          Job Matching
        </Link>
        <Link to="/saved-jobs" className={`nav-item ${isActive('/saved-jobs') ? 'active' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '8px' }}>
            <path d="M8 3L10.5 6L14 6.5L11.5 9L12 12.5L8 10.5L4 12.5L4.5 9L2 6.5L5.5 6L8 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Saved Jobs
        </Link>
        <Link to="/resume-builder" className={`nav-item ${isActive('/resume-builder') ? 'active' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '8px' }}>
            <path d="M4 2H12C12.5523 2 13 2.44772 13 3V13C13 13.5523 12.5523 14 12 14H4C3.44772 14 3 13.5523 3 13V3C3 2.44772 3.44772 2 4 2Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 6H11M5 9H11M5 12H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Resume Builder
        </Link>
      </nav>
    </>
  )
}
