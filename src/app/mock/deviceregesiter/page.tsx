'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle, Loader2, Search, ArrowLeft } from "lucide-react"
import Link from 'next/link'

export default function DeviceRegistration() {
  const [deviceStatus] = useState("Connected")
  const [userId, setUserId] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const [relyingParty, setRelyingParty] = useState("ByteNova")

  const checkUserIdAvailability = async (value: string) => {
    setIsChecking(true)
    setIsAvailable(null)

    // Clear previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    // Set new timeout for debouncing
    const newTimeoutId = setTimeout(async () => {
      try {
        // Simulate API call
        // In a real implementation, replace this with an actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        const mockCheck = !["admin", "root", "test"].includes(value.toLowerCase())
        setIsAvailable(mockCheck)
      } catch (error) {
        console.error("Error checking User ID availability:", error)
        setIsAvailable(null)
      } finally {
        setIsChecking(false)
      }
    }, 300)

    setTimeoutId(newTimeoutId)
  }

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUserId(value)

    if (value.length > 2) {
      checkUserIdAvailability(value)
    } else {
      setIsAvailable(null)
      setIsChecking(false)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }

  const handleSearch = () => {
    if (userId.length > 2) {
      checkUserIdAvailability(userId)
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-[1200px] mx-auto">
        <Link href="/mock/clientadmin" className="flex items-center text-sm mb-6 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Device Registration</h2>

          <div className="space-y-6">
            {/* Device Status - Made to look more like a table row */}
            <div className="flex items-center gap-2 p-2 border-b">
              <Label className="min-w-[120px]">Device Status:</Label>
              <span className="inline-flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${deviceStatus === "Connected" ? "bg-green-500" : "bg-red-500"}`} />
                {deviceStatus}
              </span>
            </div>

            {/* Form fields styled as rows */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="relyingParty">Relying Party Value</Label>
                  <Input 
                    id="relyingParty" 
                    value={relyingParty}
                    onChange={(e) => setRelyingParty(e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pacNumber">PAC Number</Label>
                  <Input 
                    id="pacNumber" 
                    placeholder="Enter PAC number" 
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pin">PIN</Label>
                  <Input 
                    id="pin" 
                    type="password" 
                    placeholder="Enter PIN" 
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userId">User ID</Label>
                  <div className="flex space-x-2">
                    <div className="relative flex-grow">
                      <Input
                        id="userId"
                        placeholder="Search User ID"
                        value={userId}
                        onChange={handleUserIdChange}
                        className={`h-10 pr-10 ${
                          isAvailable === true
                            ? "border-green-500 focus-visible:ring-green-500"
                            : isAvailable === false
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {isChecking ? (
                          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                        ) : isAvailable === true ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : isAvailable === false ? (
                          <XCircle className="w-4 h-4 text-red-500" />
                        ) : null}
                      </div>
                    </div>
                    <Button onClick={handleSearch} disabled={userId.length <= 2 || isChecking} className="h-10">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                  {userId.length > 0 && (
                    <p className={`text-sm ${isAvailable ? "text-green-500" : "text-red-500"}`}>
                      {isChecking
                        ? "Checking availability..."
                        : isAvailable === true
                        ? "User ID is available"
                        : isAvailable === false
                        ? "User ID is already taken"
                        : userId.length <= 2
                        ? "User ID must be longer than 2 characters"
                        : ""}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Button className="w-full h-10">
              Register Device
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}