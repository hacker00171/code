'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Download,} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sidebar } from "@/components/admin/Sidebar"

export default function OrganizationManagement() {
  const [open, setOpen] = React.useState(false)
  const [activeTab] = React.useState("organization")

  const organizations = [
    { 
      id: 1, 
      name: "Infosys Ltd", 
      users: "450/500", 
      rpValue: "infosys.com", 
      licenseStatus: "Active",
      lastActive: "15/2/2024" 
    },
    { 
      id: 2, 
      name: "TechCorp Solutions", 
      users: "95/100", 
      rpValue: "techcorp.com", 
      licenseStatus: "Expiring",
      lastActive: "14/2/2024" 
    },
    { 
      id: 3, 
      name: "Global Systems Inc", 
      users: "200/200", 
      rpValue: "globalsys.com", 
      licenseStatus: "Expired",
      lastActive: "20/1/2024" 
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="border-b bg-white shadow-sm">
          <div className="flex h-16 items-center px-8">
            <h1 className="text-2xl font-semibold text-slate-800">Organization Management</h1>
          </div>
        </div>

        <div className="p-6">
          <Link href="/mock/admin" className="flex items-center text-sm mb-6 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="mb-6 flex items-center gap-4">
            <Input 
              className="max-w-md" 
              placeholder="Search organizations..." 
              type="search"
            />
            <div className="ml-auto flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Organization
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Organization</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Organization Name</Label>
                      <Input id="name" placeholder="Enter organization name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="rpValue">RP Value</Label>
                      <Input id="rpValue" placeholder="e.g., example.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="users">Maximum Users</Label>
                      <Input id="users" type="number" placeholder="Enter maximum users" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setOpen(false)}>
                      Add Organization
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Organizations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organization</TableHead>
                    <TableHead>License Status</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>RP Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {organizations.map((org) => (
                    <TableRow key={org.id}>
                      <TableCell>
                        <div>
                          {org.name}
                          <div className="text-sm text-gray-500">ID: {org.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          org.licenseStatus === 'Active' ? 'bg-green-100 text-green-800' :
                          org.licenseStatus === 'Expiring' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {org.licenseStatus}
                        </span>
                      </TableCell>
                      <TableCell>{org.users}</TableCell>
                      <TableCell>{org.lastActive}</TableCell>
                      <TableCell>{org.rpValue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <div>Showing 1-3 of 3 organizations</div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hover:bg-primary hover:text-white transition-colors"
                    disabled
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hover:bg-primary hover:text-white transition-colors"
                    disabled
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}