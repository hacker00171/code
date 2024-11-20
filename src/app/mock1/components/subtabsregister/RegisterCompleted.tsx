'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from 'lucide-react'
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  registeredDate: string;
}

export function RegisterCompleted() {
  const [registeredUsers] = useState<User[]>([  
    { id: 1, name: "John Doe", email: "john.doe@example.com", registeredDate: "2024-03-15" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", registeredDate: "2024-03-14" },
    { id: 3, name: "Robert Johnson", email: "robert.j@example.com", registeredDate: "2024-03-14" },
    { id: 4, name: "Emily Davis", email: "emily.d@example.com", registeredDate: "2024-03-13" },
    { id: 5, name: "Michael Wilson", email: "michael.w@example.com", registeredDate: "2024-03-13" },
    { id: 6, name: "Sarah Brown", email: "sarah.b@example.com", registeredDate: "2024-03-12" },
    { id: 7, name: "David Miller", email: "david.m@example.com", registeredDate: "2024-03-12" },
    { id: 8, name: "Lisa Anderson", email: "lisa.a@example.com", registeredDate: "2024-03-11" },
    { id: 9, name: "James Taylor", email: "james.t@example.com", registeredDate: "2024-03-11" },
    { id: 10, name: "Emma White", email: "emma.w@example.com", registeredDate: "2024-03-10" },
  ]);

  return (
    <Card className="border-t-4 border-t-green-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          Register Completed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 text-green-700 rounded-md">
            <p>List of successfully registered users:</p>
          </div>
          
          <div className="space-y-2">
            {registeredUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md">
                <Label className="flex-1">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-sm text-gray-500">{user.email}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      Registered: {new Date(user.registeredDate).toLocaleDateString()}
                    </span>
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 