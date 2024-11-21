"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Search, UserPlus, Edit, Trash2 } from "lucide-react"
import Link from 'next/link'
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Users, Database, Upload } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Shield } from 'lucide-react'

export default function ManageUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Bytenova admin" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Client admin" },
  ])

  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" })
  const [registrationMethod, setRegistrationMethod] = useState('manual')
  const [isAdmin, setIsAdmin] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    setUsers([...users, { ...newUser, id: users.length + 1 }])
    setNewUser({ name: "", email: "", role: "" })
  }

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault()
  //   console.log('Submitting:', { registrationMethod, login, password, isAdmin })
  // }

  return (
    <div className="container mx-auto p-6">
      <Link href="/mock/clientadmin" className="flex items-center text-sm mb-6 text-gray-600 hover:text-gray-900">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>Manage Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Input placeholder="Search users..." className="mr-2" />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddUser} className="space-y-4">
                  <RadioGroup
                    defaultValue="manual"
                    onValueChange={(value) => setRegistrationMethod(value)}
                    className="space-y-4 mb-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="manual" id="manual" />
                      <Label htmlFor="manual">Manual Entry</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="csv" id="csv" />
                      <Label htmlFor="csv">CSV Upload</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="azure" id="azure" />
                      <Label htmlFor="azure">Azure AD Connection</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ad" id="ad" />
                      <Label htmlFor="ad">Active Directory Connection</Label>
                    </div>
                  </RadioGroup>

                  {registrationMethod === 'manual' ? (
                    <>
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          value={newUser.role}
                          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                          required
                        />
                      </div>
                    </>
                  ) : registrationMethod === 'csv' ? (
                    <div className="space-y-4">
                      <Label htmlFor="csv-file">Upload CSV File</Label>
                      <Input
                        id="csv-file"
                        type="file"
                        accept=".csv"
                        onChange={(e) => console.log('File uploaded:', e.target.files?.[0]?.name)}
                      />
                      <p className="text-sm text-muted-foreground">
                        CSV should include: Name, Email, Role
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login">Login</Label>
                        <Input
                          id="login"
                          type="text"
                          required
                          value={login}
                          onChange={(e) => setLogin(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center justify-between space-x-2 pt-4">
                        <div className="flex flex-col space-y-1">
                          <Label htmlFor="admin-toggle" className="font-medium flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Admin Privileges
                          </Label>
                          <span className="text-sm text-muted-foreground">
                            Grant administrative access to this user
                          </span>
                        </div>
                        <Switch
                          id="admin-toggle"
                          checked={isAdmin}
                          onCheckedChange={setIsAdmin}
                        />
                      </div>
                    </div>
                  )}

                  <Button type="submit" className="w-full">
                    {registrationMethod === 'manual' ? (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add User
                      </>
                    ) : registrationMethod === 'csv' ? (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload CSV
                      </>
                    ) : registrationMethod === 'azure' ? (
                      <>
                        <Database className="mr-2 h-4 w-4" />
                        Connect to Azure AD
                      </>
                    ) : (
                      <>
                        <Users className="mr-2 h-4 w-4" />
                        Connect to Active Directory
                      </>
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50 hover:bg-gray-50">
                <TableHead className="text-black-600 font-medium">Name</TableHead>
                <TableHead className="text-black-600 font-medium">Email</TableHead>
                <TableHead className="text-black-600 font-medium">Role</TableHead>
                <TableHead className="text-black-600 font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" className="text-blue-600 hover:text-blue-700 hover:border-blue-700">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="text-red-600 hover:text-red-700 hover:border-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}