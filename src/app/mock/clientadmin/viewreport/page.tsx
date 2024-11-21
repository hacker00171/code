"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download } from "lucide-react"
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case 'success':
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'failed':
      case 'offline':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

export default function ViewReports() {
  const [reportType, setReportType] = useState<string>("")
  const [timeRange, setTimeRange] = useState<string>("")
  const [showReport, setShowReport] = useState(false)
  // const [showData, setShowData] = useState(false)

  const mockData = {
    "user-activity": [
      { id: 1, user: "John Doe", action: "Login", timestamp: "2024-03-20 09:30:00", status: "Success" },
      { id: 2, user: "Jane Smith", action: "File Download", timestamp: "2024-03-20 10:15:00", status: "Success" },
      { id: 3, user: "Mike Johnson", action: "Settings Change", timestamp: "2024-03-20 11:45:00", status: "Success" },
      { id: 4, user: "Sarah Wilson", action: "Password Reset", timestamp: "2024-03-20 13:20:00", status: "Success" },
      { id: 5, user: "Tom Brown", action: "Profile Update", timestamp: "2024-03-20 14:45:00", status: "Success" },
      { id: 6, user: "Emily Davis", action: "Login", timestamp: "2024-03-20 15:30:00", status: "Failed" },
      { id: 7, user: "Alex Turner", action: "Document Creation", timestamp: "2024-03-20 16:15:00", status: "Success" }
    ],
    "device-status": [
      { id: 1, device: "Server-001", status: "Online", uptime: "99.9%", lastCheck: "2024-03-20 12:00:00" },
      { id: 2, device: "Router-Main", status: "Online", uptime: "98.5%", lastCheck: "2024-03-20 12:00:00" },
      { id: 3, device: "Switch-Floor1", status: "Offline", uptime: "95.0%", lastCheck: "2024-03-20 12:00:00" },
      { id: 4, device: "Server-002", status: "Online", uptime: "99.7%", lastCheck: "2024-03-20 12:00:00" },
      { id: 5, device: "Firewall-Primary", status: "Online", uptime: "99.99%", lastCheck: "2024-03-20 12:00:00" },
      { id: 6, device: "NAS-Storage", status: "Online", uptime: "97.8%", lastCheck: "2024-03-20 12:00:00" },
      { id: 7, device: "Switch-Floor2", status: "Online", uptime: "98.9%", lastCheck: "2024-03-20 12:00:00" }
    ],
    "authentication-logs": [
      { id: 1, user: "admin@example.com", ipAddress: "192.168.1.100", timestamp: "2024-03-20 08:00:00", result: "Success" },
      { id: 2, user: "user@example.com", ipAddress: "192.168.1.101", timestamp: "2024-03-20 08:30:00", result: "Failed" },
      { id: 3, user: "guest@example.com", ipAddress: "192.168.1.102", timestamp: "2024-03-20 09:00:00", result: "Success" },
      { id: 4, user: "developer@example.com", ipAddress: "192.168.1.103", timestamp: "2024-03-20 09:30:00", result: "Success" },
      { id: 5, user: "analyst@example.com", ipAddress: "192.168.1.104", timestamp: "2024-03-20 10:00:00", result: "Success" },
      { id: 6, user: "tester@example.com", ipAddress: "192.168.1.105", timestamp: "2024-03-20 10:30:00", result: "Failed" },
      { id: 7, user: "manager@example.com", ipAddress: "192.168.1.106", timestamp: "2024-03-20 11:00:00", result: "Success" }
    ]
  }

  const renderTable = () => {
    if (!reportType || !showReport) return null

    const data = mockData[reportType as keyof typeof mockData]
    
    console.log('Selected Report:', reportType)
    console.log('Data:', data)

    if (!data || data.length === 0) return <p>No data available</p>

    return (
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-50 hover:bg-gray-50">
            {Object.keys(data[0]).map((header) => (
              <TableHead key={header} className="capitalize text-gray-600 font-medium">
                {header.replace(/([A-Z])/g, ' $1').trim()}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {Object.entries(row).map(([key, value], index) => (
                <TableCell key={index}>
                  {key === 'status' || key === 'result' ? (
                    <StatusBadge status={value as string} />
                  ) : (
                    value
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  const handleGenerateReport = () => {
    if (reportType && timeRange) {
      console.log('Generating report for:', reportType, timeRange)
      setShowReport(true)
    } else {
      console.log('Please select both report type and time range')
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Link href="/mock/clientadmin" className="flex items-center text-sm mb-6 text-gray-600 hover:text-gray-900">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>View Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Select onValueChange={(value) => setReportType(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user-activity">User Activity</SelectItem>
                  <SelectItem value="device-status">Device Status</SelectItem>
                  <SelectItem value="authentication-logs">Authentication Logs</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setTimeRange(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleGenerateReport}>Generate Report</Button>
            </div>
            <Card>
              <CardContent className="p-4 overflow-x-auto">
                {!showReport ? (
                  <p className="text-muted-foreground">Select a report type and time range to generate a report.</p>
                ) : reportType ? (
                  renderTable()
                ) : (
                  <p className="text-muted-foreground">Please select a report type.</p>
                )}
              </CardContent>
            </Card>
            <div className="flex justify-end">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}