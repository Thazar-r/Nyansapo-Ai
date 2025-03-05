import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Home, User, BookOpen, Users, Calendar } from "lucide-react"

export default function DashboardPage() {
  return (
    <main className="bg-[#1E3A8A] min-h-screen text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center">
            <div className="text-xs text-gray-400">9:41</div>
            <div className="ml-2 flex space-x-1">
              <div className="w-4 h-4 rounded-full bg-gray-400"></div>
              <div className="w-4 h-4 rounded-full bg-gray-400"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-[#0F2563] border-none">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center mb-2">
                <User className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Students</h3>
              <p className="text-2xl font-bold">25</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0F2563] border-none">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center mb-2">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Assessments</h3>
              <p className="text-2xl font-bold">12</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0F2563] border-none">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center mb-2">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Classes</h3>
              <p className="text-2xl font-bold">5</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0F2563] border-none">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center mb-2">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Attendance</h3>
              <p className="text-2xl font-bold">95%</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-lg font-semibold mb-4">Recent Assessments</h2>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Card key={i} className="bg-[#0F2563] border-none hover:bg-[#1A3578] transition-colors">
              <CardContent className="p-4">
                <div>
                  <h3 className="font-semibold">Assessment {i}</h3>
                  <p className="text-sm text-gray-300">Completed on {new Date().toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#0F2563] py-3">
          <div className="flex justify-around items-center">
            <Link href="/" className="flex flex-col items-center">
              <Home className="w-6 h-6 text-yellow-400" />
              <span className="text-xs mt-1 text-yellow-400">Dashboard</span>
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

