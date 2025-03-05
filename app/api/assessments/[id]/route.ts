import { NextResponse } from "next/server"

// This references the in-memory database from the main route handler
// In a real application, you would use a proper database
let assessments = [
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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const assessment = assessments.find((a) => a.id === id)

  if (!assessment) {
    return NextResponse.json({ error: "Assessment not found" }, { status: 404 })
  }

  return NextResponse.json(assessment)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const data = await request.json()

  const index = assessments.findIndex((a) => a.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "Assessment not found" }, { status: 404 })
  }

  assessments[index] = {
    ...assessments[index],
    ...data,
  }

  return NextResponse.json(assessments[index])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  const index = assessments.findIndex((a) => a.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "Assessment not found" }, { status: 404 })
  }

  assessments = assessments.filter((a) => a.id !== id)

  return NextResponse.json({}, { status: 204 })
}

