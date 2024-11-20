'use client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { KeyRound, Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import UserRegistration from './UserRegistration'

// Add interface for user type
interface User {
  id: number;
  name: string;
  email: string;
}

export function RegisterPending() {
  const [unregisteredUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Robert Johnson", email: "robert.j@example.com" },
    { id: 4, name: "Emily Davis", email: "emily.d@example.com" },
    { id: 5, name: "Michael Wilson", email: "michael.w@example.com" },
    { id: 6, name: "Sarah Brown", email: "sarah.b@example.com" },
    { id: 7, name: "David Miller", email: "david.m@example.com" },
    { id: 8, name: "Lisa Anderson", email: "lisa.a@example.com" },
    { id: 9, name: "James Taylor", email: "james.t@example.com" },
    { id: 10, name: "Emma White", email: "emma.w@example.com" },
  ]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleConfirm = () => {
    // Add your confirmation logic here
    console.log('Confirmed user:', selectedUser);
  };

  return (
    <Card className="border-t-4 border-t-blue-500">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="w-5 h-5" />
            Register Pending
          </CardTitle>
          <CardDescription>Choose a method to add users to the system</CardDescription>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Users
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogTitle>User Registration</DialogTitle>
            <UserRegistration />
          </DialogContent>
        </Dialog>
      </CardHeader>


      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md">
            <p>Please select a user to approve registration:</p>
          </div>
          
          <RadioGroup
            value={selectedUser}
            onValueChange={setSelectedUser}
            className="space-y-2"
          >
            {unregisteredUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50">
                <RadioGroupItem
                  value={user.id.toString()}
                  id={`user-${user.id}`}
                />
                <Label htmlFor={`user-${user.id}`} className="flex-1">
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-sm text-gray-500">{user.email}</span>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex justify-between items-center pt-4 border-t">
          <span className="text-sm text-gray-600">
            {selectedUser ? "1" : "0"} of {unregisteredUsers.length} selected
          </span>
          <button
            onClick={handleConfirm}
            disabled={!selectedUser}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Registration
          </button>
        </div>
      </CardContent>
    </Card>
  );
}