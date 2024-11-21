'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Building, 
  Users, 
  KeyRound, 
  Activity,
  Search,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Sidebar } from "@/components/admin/Sidebar"

export default function AdminDashboard() {
  const [activeTab] = useState("overview")

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="border-b bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-8">
            <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium shadow-lg">
                  A
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Stats Overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="transform transition-all duration-200"
            >
              <Card className="bg-gradient-to-br from-slate-700 to-slate-800 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <Building className="h-8 w-8 opacity-80" />
                    <Badge className="bg-slate-600/30 text-white hover:bg-slate-600/40">+2</Badge>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-bold">12</div>
                    <div className="text-sm opacity-80">Total Organizations</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="transform transition-all duration-200"
            >
              <Card className="bg-gradient-to-br from-slate-600 to-slate-700 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <KeyRound className="h-8 w-8 opacity-80" />
                    <Badge className="bg-slate-500/30 text-white hover:bg-slate-500/40">+5</Badge>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-bold">45</div>
                    <div className="text-sm opacity-80">Active Licenses</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="transform transition-all duration-200"
            >
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <Users className="h-8 w-8 opacity-80" />
                    <Badge className="bg-slate-700/30 text-white hover:bg-slate-700/40">+8</Badge>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-bold">1,234</div>
                    <div className="text-sm opacity-80">Total Users</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="transform transition-all duration-200"
            >
              <Card className="bg-gradient-to-br from-slate-900 to-black text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <Activity className="h-8 w-8 opacity-80" />
                    <Badge className="bg-slate-800/30 text-white hover:bg-slate-800/40">+12</Badge>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-bold">89</div>
                    <div className="text-sm opacity-80">Device Registrations</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activities and Overview */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="border-b bg-slate-50">
                <CardTitle className="text-slate-800">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  <div className="p-4 hover:bg-slate-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-800">Infosys Ltd</div>
                        <div className="text-sm text-slate-500 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          License Generated
                        </div>
                      </div>
                      <div className="text-sm text-slate-500">2 minutes ago</div>
                    </div>
                  </div>
                  
                  <div className="p-4 hover:bg-slate-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-800">TechCorp</div>
                        <div className="text-sm text-slate-500">New Admin Created</div>
                      </div>
                      <div className="text-sm text-slate-500">15 minutes ago</div>
                    </div>
                  </div>
                  
                  <div className="p-4 hover:bg-slate-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-800">Global Systems</div>
                        <div className="text-sm text-slate-500">License Updated</div>
                      </div>
                      <div className="text-sm text-slate-500">1 hour ago</div>
                    </div>
                  </div>
                  
                  <div className="p-4 hover:bg-slate-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-800">SecureAuth Inc</div>
                        <div className="text-sm text-slate-500">Organization Created</div>
                      </div>
                      <div className="text-sm text-slate-500">2 hours ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="border-b bg-slate-50">
                <CardTitle className="text-slate-800">Organization Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                    <div className="text-sm font-medium text-gray-600">Active Organizations</div>
                    <div className="text-lg font-bold text-gray-800">10</div>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                    <div className="text-sm font-medium text-gray-600">Pending Licenses</div>
                    <div className="text-lg font-bold text-gray-800">3</div>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                    <div className="text-sm font-medium text-gray-600">License Renewals Due</div>
                    <div className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      2
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                    <div className="text-sm font-medium text-gray-600">License Renewals Due Date</div>
                    <div className="text-lg font-bold text-gray-800">
                    <span className="text-sm font-normal text-red-500"> (Next: Dec 15, 2024)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                    <div className="text-sm font-medium text-gray-600">New Organizations (30d)</div>
                    <div className="text-lg font-bold text-gray-800">5</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}