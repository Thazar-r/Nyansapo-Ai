// API endpoints
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

// Mock data for fallback
const mockAssessments = [
  {
    id: "1",
    title: "Name: Baseline",
    strand: "Letter Naming Uppercase",
    subStrand: "A B C D E",
    students: 25,
    rounds: 3,
    allDay: true,
    alert: true,
    date: "2023-10-15T10:00:00Z",
    completion: 85,
    performance: {
      excellent: 40,
      satisfactory: 35,
      needsImprovement: 25,
    },
  },
  {
    id: "2",
    title: "Science Assessment",
    strand: "Biology",
    subStrand: "Ecosystems",
    students: 30,
    rounds: 2,
    allDay: false,
    alert: true,
    date: "2023-05-20T14:00:00Z",
    completion: 50,
    performance: {
      excellent: 30,
      satisfactory: 40,
      needsImprovement: 30,
    },
  },
]

// Types
export interface Assessment {
  id: string
  title: string
  strand: string
  subStrand: string
  students: number
  rounds: number
  allDay: boolean
  alert: boolean
  date: string
  completion: number
  performance: {
    excellent: number
    satisfactory: number
    needsImprovement: number
  }
}

// API functions
export async function getAssessments(): Promise<Assessment[]> {
  try {
    // First try to fetch from API
    const response = await fetch("/api/assessments")

    if (!response.ok) {
      throw new Error("API response not ok")
    }

    return await response.json()
  } catch (error) {
    console.warn("API fetch failed, using mock data:", error)
    // Fallback to mock data if API fails
    return mockAssessments
  }
}

export async function getAssessment(id: string): Promise<Assessment> {
  try {
    const response = await fetch(`/api/assessments/${id}`)

    if (!response.ok) {
      throw new Error("API response not ok")
    }

    return await response.json()
  } catch (error) {
    console.warn("API fetch failed, using mock data:", error)
    // Fallback to mock data if API fails
    const assessment = mockAssessments.find((a) => a.id === id)
    if (!assessment) {
      throw new Error("Assessment not found")
    }
    return assessment
  }
}

export async function createAssessment(data: Omit<Assessment, "id">): Promise<Assessment> {
  try {
    const response = await fetch("/api/assessments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("API response not ok")
    }

    return await response.json()
  } catch (error) {
    console.warn("API create failed, using mock data:", error)
    // Create a mock assessment with a random ID
    const newAssessment = {
      id: Math.random().toString(36).substring(2, 9),
      ...data,
    }

    // Add to mock data
    mockAssessments.push(newAssessment)
    return newAssessment
  }
}

export async function updateAssessment(id: string, data: Partial<Assessment>): Promise<Assessment> {
  try {
    const response = await fetch(`/api/assessments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("API response not ok")
    }

    return await response.json()
  } catch (error) {
    console.warn("API update failed, using mock data:", error)
    // Update mock data
    const index = mockAssessments.findIndex((a) => a.id === id)
    if (index === -1) {
      throw new Error("Assessment not found")
    }

    mockAssessments[index] = {
      ...mockAssessments[index],
      ...data,
    }

    return mockAssessments[index]
  }
}

export async function deleteAssessment(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/assessments/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("API response not ok")
    }
  } catch (error) {
    console.warn("API delete failed, using mock data:", error)
    // Remove from mock data
    const index = mockAssessments.findIndex((a) => a.id === id)
    if (index !== -1) {
      mockAssessments.splice(index, 1)
    }
  }
}

