'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudUpload, Users, Database, Upload } from 'lucide-react'

export default function UserRegistration() {
  const [registrationMethod, setRegistrationMethod] = useState('csv')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [employeeNumber, setEmployeeNumber] = useState('')

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
    console.log('File uploaded:', event.target.files?.[0]?.name)
  }

  const handleManualEntry = async () => {
    try {
      const response = await fetch('/api/register-manual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeNumber,
          firstName,
          lastName,
        //   login,
        //   password,
        }),
      });
      
      if (!response.ok) throw new Error('Manual registration failed');
      
      console.log('Manual registration successful');
    } catch (error: unknown) {
      console.error('Error during manual registration:', error);
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    switch (registrationMethod) {
      case 'csv':
        // Get the file input element and its files
        const fileInput = document.getElementById('csv-file') as HTMLInputElement;
        if (fileInput.files?.[0]) {
          console.log('File uploaded:', fileInput.files[0].name);
        }
        break;
      case 'manual':
        await handleManualEntry();
        break;
      case 'azure':
        console.log('Submitting:', { registrationMethod, login, password });
        break;
      case 'ad':
        console.log('Submitting:', { registrationMethod, login, password });
        break;
      default:
        console.log('Submitting:', { registrationMethod, login, password });
        break;
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>User Registration Process</CardTitle>
        <CardDescription>Choose a method to add users to the system</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <RadioGroup
            defaultValue="csv"
            onValueChange={(value) => setRegistrationMethod(value)}
            className="space-y-4 mb-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="csv" id="csv" />
              <Label htmlFor="csv">Manual CSV Upload</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="azure" id="azure" />
              <Label htmlFor="azure">Azure AD Connection</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ad" id="ad" />
              <Label htmlFor="ad">Active Directory Connection</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="manual" id="manual" />
              <Label htmlFor="manual">Manual Entry</Label>
            </div>
          </RadioGroup>

          {registrationMethod === 'csv' ? (
            <div className="space-y-4">
              <Label htmlFor="csv-file">Upload CSV File</Label>
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
              />
              <p className="text-sm text-muted-foreground">
                CSV should include: Employee number, First name, Last name
              </p>
            </div>
          ) : registrationMethod === 'manual' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employeeNumber">Employee Number</Label>
                <Input
                  id="employeeNumber"
                  type="text"
                  value={employeeNumber}
                  onChange={(e) => setEmployeeNumber(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
             
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login">Login</Label>
                <Input
                  id="login"
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <Button type="submit" className="w-full mt-6">
            {registrationMethod === 'csv' ? (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload CSV
              </>
            ) : registrationMethod === 'azure' ? (
              <>
                <Database className="mr-2 h-4 w-4" />
                Connect to Azure AD
              </>
            ) : registrationMethod === 'ad' ? (
              <>
                <Users className="mr-2 h-4 w-4" />
                Connect to Active Directory
              </>
            ) : (
              <>
                <CloudUpload className="mr-2 h-4 w-4" />
                Register Without User Details
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}