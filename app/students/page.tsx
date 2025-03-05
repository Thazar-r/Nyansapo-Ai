"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, Home, User, BookOpen, Users, Calendar, MoreVertical } from "lucide-react"
import { getStudents } from "@/lib/students-api"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function StudentsPage() {
  const router = useRouter()
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents()
        setStudents(data)
      } catch (error) {
        console.error("Failed to fetch students:", error)
        setStudents([])
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main className="bg-[#1E3A8A] min-h-screen text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Students</h1>
          <div className="flex items-center">
            <div className="text-xs text-gray-400">9:41</div>
            <div className="ml-2 flex space-x-1">
              <div className="w-4 h-4 rounded-full bg-gray-400"></div>
              <div className="w-4 h-4 rounded-full bg-gray-400"></div>
            </div>
          </div>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full p-3 pl-10 pr-10 text-sm border rounded-full bg-[#0F2563] border-[#0F2563] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search Students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <Filter className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {loading ? (
          <p className="text-center py-8">Loading students...</p>
        ) : filteredStudents.length === 0 ? (
          <Card className="bg-[#0F2563] border-dashed border-gray-600">
            <CardContent className="p-8 text-center">
              <p className="text-gray-300">No students found</p>
              <p className="text-sm text-gray-400 mt-2">Add your first student by clicking the + button</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="bg-[#0F2563] border-none hover:bg-[#1A3578] transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <Link href={`/students/${student.id}`} className="flex items-center space-x-3 flex-1">
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold">{student.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-gray-300">{student.class}</p>
                      </div>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[#0F2563] border-gray-700 text-white">
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-[#1A3578]"
                          onClick={() => router.push(`/students/${student.id}`)}
                        >
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-[#1A3578]"
                          onClick={() => router.push(`/students/edit/${student.id}`)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-red-500 hover:bg-[#1A3578] hover:text-red-400"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this student?")) {
                              router.push(`/students/${student.id}?delete=true`)
                            }
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="fixed bottom-20 right-6">
          <Link href="/students/add">
            <Button className="rounded-full w-12 h-12 text-2xl bg-yellow-400 hover:bg-yellow-500 text-black">+</Button>
          </Link>
        </div>

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

