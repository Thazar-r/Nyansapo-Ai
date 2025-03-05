// Mock data for students
let mockStudents = [
  {
    id: "1",
    name: "John Doe",
    class: "Class 1",
    age: "8",
    gender: "Male",
    parentName: "Jane Doe",
    contactNumber: "123-456-7890",
  },
  {
    id: "2",
    name: "Sarah Smith",
    class: "Class 2",
    age: "9",
    gender: "Female",
    parentName: "Mike Smith",
    contactNumber: "234-567-8901",
  },
  {
    id: "3",
    name: "Michael Johnson",
    class: "Class 1",
    age: "8",
    gender: "Male",
    parentName: "Lisa Johnson",
    contactNumber: "345-678-9012",
  },
]

// Types
export interface Student {
  id: string
  name: string
  class: string
  age: string
  gender: string
  parentName: string
  contactNumber: string
}

// API functions
export async function getStudents(): Promise<Student[]> {
  try {
    // First try to fetch from API
    const response = await fetch("/api/students")

    if (!response.ok) {
      throw new Error("API response not ok")
    }

    return await response.json()
  } catch (error) {
    console.warn("API fetch failed, using mock data:", error)
    // Fallback to mock data if API fails
    return mockStudents
  }
}

export async function getStudent(id: string): Promise<Student> {
  try {
    const response = await fetch(`/api/students/${id}`)

    if (!response.ok) {
      throw new Error("API response not ok")
    }

    return await response.json()
  } catch (error) {
    console.warn("API fetch failed, using mock data:", error)
    // Fallback to mock data if API fails
    const student = mockStudents.find((s) => s.id === id)
    if (!student) {
      throw new Error("Student not found")
    }
    return student
  }
}

export async function createStudent(data: Omit<Student, "id">): Promise<Student> {
  try {
    const response = await fetch("/api/students", {
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
    // Create a mock student with a random ID
    const newStudent = {
      id: Math.random().toString(36).substring(2, 9),
      ...data,
    }

    // Add to mock data
    mockStudents.push(newStudent)
    return newStudent
  }
}

export async function updateStudent(id: string, data: Partial<Student>): Promise<Student> {
  try {
    const response = await fetch(`/api/students/${id}`, {
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
    const index = mockStudents.findIndex((s) => s.id === id)
    if (index === -1) {
      throw new Error("Student not found")
    }

    mockStudents[index] = {
      ...mockStudents[index],
      ...data,
    }

    return mockStudents[index]
  }
}

export async function deleteStudent(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/students/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("API response not ok")
    }
  } catch (error) {
    console.warn("API delete failed, using mock data:", error)
    // Remove from mock data
    mockStudents = mockStudents.filter((s) => s.id !== id)
  }
}

