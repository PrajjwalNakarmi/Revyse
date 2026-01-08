// User Service - Manages user authentication and data

// Get current logged-in user
export function getCurrentUser() {
  // Primary source used by the main auth flow
  const userStr = localStorage.getItem('user')

  // Fallback for any older data that might still be stored
  if (!userStr) {
    const legacyUserStr = localStorage.getItem('currentUser')
    return legacyUserStr ? JSON.parse(legacyUserStr) : null
  }

  return JSON.parse(userStr)
}

// Set current logged-in user
export function setCurrentUser(user) {
  // Keep both keys in sync so older code keeps working
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('currentUser', JSON.stringify(user))
}

// Clear current user (logout)
export function clearCurrentUser() {
  localStorage.removeItem('user')
  localStorage.removeItem('currentUser')
  localStorage.removeItem('token')
}

// Get user-specific resumes
export function getUserResumes(userId) {
  const resumesStr = localStorage.getItem(`userResumes_${userId}`)
  return resumesStr ? JSON.parse(resumesStr) : []
}

// Save user resumes
export function saveUserResumes(userId, resumes) {
  localStorage.setItem(`userResumes_${userId}`, JSON.stringify(resumes))
}

// Add a resume for a user
export function addUserResume(userId, resume) {
  const resumes = getUserResumes(userId)
  const newResume = {
    id: Date.now().toString(),
    ...resume,
    uploadDate: new Date().toISOString()
  }
  resumes.unshift(newResume) // Add to beginning
  saveUserResumes(userId, resumes)
  return newResume
}

// Delete a resume for a user (by id or uploadDate as fallback)
export function deleteUserResume(userId, resumeId) {
  const resumes = getUserResumes(userId)
  const filteredResumes = resumes.filter(resume => {
    // Try to match by id first, then by uploadDate as fallback
    return resume.id !== resumeId && resume.uploadDate !== resumeId
  })
  saveUserResumes(userId, filteredResumes)
  return filteredResumes
}

// Get user stats
export function getUserStats(userId) {
  const resumes = getUserResumes(userId)
  
  if (resumes.length === 0) {
    return {
      totalResumes: 0,
      averageScore: 0,
      avgAtsScore: 0
    }
  }

  const totalResumes = resumes.length
  const scores = resumes.map(r => r.score || 0).filter(s => s > 0)
  const atsScores = resumes.map(r => r.atsScore || 0).filter(s => s > 0)
  
  const averageScore = scores.length > 0 
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0
  
  const avgAtsScore = atsScores.length > 0
    ? Math.round(atsScores.reduce((a, b) => a + b, 0) / atsScores.length)
    : 0

  return {
    totalResumes,
    averageScore,
    avgAtsScore
  }
}

// Initialize user data (for new users)
export function initializeUserData(userId, userData) {
  // Initialize with default data if user is new
  const existingResumes = getUserResumes(userId)
  if (existingResumes.length === 0) {
    // No initialization needed - user starts with empty dashboard
  }
}

// Mock user database (for demo purposes)
const users = [
  { id: '1', email: 'sarah@example.com', password: 'password123', fullName: 'Sarah Johnson' },
  { id: '2', email: 'john@example.com', password: 'password123', fullName: 'John Smith' }
]

// Login user
export function loginUser(email, password) {
  // Mock authentication - in real app, this would be an API call
  const user = users.find(u => u.email === email && u.password === password)
  
  if (user) {
    const userData = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      loginTime: new Date().toISOString()
    }
    setCurrentUser(userData)
    initializeUserData(user.id, userData)
    return userData
  }
  
  return null
}

// Register new user
export function registerUser(fullName, email, password) {
  // Mock registration - in real app, this would be an API call
  const newUser = {
    id: Date.now().toString(),
    email,
    password, // In real app, this would be hashed
    fullName
  }
  
  users.push(newUser)
  
  const userData = {
    id: newUser.id,
    email: newUser.email,
    fullName: newUser.fullName,
    loginTime: new Date().toISOString()
  }
  
  setCurrentUser(userData)
  initializeUserData(newUser.id, userData)
  return userData
}
