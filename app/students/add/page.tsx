"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Home, User, BookOpen, Users, Calendar, ChevronDown } from "lucide-react"
import { createStudent } from "@/lib/students-api"

export default function AddStudentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    class: "Class 1",
    age: "",
    gender: "Male",
    parentName: "",
    contactNumber: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await createStudent(formData)
      router.push("/students")
    } catch (error) {
      console.error("Failed to create student:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-[#1E3A8A] min-h-screen text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Add New Student</h1>
          <div className="flex items-center">
            <div className="text-xs text-gray-400">9:41</div>
            <div className="ml-2 flex space-x-1">
              <div className="w-4 h-4 rounded-full bg-gray-400"></div>
              <div className="w-4 h-4 rounded-full bg-gray-400"></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-400 text-sm">
                Student Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter student name"
                className="bg-[#0F2563] border-[#0F2563] text-white mt-1"
              />
            </div>

            <div>
              <Label htmlFor="class" className="text-gray-400 text-sm">
                Class
              </Label>
              <div className="relative">
                <select
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="block w-full p-3 pr-10 text-sm rounded-md bg-[#0F2563] border-[#0F2563] text-white appearance-none mt-1"
                >
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="age" className="text-gray-400 text-sm">
                Age
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
                placeholder="Enter age"
                className="bg-[#0F2563] border-[#0F2563] text-white mt-1"
              />
            </div>

            <div>
              <Label htmlFor="gender" className="text-gray-400 text-sm">
                Gender
              </Label>
              <div className="relative">
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full p-3 pr-10 text-sm rounded-md bg-[#0F2563] border-[#0F2563] text-white appearance-none mt-1"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="parentName" className="text-gray-400 text-sm">
                Parent/Guardian Name
              </Label>
              <Input
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                placeholder="Enter parent/guardian name"
                className="bg-[#0F2563] border-[#0F2563] text-white mt-1"
              />
            </div>

            <div>
              <Label htmlFor="contactNumber" className="text-gray-400 text-sm">
                Contact Number
              </Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter contact number"
                className="bg-[#0F2563] border-[#0F2563] text-white mt-1"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              className="w-1/2 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3"
              onClick={() => router.push("/students")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-1/2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>

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

