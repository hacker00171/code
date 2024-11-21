'use client'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, Shield} from "lucide-react"
import Link from 'next/link'

export default function Component() {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">Client Dashboard</h1>

      {/* Device Status */}
      <div className="bg-green-50 p-4 rounded-lg flex items-start gap-2">
        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
        <div>
          <p className="font-medium text-green-800">Device Connected</p>
          <p className="text-sm text-green-700">U2 Key device is ready for operations.</p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-3xl font-bold">450<span className="text-sm text-muted-foreground">/500</span></p>
                <p className="text-sm text-muted-foreground">Registered Users</p>
              </div>
              <Badge variant="secondary" className="text-green-500">+5</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-3xl font-bold">425</p>
                <p className="text-sm text-muted-foreground">Active Devices</p>
              </div>
              <Badge variant="secondary" className="text-green-500">+3</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-3xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Pending Registrations</p>
              </div>
              <Badge variant="secondary" className="text-red-500">-2</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-3xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Failed Attempts</p>
              </div>
              <Badge variant="secondary">0</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">John Smith</p>
                <p className="text-sm text-muted-foreground">Registration</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Success</Badge>
              <span className="text-sm text-muted-foreground">2 minutes ago</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <Shield className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Authentication</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="destructive">Failed</Badge>
              <span className="text-sm text-muted-foreground">5 minutes ago</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Mike Wilson</p>
                <p className="text-sm text-muted-foreground">Registration</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Success</Badge>
              <span className="text-sm text-muted-foreground">10 minutes ago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
  <CardHeader>
    <CardTitle>Quick Actions</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-2 gap-4">
      <Link href="/mock/deviceregesiter" passHref>
        <Button className="w-full bg-gray-900 text-white hover:bg-gray-800">
          Register Device
        </Button>
      </Link>
      <Link href="/mock/clientadmin/manage-users">
        <Button variant="outline" className="w-full">
          Manage Users
        </Button>
      </Link>
      <Link href="/mock/clientadmin/viewreport">
        <Button variant="outline" className="w-full">
          View Reports
        </Button>
      </Link>
      <Link href="/sync-devices" passHref>
        <Button variant="outline" className="w-full">
          Sync Devices
        </Button>
      </Link>
    </div>
  </CardContent>
</Card>
    </div>
  )
}