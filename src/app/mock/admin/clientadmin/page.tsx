"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, ArrowLeft } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import Link from 'next/link'
import { Switch } from "@/components/ui/switch"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Sidebar } from "@/components/admin/Sidebar"

const inputStyles = "w-full px-3 py-1.5 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-100"
const sectionTitleStyles = "text-sm font-medium text-gray-900 mb-3"
const labelStyles = "block text-sm font-medium text-gray-700 mb-1"

const formSchema = z.object({
  organization: z.string().min(1, "Organization is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").optional(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  sendCredentials: z.boolean()
})

type FormData = z.infer<typeof formSchema>

export default function UserManagement() {
  const [activeTab] = useState("clientadmin")
  const [administrators, setAdministrators] = useState([
    { 
      name: "John Smith",
      email: "john.smith@infosys.com",
      organization: "Infosys Ltd",
      status: "Active",
      role: "Super Admin",
      lastLogin: "15/2/2024, 9:30:00 AM"
    },
    { 
      name: "Sarah Johnson",
      email: "sarah.j@techcorp.com",
      organization: "TechCorp Solutions",
      status: "Inactive",
      role: "Admin",
      lastLogin: "10/2/2024, 2:20:00 PM"
    },
    { 
      name: "Mike Wilson",
      email: "mike.w@globalsys.com",
      organization: "Global Systems Inc",
      status: "Locked",
      role: "Super Admin",
      lastLogin: "20/1/2024, 11:45:00 AM"
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      username: "",
      sendCredentials: false,
    }
  })

  const onSubmit = (data: FormData) => {
    try {
      const newAdmin = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        organization: data.organization,
        status: "Active",
        role: "Admin",
        lastLogin: "Never",
      }
      setAdministrators([...administrators, newAdmin])
      setIsDialogOpen(false)
      form.reset()
    } catch (error) {
      console.error('Error creating admin:', error)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="border-b bg-white shadow-sm">
          <div className="flex h-16 items-center px-8">
            <h1 className="text-2xl font-semibold text-slate-800">Client Administrators</h1>
          </div>
        </div>

        <div className="p-6">
          <Link href="/mock/admin" className="flex items-center text-sm mb-6 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Input 
                placeholder="Search admins..." 
                className="w-[200px]"
              />
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Organizations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Organizations</SelectItem>
                  <SelectItem value="infosys">Infosys Ltd</SelectItem>
                  <SelectItem value="techcorp">TechCorp Solutions</SelectItem>
                  <SelectItem value="globalsys">Global Systems Inc</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Admin
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader className=" top-0 bg-white z-10 pb-4">
                  <DialogTitle>Create Client Admin</DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    Create a new administrator account for an organization
                  </p>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="organization"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Organization</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select organization" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Infosys Ltd">Infosys Ltd</SelectItem>
                              <SelectItem value="TechCorp Solutions">TechCorp Solutions</SelectItem>
                              <SelectItem value="Global Systems Inc">Global Systems Inc</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <h3 className="font-medium">Personal Information</h3>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter first name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter last name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className={sectionTitleStyles}>Contact Information</h3>
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={labelStyles}>Email Address</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  type="email" 
                                  placeholder="Enter email address" 
                                  className={inputStyles}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={labelStyles}>Phone Number</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="Enter phone number" 
                                  className={inputStyles}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className={sectionTitleStyles}>Account Settings</h3>
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={labelStyles}>Username</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="Enter username" 
                                  className={inputStyles}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="sendCredentials"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between py-2">
                              <div>
                                <FormLabel className="text-sm font-medium text-gray-900">Send Login Credentials</FormLabel>
                                <p className="text-sm text-gray-500">Send login details to admins email</p>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="bottom-0 bg-white pt-4 flex justify-end space-x-2 border-t">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setIsDialogOpen(false)
                          form.reset()
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Create Admin</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Client Administrators</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Admin</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Login</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {administrators.map((admin, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{admin.name}</div>
                          <div className="text-sm text-gray-500">{admin.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{admin.organization}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          admin.status === 'Active' ? 'bg-gray-900 text-white' :
                          admin.status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {admin.status}
                        </span>
                      </TableCell>
                      <TableCell>{admin.role}</TableCell>
                      <TableCell>{admin.lastLogin}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <div>Showing 1-{administrators.length} of {administrators.length} administrators</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}