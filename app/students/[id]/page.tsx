"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Home, User, BookOpen, Users, Calendar, ArrowLeft, Edit, Trash2 } from "lucide-react"
import { getStudent, deleteStudent } from "@/lib/students-api"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function StudentDetailPage({ params }) {
  const router = useRouter()
  const [student, setStudent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudent(params.id)
        setStudent(data)
      } catch (error) {
        console.error("Failed to fetch student:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudent()
  }, [params.id])

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteStudent(params.id)
      router.push("/students")
    } catch (error) {
      console.error("Failed to delete student:", error)
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <main className="bg-[#1E3A8A] min-h-screen text-white">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center">Loading student data...</p>
        </div>
      </main>
    )
  }

  if (!student) {
    return (
      <main className="bg-[#1E3A8A] min-h-screen text-white">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center">Student not found</p>
          <Button onClick={() => router.push("/students")} className="mt-4 mx-auto block">
            Back to Students
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-[#1E3A8A] min-h-screen text-white">
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" className="mb-4 pl-0 text-white" onClick={() => router.push("/students")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">{student.name}</h1>
          <div className="flex space-x-2">
            <Link href={`/students/edit/${params.id}`}>
              <Button size="icon" variant="ghost" className="text-white">
                <Edit className="h-5 w-5" />
              </Button>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="icon" variant="ghost" className="text-white">
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#0F2563] text-white border-gray-700">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Student</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-300">
                    Are you sure you want to delete this student? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <Card className="bg-[#0F2563] border-none mb-4">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Class:</span>
                <span>{student.class}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Age:</span>
                <span>{student.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Gender:</span>
                <span>{student.gender}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0F2563] border-none">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Parent/Guardian:</span>
                <span>{student.parentName || "Not provided"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Contact Number:</span>
                <span>{student.contactNumber || "Not provided"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#0F2563] py-3">
          <div className="flex justify-around items-center">
            <Link href="/" className="flex flex-col items-center">
              <Home className="w-6 h-6 text-gray-400" />
              <span className="text-xs mt-1 text-gray-400">Dashboard</span>
            </Link>
            <Link href="/students" className="flex flex-col items-center">
              <User className="w-6 h-6 text-yellow-400" />
              <span className="text-xs mt-1 text-yellow-400">Students</span>
            </Link>
            <Link href="/assessments" className="flex flex-col items-center">
              <BookOpen className="w-6 h-6 text-gray-400" />
              <span className="text-xs mt-1 text-gray-400">Assessments</span>
            </Link>
            <Link href="/classes" className="flex flex-col items-center">
              <Users className="w-6 h-6 text-gray-400" />
              <span className="text-xs mt-1 text-gray-400">Classes</span>
            </Link>
            <Link href="/attendance" className="flex flex-col items-center">
              <Calendar className="w-6 h-6 text-gray-400" />
              <span className="text-xs mt-1 text-gray-400">Attendance</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

