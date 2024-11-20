'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Building, 
  Users, 
  KeyRound, 
  Activity,
  BarChart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

interface SidebarProps {
  activeTab: string;
}

export function Sidebar({ activeTab }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  return (
    <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} border-r bg-white shadow-sm transition-all duration-300`}>
      <div 
        className="flex h-16 items-center gap-2 border-b px-6 cursor-pointer bg-gradient-to-r from-slate-800 to-slate-900"
        onClick={() => {
          if (!isTransitioning) {
            setIsTransitioning(true)
            setIsSidebarOpen(!isSidebarOpen)
            // Reset the transitioning state after the animation completes
            setTimeout(() => setIsTransitioning(false), 300)
          }
        }}
      >
        <div className="w-8 h-8 bg-white rounded-lg flex-shrink-0 flex items-center justify-center">
          <span className="text-slate-800 font-bold text-xl">B</span>
        </div>
        <span className={`font-semibold text-white ${!isSidebarOpen && 'hidden'}`}>
          ByteNova Admin
        </span>
        {isSidebarOpen ? (
          <ChevronLeft className="h-4 w-4 ml-auto text-white" />
        ) : (
          <ChevronRight className="h-4 w-4 ml-auto text-white" />
        )}
      </div>
      <nav className="flex flex-col gap-3 p-4">
        <NavButton 
          href="/mock/admin"
          icon={<BarChart className="mr-2 h-4 w-4" />}
          label="Overview"
          isActive={activeTab === "overview"}
          isSidebarOpen={isSidebarOpen}
        />
        <NavButton 
          href="/mock/admin/organization"
          icon={<Building className="mr-2 h-4 w-4" />}
          label="Organizations"
          isActive={activeTab === "organization"}
          isSidebarOpen={isSidebarOpen}
        />
        <NavButton 
          href="/mock/admin/clientadmin"
          icon={<Users className="mr-2 h-4 w-4" />}
          label="Client Admins"
          isActive={activeTab === "clientadmin"}
          isSidebarOpen={isSidebarOpen}
        />
        <NavButton 
          href="/mock/admin/licenses"
          icon={<KeyRound className="mr-2 h-4 w-4" />}
          label="Licenses"
          isActive={activeTab === "licenses"}
          isSidebarOpen={isSidebarOpen}
        />
        <NavButton 
          href="/mock/admin/activity"
          icon={<Activity className="mr-2 h-4 w-4" />}
          label="Activity"
          isActive={activeTab === "activity"}
          isSidebarOpen={isSidebarOpen}
        />
      </nav>
    </aside>
  )
}

interface NavButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isSidebarOpen: boolean;
}

function NavButton({ href, icon, label, isActive, isSidebarOpen }: NavButtonProps) {
  return (
    <Button 
      variant={isActive ? "default" : "ghost"}
      className="justify-start w-full relative group"
      asChild
    >
      <Link href={href}>
        {icon}
        {isSidebarOpen ? (
          <span>{label}</span>
        ) : (
          <div className="absolute left-14 bg-white px-2 py-1 rounded-md shadow-md invisible group-hover:visible whitespace-nowrap z-50">
            {label}
          </div>
        )}
      </Link>
    </Button>
  )
} 