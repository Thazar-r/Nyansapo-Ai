"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Users } from "lucide-react"
import { getAssessment } from "@/lib/api"
import { formatDate } from "@/lib/utils"
import PerformanceBar from "@/components/performance-bar"

export default function AssessmentDetail({ params }) {
  const router = useRouter()
  const [assessment, setAssessment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const data = await getAssessment(params.id)
        setAssessment(data)
      } catch (error) {
        console.error("Failed to fetch assessment:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAssessment()
  }, [params.id])

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-8 flex justify-center">
            <p>Loading assessment details...</p>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (!assessment) {
    return (
      <main className="container mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-8">
            <p>Assessment not found</p>
            <Button onClick={() => router.push("/")} className="mt-4">
              Back to Assessments
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <Button variant="ghost" className="mb-4 pl-0" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{assessment.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Strand</p>
              <p className="font-medium">{assessment.strand}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sub Strand</p>
              <p className="font-medium">{assessment.subStrand}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{assessment.students} Students</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{formatDate(assessment.date)}</span>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Completion</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${assessment.completion}%` }}></div>
            </div>
            <p className="text-right text-sm mt-1">{assessment.completion}%</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Performance</p>
            <PerformanceBar label="Excellent" value={assessment.performance.excellent} color="bg-green-500" />
            <PerformanceBar label="Satisfactory" value={assessment.performance.satisfactory} color="bg-yellow-500" />
            <PerformanceBar
              label="Needs Improvement"
              value={assessment.performance.needsImprovement}
              color="bg-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">All Day</p>
              <p className="font-medium">{assessment.allDay ? "Yes" : "No"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Alert</p>
              <p className="font-medium">{assessment.alert ? "Enabled" : "Disabled"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

