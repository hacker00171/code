import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Laptop, Key, Fingerprint, RefreshCw } from 'lucide-react'

export default function DeviceDashboard() {
  const devices = [
    { id: 1, name: "Laptop-001", type: "PIV", status: "Connected", lastSeen: "2 mins ago" },
    { id: 2, name: "Mobile-002", type: "FIDO2", status: "Disconnected", lastSeen: "1 hour ago" },
    { id: 3, name: "Desktop-003", type: "PIV", status: "Connected", lastSeen: "5 mins ago" },
  ]

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Device Operations Dashboard</h1>
      
      <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
            <Laptop className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,128</div>
            <p className="text-xs text-muted-foreground">+10% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PIV Devices</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">815</div>
            <p className="text-xs text-muted-foreground">72% of total devices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FIDO2 Devices</CardTitle>
            <Fingerprint className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">313</div>
            <p className="text-xs text-muted-foreground">28% of total devices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">956</div>
            <p className="text-xs text-muted-foreground">85% connection rate</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="devices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="piv">PIV Operations</TabsTrigger>
          <TabsTrigger value="fido2">FIDO2 Operations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="devices">
          <Card>
            <CardHeader>
              <CardTitle>Device List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Seen</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell>{device.name}</TableCell>
                      <TableCell>{device.type}</TableCell>
                      <TableCell>
                        <Badge variant={device.status === "Connected" ? "default" : "destructive"}>
                          {device.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{device.lastSeen}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Manage</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="piv">
          <Card>
            <CardHeader>
              <CardTitle>PIV Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button>Reset Default PIN</Button>
                <Button>Manage Administrative Key</Button>
                <Button>Factory Reset</Button>
                <Button>Certificate Operations</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="fido2">
          <Card>
            <CardHeader>
              <CardTitle>FIDO2 Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button>Validate PIN Requirement</Button>
                <Button>Verify RP Value</Button>
                <Button>Manage PAC Number</Button>
                <Button>Credential Management</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}