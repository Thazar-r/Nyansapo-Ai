"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getAssessments } from "@/lib/api"
import { formatDate } from "@/lib/utils"

export default function AssessmentList() {
  const [assessments, setAssessments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const data = await getAssessments()
        setAssessments(data)
      } catch (error) {
        console.error("Failed to fetch assessments:", error)
        // Set empty array to avoid showing loading indefinitely
        setAssessments([])
      } finally {
        setLoading(false)
      }
    }

    fetchAssessments()
  }, [])

  if (loading) {
    return <p className="text-center py-8 text-white">Loading assessments...</p>
  }

  if (assessments.length === 0) {
    return (
      <Card className="bg-[#0F2563] border-dashed border-gray-600">
        <CardContent className="p-8 text-center">
          <p className="text-gray-300">No assessments found</p>
          <p className="text-sm text-gray-400 mt-2">Create your first assessment by clicking the + button</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {assessments.map((assessment) => (
        <Link href={`/assessment/${assessment.id}`} key={assessment.id}>
          <Card className="bg-[#0F2563] border-none hover:bg-[#1A3578] transition-colors">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{assessment.title}</h3>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>{assessment.strand}</span>
                  </div>
                  <div className="text-sm text-gray-300">
                    <span>{assessment.subStrand}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300">Completion</span>
                    <span className="text-green-400">{assessment.completion}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: `${assessment.completion}%` }}></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-300">
                  <span>Date: {formatDate(assessment.date)}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold">
                      {assessment.performance.needsImprovement}%
                    </div>
                    <span className="text-[10px] mt-1 text-gray-300">Below</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold">
                      {assessment.performance.satisfactory}%
                    </div>
                    <span className="text-[10px] mt-1 text-gray-300">Average</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold">
                      {assessment.performance.excellent}%
                    </div>
                    <span className="text-[10px] mt-1 text-gray-300">Excellent</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

