'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Building, Users, Key, Plus, Search } from 'lucide-react'
import { useState } from 'react'

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    relyingParty: '',
    pacNumber: '',
    pin: ''
  });

  const [selectedOrg, setSelectedOrg] = useState<number | null>(null);

  const data = [
    {
      id: 1,
      relyingParty: 'byteNova',
      pacNumber: '1234567890',
      pin: '1234'
    },
    {
      id: 2,
      relyingParty: 'byteNova',
      pacNumber: '1234567890',
    }
  ]


  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    if (id === 'pin' && selectedOrg) {
      const org = data.find(org => org.id === selectedOrg);
      if (org && !org.pin) {
        setShowForm(value.length === 4);
      }
    }
  };

  const handleOrgSelect = (orgId: number) => {
    setSelectedOrg(orgId);
    const org = data.find(org => org.id === orgId);
    if (org) {
      setFormData({
        relyingParty: org.relyingParty,
        pacNumber: org.pacNumber,
        pin: org.pin || ''
      });
      setShowForm(!!org.pin);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen max-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 p-4 shadow-md overflow-y-auto">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-blue-500 rounded-full mr-2"></div>
          <h1 className="text-xl font-bold">ByteNova</h1>
        </div>
        <nav>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Building className="mr-2 h-4 w-4" /> Organizations
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Users className="mr-2 h-4 w-4" /> Users
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Key className="mr-2 h-4 w-4" /> Licenses
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <BarChart className="mr-2 h-4 w-4" /> Reports
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Input placeholder="Search..." className="w-64" />
            <Button variant="outline"><Search className="h-4 w-4" /></Button>
          </div>
        </div>

        <Tabs defaultValue="organizations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="licenses">Licenses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="organizations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Organization Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="orgSelect">Select Organization</Label>
                    <select
                      id="orgSelect"
                      onChange={(e) => handleOrgSelect(Number(e.target.value))}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select an organization</option>
                      {data.map(org => (
                        <option key={org.id} value={org.id}>
                          {org.relyingParty} - {org.pacNumber}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedOrg && !data.find(org => org.id === selectedOrg)?.pin && (
                    <div>
                      <Label htmlFor="pin">PIN</Label>
                      <Input 
                        id="pin" 
                        type="password" 
                        placeholder="Enter 4-digit PIN" 
                        maxLength={4}
                        value={formData.pin}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}

                  {showForm && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="relyingParty">Relying Party Value</Label>
                          <Input 
                            id="relyingParty" 
                            placeholder="Enter relying party value" 
                            value={formData.relyingParty}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="pacNumber">PAC Number</Label>
                          <Input 
                            id="pacNumber" 
                            placeholder="Enter PAC number" 
                            value={formData.pacNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <Button><Plus className="mr-2 h-4 w-4" /> Create Organization</Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monitoring" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>User Enrollment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Device Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">567</div>
                <p className="text-xs text-muted-foreground">+5.3% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Failed Attempts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">-2.5% from yesterday</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="licenses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>License Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Total Licenses Issued:</span>
                    <span className="font-bold">5,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Licenses:</span>
                    <span className="font-bold">4,235</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Licenses Expiring Soon:</span>
                    <span className="font-bold text-yellow-500">152</span>
                  </div>
                </div>
                <Button className="mt-4">Manage Licenses</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Right Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 p-4 shadow-md overflow-y-auto">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" /> New Organization
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Key className="mr-2 h-4 w-4" /> Generate License
          </Button>
        </div>
        <h3 className="font-semibold mt-6 mb-4">System Health</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>Database: Healthy</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>API: Operational</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            <span>Certificate System: Warning</span>
          </div>
        </div>
      </aside>
    </div>
  )
}