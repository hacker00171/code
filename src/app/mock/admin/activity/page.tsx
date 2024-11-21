'use client'

import { useState } from "react"
import { Sidebar } from "@/components/admin/Sidebar"

// Add this mock data
const activities = [
  {
    organization: "Infosys Ltd",
    action: "License Generated",
    time: "2 minutes ago",
    status: "success"
  },
  {
    organization: "TechCorp",
    action: "New Admin Created",
    time: "15 minutes ago",
    status: "default"
  },
  {
    organization: "Global Systems",
    action: "License Updated",
    time: "1 hour ago",
    status: "default"
  },
  {
    organization: "SecureAuth Inc",
    action: "Organization Created",
    time: "2 hours ago",
    status: "default"
  }
]

export default function ActivityPage() {
  const [activeTab] = useState("activity")

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} />
      
      <main className="flex-1 overflow-auto">
        <div className="border-b bg-white shadow-sm">
          <div className="flex h-16 items-center px-8">
            <h1 className="text-2xl font-semibold text-slate-800">Activity</h1>
          </div>
        </div>
        
        <div className="p-8">
          <div className="rounded-lg bg-white shadow">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className={`h-2 w-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <div>
                      <div className="font-medium text-gray-900">{activity.organization}</div>
                      <div className="text-sm text-gray-500">{activity.action}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 