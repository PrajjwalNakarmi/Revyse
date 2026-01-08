// Mock CV Analysis Service
// In a real application, this would call an API to analyze the CV

export async function analyzeCV(file) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Extract basic info from filename (for demo purposes)
  const fileName = file.name.toLowerCase()
  
  // Mock analysis based on file name patterns
  // In production, this would use OCR/NLP to extract actual data
  const isSoftwareEngineer = fileName.includes('software') || fileName.includes('engineer') || fileName.includes('developer')
  const isProductManager = fileName.includes('product') || fileName.includes('manager')
  const isDataScientist = fileName.includes('data') || fileName.includes('scientist')
  
  // Generate dynamic analysis data
  const analysisData = {
    fileName: file.name,
    uploadDate: new Date().toISOString(),
    overallScore: isSoftwareEngineer ? 100 : isProductManager ? 95 : 88,
    atsScore: isSoftwareEngineer ? 90 : isProductManager ? 88 : 85,
    strengths: generateStrengths(isSoftwareEngineer, isProductManager, isDataScientist),
    areasToImprove: generateAreasToImprove(isSoftwareEngineer, isProductManager),
    recommendations: generateRecommendations(isSoftwareEngineer, isProductManager),
    extractedInfo: generateExtractedInfo(fileName, isSoftwareEngineer, isProductManager, isDataScientist)
  }

  return analysisData
}

function generateStrengths(isSoftwareEngineer, isProductManager, isDataScientist) {
  const baseStrengths = [
    'Complete contact information provided',
    'Strong professional summary that highlights key achievements'
  ]

  if (isSoftwareEngineer) {
    return [
      ...baseStrengths,
      '2 relevant work experiences documented',
      'Quantifiable achievements included (metrics, percentages, numbers)',
      'Education background clearly documented'
    ]
  }

  if (isProductManager) {
    return [
      ...baseStrengths,
      '3 relevant work experiences documented',
      'Strong leadership examples provided',
      'Product metrics and KPIs clearly highlighted'
    ]
  }

  return [
    ...baseStrengths,
    'Relevant work experience documented',
    'Technical skills well organized',
    'Education background clearly documented'
  ]
}

function generateAreasToImprove(isSoftwareEngineer, isProductManager) {
  if (isSoftwareEngineer) {
    return [
      'Moderate number of skills listed - could be expanded'
    ]
  }

  if (isProductManager) {
    return [
      'Consider adding more technical skills to enhance versatility',
      'Could benefit from more quantifiable achievements'
    ]
  }

  return [
    'Skills section could be more comprehensive',
    'Consider adding more detail about project outcomes'
  ]
}

function generateRecommendations(isSoftwareEngineer, isProductManager) {
  const baseRecommendations = [
    'Add more relevant technical and soft skills to increase ATS matching',
    'CV appears brief - consider adding more detail about your experience and achievements',
    'Use action verbs to start each bullet point (e.g., "Led", "Developed", "Implemented")',
    'Tailor your CV for each job application by matching keywords from the job description',
    'Keep formatting simple and clean - avoid tables, text boxes, and images for ATS compatibility'
  ]

  if (isSoftwareEngineer) {
    return [
      'Highlight specific programming languages and frameworks used in projects',
      ...baseRecommendations.slice(1)
    ]
  }

  if (isProductManager) {
    return [
      'Emphasize product launches and their impact on business metrics',
      ...baseRecommendations.slice(1)
    ]
  }

  return baseRecommendations
}

function generateExtractedInfo(fileName, isSoftwareEngineer, isProductManager, isDataScientist) {
  // Extract name from filename (simple pattern matching)
  let name = 'Sarah Johnson'
  if (fileName.includes('john')) {
    name = 'John Smith'
  } else if (fileName.includes('jane')) {
    name = 'Jane Doe'
  }

  // Generate email based on name
  const emailName = name.toLowerCase().replace(' ', '.')
  const email = `${emailName}@email.com`

  // Generate skills based on role
  let skills = []
  if (isSoftwareEngineer) {
    skills = ['JavaScript', 'React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'MongoDB', 'REST APIs']
  } else if (isProductManager) {
    skills = ['Product Strategy', 'Agile', 'Scrum', 'User Research', 'Data Analysis', 'Stakeholder Management', 'Roadmapping', 'A/B Testing']
  } else if (isDataScientist) {
    skills = ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Pandas', 'Data Visualization', 'Statistics', 'Deep Learning']
  } else {
    skills = ['Project Management', 'Communication', 'Leadership', 'Problem Solving', 'Team Collaboration', 'Strategic Planning']
  }

  return {
    name,
    email,
    skills,
    experienceCount: isSoftwareEngineer ? 2 : isProductManager ? 3 : 1,
    skillsCount: skills.length
  }
}

// Store analysis data in localStorage
export function saveAnalysisData(analysisData) {
  localStorage.setItem('currentCVAnalysis', JSON.stringify(analysisData))
}

// Retrieve analysis data from localStorage
export function getAnalysisData() {
  const stored = localStorage.getItem('currentCVAnalysis')
  return stored ? JSON.parse(stored) : null
}

// Clear analysis data
export function clearAnalysisData() {
  localStorage.removeItem('currentCVAnalysis')
}
