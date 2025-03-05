"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { createAssessment } from "@/lib/api"
import { ChevronDown, Home, User, BookOpen } from "lucide-react"
import Link from "next/link"
import { Users, Calendar } from "lucide-react"

export default function CreateAssessment() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    strand: "Letter Naming Uppercase",
    subStrand: "A B C D E",
    students: "25",
    rounds: "3",
    allDay: true,
    alert: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alertDate, setAlertDate] = useState("Monday, 16th Oct")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name) => (checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await createAssessment({
        ...formData,
        students: Number.parseInt(formData.students) || 0,
        rounds: Number.parseInt(formData.rounds) || 0,
        date: new Date().toISOString(),
        completion: 0, // Default completion
        performance: {
          excellent: Math.floor(Math.random() * 30) + 10,
          satisfactory: Math.floor(Math.random() * 30) + 10,
          needsImprovement: Math.floor(Math.random() * 30) + 10,
        },
      })

      router.push("/")
    } catch (error) {
      console.error("Failed to create assessment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-[#1E3A8A] min-h-screen text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">New Assessment</h1>
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
              <Label htmlFor="title" className="text-gray-400 text-sm">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Eg. Read Book"
                className="bg-[#0F2563] border-[#0F2563] text-white mt-1"
              />
            </div>

            <div>
              <Label htmlFor="strand" className="text-gray-400 text-sm">
                Strand
              </Label>
              <div className="relative">
                <select
                  id="strand"
                  name="strand"
                  value={formData.strand}
                  onChange={handleChange}
                  className="block w-full p-3 pr-10 text-sm rounded-md bg-[#0F2563] border-[#0F2563] text-white appearance-none mt-1"
                >
                  <option value="Letter Naming Uppercase">Letter Naming Uppercase</option>
                  <option value="Letter Naming Lowercase">Letter Naming Lowercase</option>
                  <option value="Letter Sounds">Letter Sounds</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="subStrand" className="text-gray-400 text-sm">
                Sub strand
              </Label>
              <div className="relative">
                <select
                  id="subStrand"
                  name="subStrand"
                  value={formData.subStrand}
                  onChange={handleChange}
                  className="block w-full p-3 pr-10 text-sm rounded-md bg-[#0F2563] border-[#0F2563] text-white appearance-none mt-1"
                >
                  <option value="A B C D E">A B C D E</option>
                  <option value="F G H I J">F G H I J</option>
                  <option value="K L M N O">K L M N O</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <Label htmlFor="allDay" className="text-sm">
                All day
              </Label>
              <Switch
                id="allDay"
                checked={formData.allDay}
                onCheckedChange={handleSwitchChange("allDay")}
                className="data-[state=checked]:bg-green-500"
              />
            </div>

            <div className="text-gray-400 text-sm py-1">{alertDate}</div>

            <div className="flex items-center justify-between py-2">
              <div>
                <Label htmlFor="alert" className="text-sm">
                  Alert
                </Label>
                <p className="text-xs text-gray-400">1 day before class</p>
              </div>
              <Switch
                id="alert"
                checked={formData.alert}
                onCheckedChange={handleSwitchChange("alert")}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </form>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#0F2563] py-3">
          <div className="flex justify-around items-center">
            <Link href="/" className="flex flex-col items-center">
              <Home className="w-6 h-6 text-gray-400" />
              <span className="text-xs mt-1 text-gray-400">Dashboard</span>
            </Link>
            <Link href="/students" className="flex flex-col items-center">
              <User className="w-6 h-6 text-gray-400" />
              <span className="text-xs mt-1 text-gray-400">Students</span>
            </Link>
            <Link href="/assessments" className="flex flex-col items-center">
              <BookOpen className="w-6 h-6 text-yellow-400" />
              <span className="text-xs mt-1 text-yellow-400">Assessments</span>
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

