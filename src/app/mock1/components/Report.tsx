'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"

type CredentialRecord = {
  id: string
  employeeName: string
  company: string
  department: string
  yubiKeySerial: string
  dateIssued: string
  lastUsed: string
  status: 'Active' | 'Inactive' | 'Lost'
}

const mockData: CredentialRecord[] = [
  {
    id: '1',
    employeeName: 'John Doe',
    company: 'Tech Solutions Inc',
    department: 'Engineering',
    yubiKeySerial: 'YK-123456',
    dateIssued: '2024-01-15',
    lastUsed: '2024-03-20',
    status: 'Active',
  },
  {
    id: '2',
    employeeName: 'Jane Smith',
    company: 'Digital Dynamics',
    department: 'HR',
    yubiKeySerial: 'YK-789012',
    dateIssued: '2024-02-01',
    lastUsed: '2024-03-19',
    status: 'Active',
  },
  {
    id: '3',
    employeeName: 'Mike Johnson',
    company: 'Tech Solutions Inc',
    department: 'Sales',
    yubiKeySerial: 'YK-345678',
    dateIssued: '2023-12-01',
    lastUsed: '2024-03-01',
    status: 'Inactive',
  },
  {
    id: '4',
    employeeName: 'Sarah Wilson',
    company: 'Cloud Systems Ltd',
    department: 'Marketing',
    yubiKeySerial: 'YK-456789',
    dateIssued: '2024-01-20',
    lastUsed: '2024-03-18',
    status: 'Active',
  },
  {
    id: '5',
    employeeName: 'Robert Chen',
    company: 'Digital Dynamics',
    department: 'Engineering',
    yubiKeySerial: 'YK-567890',
    dateIssued: '2023-11-15',
    lastUsed: '2024-03-15',
    status: 'Lost',
  },
  {
    id: '6',
    employeeName: 'Emily Davis',
    company: 'Tech Solutions Inc',
    department: 'Finance',
    yubiKeySerial: 'YK-678901',
    dateIssued: '2024-02-15',
    lastUsed: '2024-03-21',
    status: 'Active',
  },
  {
    id: '7',
    employeeName: 'Alex Thompson',
    company: 'Cloud Systems Ltd',
    department: 'IT Support',
    yubiKeySerial: 'YK-789012',
    dateIssued: '2023-10-01',
    lastUsed: '2024-02-28',
    status: 'Inactive',
  },
  {
    id: '8',
    employeeName: 'Maria Garcia',
    company: 'Digital Dynamics',
    department: 'Customer Service',
    yubiKeySerial: 'YK-890123',
    dateIssued: '2024-01-05',
    lastUsed: '2024-03-19',
    status: 'Active',
  },
  {
    id: '9',
    employeeName: 'David Kim',
    company: 'Tech Solutions Inc',
    department: 'Product',
    yubiKeySerial: 'YK-901234',
    dateIssued: '2023-12-20',
    lastUsed: '2024-03-17',
    status: 'Active',
  },
  {
    id: '10',
    employeeName: 'Lisa Wong',
    company: 'Cloud Systems Ltd',
    department: 'Engineering',
    yubiKeySerial: 'YK-012345',
    dateIssued: '2024-02-28',
    lastUsed: '2024-03-21',
    status: 'Active',
  }
]

export function CredentialReport() {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = mockData.filter(record => 
    record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.yubiKeySerial.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredData.map(record => record.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id)
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    )
  }

  const downloadCSV = () => {
    const headers = ['Employee Name', 'Company', 'Department', 'YubiKey Serial', 'Date Issued', 'Last Used', 'Status']
    const selectedData = filteredData.filter(record => selectedRows.includes(record.id))
    const csvData = selectedData.map(record => [
      record.employeeName,
      record.company,
      record.department,
      record.yubiKeySerial,
      record.dateIssued,
      record.lastUsed,
      record.status
    ])
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n')
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'yubikey-credential-report.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
              <h2>Credential Report</h2>
              <Button 
                onClick={downloadCSV} 
                variant="outline" 
                size="sm" 
                className="text-blue-500 hover:text-blue-600 border-blue-500 hover:border-blue-600"
                disabled={selectedRows.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Selected
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 relative">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by employee name, company, or YubiKey serial..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="font-bold text-black">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </TableHead>
                  <TableHead className="font-bold text-black">Employee Name</TableHead>
                  <TableHead className="font-bold text-black">Company</TableHead>
                  <TableHead className="font-bold text-black">Department</TableHead>
                  <TableHead className="font-bold text-black">YubiKey Serial</TableHead>
                  <TableHead className="font-bold text-black">Date Issued</TableHead>
                  <TableHead className="font-bold text-black">Last Used</TableHead>
                  <TableHead className="font-bold text-black">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(record.id)}
                        onChange={() => toggleSelect(record.id)}
                        className="rounded border-gray-300"
                      />
                    </TableCell>
                    <TableCell>{record.employeeName}</TableCell>
                    <TableCell>{record.company}</TableCell>
                    <TableCell>{record.department}</TableCell>
                    <TableCell>{record.yubiKeySerial}</TableCell>
                    <TableCell>{record.dateIssued}</TableCell>
                    <TableCell>{record.lastUsed}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          record.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : record.status === 'Inactive'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {record.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredData.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No matching records found
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 