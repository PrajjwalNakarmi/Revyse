import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getCurrentUser } from '../services/userService'
import './dashboard.css'
import './profile.css'

export default function Profile() {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  })

  const [originalData, setOriginalData] = useState({ ...formData })

  useEffect(() => {
    // Check if user is logged in
    const currentUser = getCurrentUser()
    if (!currentUser) {
      navigate('/login')
      return
    }

    setUser(currentUser)
    
    // Load user profile data
    const savedData = localStorage.getItem(`userProfile_${currentUser.id}`)
    let initialData
    if (savedData) {
      const parsed = JSON.parse(savedData)
      initialData = {
        fullName: parsed.fullName || currentUser.fullName,
        email: parsed.email || currentUser.email,
        phone: parsed.phone || '',
        location: parsed.location || '',
        bio: parsed.bio || ''
      }
    } else {
      // Initialize with user data
      initialData = {
        fullName: currentUser.fullName,
        email: currentUser.email,
        phone: '',
        location: '',
        bio: ''
      }
    }
    setFormData(initialData)
    setOriginalData(initialData)
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    if (!user) return
    
    // Save to localStorage (in real app, this would be an API call)
    localStorage.setItem(`userProfile_${user.id}`, JSON.stringify(formData))
    
    // Update current user data in both places used by the app
    const updatedUser = { ...user, fullName: formData.fullName, email: formData.email }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    
    setOriginalData({ ...formData })
    setIsEditing(false)
    alert('Profile updated successfully!')
    
    // Reload to update navbar
    window.location.reload()
  }

  if (!user) {
    return null // Will redirect to login
  }

  const handleCancel = () => {
    setFormData({ ...originalData })
    setIsEditing(false)
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <Navbar />
      
      <main className="dashboard-content">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="#e0e7ff"/>
                <circle cx="40" cy="32" r="12" fill="#667eea"/>
                <path d="M16 64C16 52 26 44 40 44C54 44 64 52 64 64" fill="#667eea"/>
              </svg>
            </div>
            <div className="profile-header-info">
              <h1 className="profile-name">{formData.fullName}</h1>
              <p className="profile-email">{formData.email}</p>
            </div>
            {!isEditing ? (
              <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M11.3333 2.00001C11.5084 1.82491 11.7163 1.68602 11.9444 1.59129C12.1726 1.49657 12.4163 1.44775 12.6625 1.44775C12.9087 1.44775 13.1524 1.49657 13.3806 1.59129C13.6087 1.68602 13.8166 1.82491 13.9917 2.00001C14.1668 2.17511 14.3057 2.38301 14.4004 2.61112C14.4951 2.83923 14.5439 3.08295 14.5439 3.32918C14.5439 3.5754 14.4951 3.81912 14.4004 4.04723C14.3057 4.27534 14.1668 4.48324 13.9917 4.65834L5.32499 13.325L2 14L2.67499 10.675L11.3333 2.00001Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Edit Profile
              </button>
            ) : (
              <div className="profile-actions">
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                <button className="save-btn" onClick={handleSave}>Save Changes</button>
              </div>
            )}
          </div>

          <div className="profile-content">
            <div className="profile-section">
              <h2 className="section-title">Personal Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  ) : (
                    <p className="form-value">{formData.fullName}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  ) : (
                    <p className="form-value">{formData.email}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  ) : (
                    <p className="form-value">{formData.phone}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  ) : (
                    <p className="form-value">{formData.location}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2 className="section-title">About</h2>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                {isEditing ? (
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="4"
                  />
                ) : (
                  <p className="form-value">{formData.bio}</p>
                )}
              </div>
            </div>

            <div className="profile-section">
              <h2 className="section-title">Account Settings</h2>
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3 className="setting-title">Change Password</h3>
                    <p className="setting-description">Update your password to keep your account secure</p>
                  </div>
                  <button className="setting-btn">Change</button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3 className="setting-title">Delete Account</h3>
                    <p className="setting-description">Permanently delete your account and all associated data</p>
                  </div>
                  <button className="setting-btn danger">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="dashboard-footer">
        <p className="footer-copyright">© 2024 Revyse. AI-Powered Resume Analysis & Job Matching.</p>
        <div className="footer-tech">
          <span>OCR</span>
          <span>•</span>
          <span>NLP</span>
          <span>•</span>
          <span>AI Embeddings</span>
        </div>
      </footer>
    </div>
  )
}
