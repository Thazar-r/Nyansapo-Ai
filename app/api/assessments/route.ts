import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

// In-memory database for demo purposes
// In a real application, you would use a proper database
const assessments = [
  {
    id: "1",
    title: "Math Assessment",
    strand: "Number",
    subStrand: "Addition",
    students: 25,
    rounds: 3,
    allDay: true,
    alert: false,
    date: "2023-05-15T10:00:00Z",
    completion: 75,
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

export async function GET() {
  return NextResponse.json(assessments)
}

export async function POST(request: Request) {
  const data = await request.json()

  // Validate required fields
  if (!data.title || !data.strand || !data.subStrand) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const newAssessment = {
    id: uuidv4(),
    ...data,
  }

  assessments.push(newAssessment)

  return NextResponse.json(newAssessment, { status: 201 })
}

