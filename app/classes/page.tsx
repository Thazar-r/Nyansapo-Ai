import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, Home, User, BookOpen, Users, Calendar } from "lucide-react"

export default function ClassesPage() {
  return (
    <main className="bg-[#1E3A8A] min-h-screen text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Classes</h1>
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
            placeholder="Search Classes..."
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <Filter className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-[#0F2563] border-none hover:bg-[#1A3578] transition-colors">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Class {i}</h3>
                    <p className="text-sm text-gray-300">{10 + i} Students</p>
                  </div>
                  <div className="bg-blue-700 px-3 py-1 rounded-full text-xs">Active</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="fixed bottom-20 right-6">
          <Button className="rounded-full w-12 h-12 text-2xl bg-yellow-400 hover:bg-yellow-500 text-black">+</Button>
        </div>

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
              <BookOpen className="w-6 h-6 text-gray-400" />
              <span className="text-xs mt-1 text-gray-400">Assessments</span>
            </Link>
            <Link href="/classes" className="flex flex-col items-center">
              <Users className="w-6 h-6 text-yellow-400" />
              <span className="text-xs mt-1 text-yellow-400">Classes</span>
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

