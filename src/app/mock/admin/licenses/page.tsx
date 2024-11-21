'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sidebar } from "@/components/admin/Sidebar"

export default function LicenseManagement() {
  const [activeTab] = useState("licenses")

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="border-b bg-white shadow-sm">
          <div className="flex h-16 items-center px-8">
            <h1 className="text-2xl font-semibold text-slate-800">License & Key Management</h1>
          </div>
        </div>

        <div className="p-6">
          {/* Existing license management content */}
          <div className="max-w-2xl mx-auto space-y-8">
            <Card className="shadow-md">
              <CardContent className="space-y-6 pt-6">
                {/* License Generation Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Generate New License</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-4">Organization Details</h4>
                      <div className="space-y-2">
                        <Label htmlFor="orgName">Organization Name</Label>
                        <Input id="orgName" placeholder="Enter organization name" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="userLimit">User Limit</Label>
                      <Select>
                        <SelectTrigger id="userLimit">
                          <SelectValue placeholder="Enter user limit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 users</SelectItem>
                          <SelectItem value="50">50 users</SelectItem>
                          <SelectItem value="100">100 users</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rpValue">RP Value</Label>
                      <Input id="rpValue" placeholder="Enter RP value" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="licensePassword">License Password</Label>
                      <Input id="licensePassword" type="password" placeholder="Enter license password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adminEmail">Admin Email</Label>
                      <Input id="adminEmail" type="email" placeholder="Enter admin email" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="validity">Validity (Days)</Label>
                      <Select defaultValue="365">
                        <SelectTrigger id="validity">
                          <SelectValue placeholder="Select validity period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="180">180 days</SelectItem>
                          <SelectItem value="365">365 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create License</Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  {/* Key Management Section */}
                  <h3 className="text-lg font-semibold mb-4">Key Management</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium">PIV Certificate Authority</h4>
                      <p className="text-sm text-muted-foreground">
                        Generate and manage keys for PIV card authentication and signing.
                      </p>
                      <div className="space-y-2">
                        <Label htmlFor="pivKeyStatus">Current Status</Label>
                        <div className="flex items-center space-x-2">
                          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
                          <span className="text-sm">Key not generated</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Generate PIV CA Key
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-medium">FIDO2 Certificate Authority</h4>
                      <p className="text-sm text-muted-foreground">
                        Generate and manage keys for FIDO2 authenticator attestation.
                      </p>
                      <div className="space-y-2">
                        <Label htmlFor="fido2KeyStatus">Current Status</Label>
                        <div className="flex items-center space-x-2">
                          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
                          <span className="text-sm">Key not generated</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Generate FIDO2 CA Key
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex justify-end gap-4">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create License</Button>
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