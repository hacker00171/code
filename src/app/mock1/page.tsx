'use client'
import React, { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, UserMinus, UserPlus, FileText } from 'lucide-react'
import { Header } from '@/app/mock1/components/Header'
import { Onboarding } from '@/app/mock1/components/Onboarding'
import { Offboarding } from '@/app/mock1/components/Offboarding'
import { Benefits } from '@/app/mock1/components/Benefits'
import { CredentialReport } from '@/app/mock1/components/Report'
import { CredentialList } from '@/app/mock1/components/CredentialList'
import Licenses from '@/app/mock1/components/Licenses'


export default function YubikeyLifecycle() {
  const [accessType, setAccessType] = useState('access')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        selectedAccess={accessType}
        onAccessChange={setAccessType}
      />
      
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-end space-x-2">
            <span className="text-sm font-medium text-gray-700">Access Type:</span>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="form-select rounded-md border-gray-300 shadow-sm 
                  focus:border-blue-500 focus:ring-blue-500 
                  text-sm w-full"
              >
                {accessType}
              </button>
              
              {isOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-50">
                  <div className="py-1">
                    {['access', 'cafeteria', 'printer'].map((type) => (
                      <label
                        key={type}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="accessType"
                          value={type}
                          checked={accessType === type}
                          onChange={(e) => {
                            setAccessType(e.target.value)
                            setIsOpen(false)
                          }}
                          className="mr-2"
                        />
                        <span className="capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="onboarding" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 max-w-3xl mx-auto">
            <TabsTrigger value="onboarding" className="gap-2">
              <UserPlus className="w-4 h-4" />
              Enrollment
            </TabsTrigger>

            <TabsTrigger value="credentials" className="gap-2">
              <UserPlus className="w-4 h-4" />
              List of credentials
            </TabsTrigger>

            <TabsTrigger value="offboarding" className="gap-2">
              <UserMinus className="w-4 h-4" />
              Offboarding
            </TabsTrigger>

            <TabsTrigger value="report" className="gap-2">
              <FileText className="w-4 h-4" />
              Reports
            </TabsTrigger>

            <TabsTrigger value="licenses" className="gap-2">
              <UserPlus className="w-4 h-4" />
              Licenses
            </TabsTrigger>  

            <TabsTrigger value="benefits" className="gap-2">
              <Shield className="w-4 h-4" />
              Benefits
            </TabsTrigger>
          </TabsList>

          {accessType === "access" ? (
            <>
              <TabsContent value="onboarding">
                <Onboarding  />
              </TabsContent>

              <TabsContent value="offboarding">
                <Offboarding  />
              </TabsContent>

              <TabsContent value="credentials">
                <CredentialList />
              </TabsContent>

              <TabsContent value="benefits">
                <Benefits />
              </TabsContent>

              <TabsContent value="report">
                <CredentialReport />
              </TabsContent>

              <TabsContent value="licenses"> 
                <Licenses />
              </TabsContent>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Details not available
            </div>
          )}
        </Tabs>
      </div>
    </div>
  )
}