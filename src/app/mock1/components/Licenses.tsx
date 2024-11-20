'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Users, Calendar, Building, Clock, PlusCircle,} from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Company {
  name: string;
  licenses: number;
  expiryDate: string;
}

// interface LicenseStep {
//   label: string;    
//   icon: LucideIcon;
// }

export default function LicensingSystem() {
  const [totalLicenses, setTotalLicenses] = useState(1000)
  const [usedLicenses, setUsedLicenses] = useState(0)
  const [duration, setDuration] = useState(1)
  const [timeRemaining, setTimeRemaining] = useState(365)
  const [isExpired, setIsExpired] = useState(false)
  const [addLicenseAmount, setAddLicenseAmount] = useState(10)
  const [extendLicenseAmount, setExtendLicenseAmount] = useState(100)
  const [companies, setCompanies] = useState<Company[]>([
    { name: "Acme Corp", licenses: 500, expiryDate: "2025-01-15" },
    { name: "TechSolutions Inc", licenses: 250, expiryDate: "2024-11-30" },
    { name: "Global Systems Ltd", licenses: 100, expiryDate: "2024-09-22" },
  ]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  const bufferLicenses = Math.floor(totalLicenses * 1.1)


  useEffect(() => {
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + duration);
    
    const timer = setInterval(() => {
      const now = new Date();
      const diffTime = endDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0 && usedLicenses < bufferLicenses) {
        setTimeRemaining(diffDays);
      } else {
        setIsExpired(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, usedLicenses, bufferLicenses]);

  const handleAddLicenses = () => {
    if (!selectedCompany) {
      alert("Please select a company first");
      return;
    }

    if (usedLicenses + addLicenseAmount <= bufferLicenses && !isExpired) {
      setCompanies(companies.map(company => {
        if (company.name === selectedCompany) {
          return { ...company, licenses: company.licenses + addLicenseAmount };
        }
        return company;
      }));
      setUsedLicenses(prev => prev + addLicenseAmount);
    }
  }

  const handleExtendLicenses = () => {
    setTotalLicenses(prev => prev + extendLicenseAmount)
  }

  const handleChangeDuration = (newDuration: string) => {
    const duration = parseInt(newDuration);
    setDuration(duration);
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + duration);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTimeRemaining(diffDays);
    setIsExpired(false);
  }

  const licenseUsagePercentage = (usedLicenses / totalLicenses) * 100

//   const handleStepClick = (index: number) => {
//     setCurrentStep(index)
//   }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Licensing System Demo</CardTitle>
          <CardDescription>Interact with our flexible user-based and time-based licensing system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
       
          <DetailedStatsTabs />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Total Licenses: {totalLicenses}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Time Remaining: {timeRemaining} days</span>
            </div>
          </div>

          <Progress value={licenseUsagePercentage} className="w-full" />
          
          <div className="flex justify-between items-center">
            <span>Used Licenses: {usedLicenses}/{bufferLicenses} (including 10% buffer)</span>
            <span>{licenseUsagePercentage.toFixed(2)}% used</span>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="company-select">Select Company</Label>
              <Select onValueChange={setSelectedCompany} value={selectedCompany}>
                <SelectTrigger id="company-select">
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map(company => (
                    <SelectItem key={company.name} value={company.name}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="add-licenses">Add Licenses</Label>
              <div className="flex space-x-2">
                <Input 
                  id="add-licenses" 
                  type="number" 
                  placeholder="Amount" 
                  value={addLicenseAmount}
                  onChange={(e) => setAddLicenseAmount(parseInt(e.target.value) || 0)}
                />
                <Button 
                  onClick={handleAddLicenses} 
                  disabled={isExpired || !selectedCompany}
                >
                  Add Licenses
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <Label htmlFor="extend-licenses">Extend Licenses</Label>
              <div className="flex space-x-2">
                <Input 
                  id="extend-licenses" 
                  type="number" 
                  placeholder="Amount" 
                  value={extendLicenseAmount}
                  onChange={(e) => setExtendLicenseAmount(parseInt(e.target.value) || 0)}
                />
                <Button onClick={handleExtendLicenses}>Extend Licenses</Button>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="duration">License Duration</Label>
            <Select onValueChange={handleChangeDuration} value={duration.toString()}>
              <SelectTrigger id="duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Year</SelectItem>
                <SelectItem value="3">3 Years</SelectItem>
                <SelectItem value="5">5 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isExpired && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>License Expired</AlertTitle>
              <AlertDescription>
                Your license has expired. Please renew to continue using the system.
              </AlertDescription>
            </Alert>
          )}

          {usedLicenses >= totalLicenses && !isExpired && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>License Limit Reached</AlertTitle>
              <AlertDescription>
                You have reached your license limit. You are now using the 10% buffer.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>

        </CardFooter>
      </Card>
    </div>
  )
}

function DetailedStatsTabs() {
  const [selectedTab, setSelectedTab] = useState<string | null>(null)

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab)
  }

  const handleCloseDialog = () => {
    setSelectedTab(null)
  }

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        {[
          { value: "organizations", label: "Organizations", icon: Building, count: "10" },
          { value: "pending", label: "Pending", icon: Clock, count: "3" },
          { value: "renewals", label: "Renewals", icon: AlertCircle, count: "2" },
          { value: "due-date", label: "Due Date", icon: Calendar, count: "1" },
          { value: "new-orgs", label: "New Orgs", icon: PlusCircle, count: "5" },
        ].map(({ value, label, icon: Icon, count }) => (
          <Button
            key={value}
            variant="outline"
            className="flex flex-col items-center p-4 h-auto gap-2"
            onClick={() => handleTabClick(value)}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xl font-bold">{count}</span>
            <span className="text-sm">{label}</span>
          </Button>
        ))}
      </div>

      <Dialog open={selectedTab !== null} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedTab === "organizations" && "Active Organizations"}
              {selectedTab === "pending" && "Pending Licenses"}
              {selectedTab === "renewals" && "License Renewals Due"}
              {selectedTab === "due-date" && "License Renewals Due Date"}
              {selectedTab === "new-orgs" && "New Organizations (30d)"}
            </DialogTitle>
          </DialogHeader>
          
          {selectedTab && (
            <div className="mt-4">
              {selectedTab === "organizations" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Active Organizations</CardTitle>
                    <CardDescription>Overview of currently active organizations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Building className="w-5 h-5" />
                        <span className="text-2xl font-bold">10</span>
                      </div>
                      <Button variant="outline">View All</Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Organization</TableHead>
                          <TableHead>License Count</TableHead>
                          <TableHead>Expiry Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Acme Corp</TableCell>
                          <TableCell>500</TableCell>
                          <TableCell>2025-01-15</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>TechSolutions Inc</TableCell>
                          <TableCell>250</TableCell>
                          <TableCell>2024-11-30</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Global Systems Ltd</TableCell>
                          <TableCell>100</TableCell>
                          <TableCell>2024-09-22</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
              {selectedTab === "pending" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Licenses</CardTitle>
                    <CardDescription>Licenses awaiting approval or activation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5" />
                        <span className="text-2xl font-bold">3</span>
                      </div>
                      <Button variant="outline">Process All</Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Organization</TableHead>
                          <TableHead>Requested Licenses</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>NewTech Startup</TableCell>
                          <TableCell>50</TableCell>
                          <TableCell>Awaiting Payment</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>DataDriven Co</TableCell>
                          <TableCell>200</TableCell>
                          <TableCell>Under Review</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>AI Innovations</TableCell>
                          <TableCell>100</TableCell>
                          <TableCell>Pending Approval</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
              {selectedTab === "renewals" && (
                <Card>
                  <CardHeader>
                    <CardTitle>License Renewals Due</CardTitle>
                    <CardDescription>Organizations with upcoming license renewals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-2xl font-bold">2</span>
                      </div>
                      <Button variant="outline">Send Reminders</Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Organization</TableHead>
                          <TableHead>Current Licenses</TableHead>
                          <TableHead>Renewal Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>TechSolutions Inc</TableCell>
                          <TableCell>250</TableCell>
                          <TableCell>2024-12-15</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Global Systems Ltd</TableCell>
                          <TableCell>100</TableCell>
                          <TableCell>2024-12-22</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
              {selectedTab === "due-date" && (
                <Card>
                  <CardHeader>
                    <CardTitle>License Renewals Due Date</CardTitle>
                    <CardDescription>Next upcoming renewal date</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5" />
                        <span className="text-2xl font-bold text-red-500">Dec 15, 2024</span>
                      </div>
                      <Button variant="outline">View Calendar</Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Organization</TableHead>
                          <TableHead>Licenses</TableHead>
                          <TableHead>Days Until Renewal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>TechSolutions Inc</TableCell>
                          <TableCell>250</TableCell>
                          <TableCell>25</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
              {selectedTab === "new-orgs" && (
                <Card>
                  <CardHeader>
                    <CardTitle>New Organizations (30d)</CardTitle>
                    <CardDescription>Organizations added in the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <PlusCircle className="w-5 h-5" />
                        <span className="text-2xl font-bold">5</span>
                      </div>
                      <Button variant="outline">View Details</Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Organization</TableHead>
                          <TableHead>Licenses</TableHead>
                          <TableHead>Join Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Innovate AI</TableCell>
                          <TableCell>75</TableCell>
                          <TableCell>2024-11-05</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>CloudNine Solutions</TableCell>
                          <TableCell>100</TableCell>
                          <TableCell>2024-11-12</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>DataDriven Analytics</TableCell>
                          <TableCell>50</TableCell>
                          <TableCell>2024-11-18</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}