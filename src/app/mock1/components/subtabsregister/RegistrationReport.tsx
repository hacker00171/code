'use client'
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from 'lucide-react'

interface User {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  registeredDate: string;
  cardNumber: string;
}

export function RegisterReports() {
  const [users] = useState<User[]>([
    { id: 1, employeeId: "EMP001", name: "John Doe", email: "john.doe@example.com", registeredDate: "2024-03-15", cardNumber: "4532-7843-9284-1234" },
    { id: 2, employeeId: "EMP002", name: "Jane Smith", email: "jane.smith@example.com", registeredDate: "2024-03-14", cardNumber: "4532-8932-7621-5678" },
    { id: 3, employeeId: "EMP003", name: "Robert Johnson", email: "robert.j@example.com", registeredDate: "2024-03-14", cardNumber: "4532-1234-5678-9012" },
    { id: 4, employeeId: "EMP004", name: "Emily Davis", email: "emily.d@example.com", registeredDate: "2024-03-13", cardNumber: "4532-9012-3456-3456" },
    { id: 5, employeeId: "EMP005", name: "Michael Wilson", email: "michael.w@example.com", registeredDate: "2024-03-13", cardNumber: "4532-5678-9012-7890" },
    { id: 6, employeeId: "EMP006", name: "Sarah Brown", email: "sarah.b@example.com", registeredDate: "2024-03-12", cardNumber: "4532-3456-7890-2345" },
    { id: 7, employeeId: "EMP007", name: "David Miller", email: "david.m@example.com", registeredDate: "2024-03-12", cardNumber: "4532-7890-1234-6789" },
    { id: 8, employeeId: "EMP008", name: "Lisa Anderson", email: "lisa.a@example.com", registeredDate: "2024-03-11", cardNumber: "4532-2345-6789-0123" },
    { id: 9, employeeId: "EMP009", name: "James Taylor", email: "james.t@example.com", registeredDate: "2024-03-11", cardNumber: "4532-6789-0123-4567" },
    { id: 10, employeeId: "EMP010", name: "Emma White", email: "emma.w@example.com", registeredDate: "2024-03-10", cardNumber: "4532-0123-4567-8901" },
  ]);

  // Calculate statistics
  const totalUsers = users.length;
  const registrationsByDate = users.reduce((acc, user) => {
    const date = user.registeredDate;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostActiveDate = Object.entries(registrationsByDate)
    .sort(([, a], [, b]) => b - a)[0];

  return (
    <Card className="border-t-4 border-t-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Registration Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-600">Total Registrations</p>
              <p className="text-2xl font-bold text-blue-700">{totalUsers}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-600">Most Active Day</p>
              <p className="text-2xl font-bold text-blue-700">
                {mostActiveDate ? `${mostActiveDate[1]} users` : 'N/A'}
              </p>
              <p className="text-xs text-blue-500">
                {mostActiveDate ? new Date(mostActiveDate[0]).toLocaleDateString() : ''}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Daily Registration Breakdown</h3>
            {Object.entries(registrationsByDate)
              .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
              .map(([date, count]) => (
                <div key={date} className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded-md">
                    <span className="text-sm text-blue-600">
                      {new Date(date).toLocaleDateString()}
                    </span>
                    <span className="text-sm font-medium text-blue-700">{count} users</span>
                  </div>
                  
                  <div className="pl-4 space-y-1">
                    {users
                      .filter(user => user.registeredDate === date)
                      .map(user => (
                        <div key={user.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{user.name}</span>
                            <span className="text-xs text-gray-500">{user.email}</span>
                            <span className="text-xs text-gray-400">ID: {user.employeeId} | Card No: {user.cardNumber}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 