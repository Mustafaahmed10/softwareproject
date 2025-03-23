"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Wrench, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface MaintenanceRequest {
  request_id: number
  description: string
  status: "Pending" | "In Progress" | "Completed"
  created_at: string
}

export default function ResidentMaintenance() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, you would fetch from your API
    setTimeout(() => {
      setRequests([
        {
          request_id: 1,
          description: "Water leak in kitchen sink",
          status: "In Progress",
          created_at: "2023-06-10T00:00:00Z",
        },
        {
          request_id: 2,
          description: "Broken light fixture in living room",
          status: "Pending",
          created_at: "2023-06-15T00:00:00Z",
        },
        {
          request_id: 3,
          description: "AC not cooling properly",
          status: "Completed",
          created_at: "2023-05-20T00:00:00Z",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit to your API
    setOpen(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "In Progress":
        return <Wrench className="h-5 w-5 text-blue-500" />
      case "Completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-red-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance Requests</h1>
          <p className="text-muted-foreground">Submit and track maintenance requests for your properties</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Maintenance Request</DialogTitle>
              <DialogDescription>
                Describe the issue you're experiencing. We'll get back to you as soon as possible.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="property">Property</Label>
                  <Select>
                    <SelectTrigger id="property">
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="property-1">123 Main St, Apt 4B</SelectItem>
                      <SelectItem value="property-2">456 Park Ave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="issue-type">Issue Type</Label>
                  <Select>
                    <SelectTrigger id="issue-type">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                      <SelectItem value="appliance">Appliance</SelectItem>
                      <SelectItem value="structural">Structural</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the issue in detail..." rows={4} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="photos">Photos (Optional)</Label>
                  <Input id="photos" type="file" multiple />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit Request</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="space-y-2">
                    <div className="h-5 w-1/3 rounded-md bg-muted"></div>
                    <div className="h-4 w-1/2 rounded-md bg-muted"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 w-full rounded-md bg-muted"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {requests.map((request) => (
                <Card key={request.request_id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Request #{request.request_id}</CardTitle>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(request.status)}
                        <span className="text-sm font-medium">{request.status}</span>
                      </div>
                    </div>
                    <CardDescription>Submitted on {new Date(request.created_at).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{request.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {request.status === "Pending" && (
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="pending" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {requests
              .filter((r) => r.status === "Pending")
              .map((request) => (
                <Card key={request.request_id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Request #{request.request_id}</CardTitle>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(request.status)}
                        <span className="text-sm font-medium">{request.status}</span>
                      </div>
                    </div>
                    <CardDescription>Submitted on {new Date(request.created_at).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{request.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="in-progress" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {requests
              .filter((r) => r.status === "In Progress")
              .map((request) => (
                <Card key={request.request_id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Request #{request.request_id}</CardTitle>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(request.status)}
                        <span className="text-sm font-medium">{request.status}</span>
                      </div>
                    </div>
                    <CardDescription>Submitted on {new Date(request.created_at).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{request.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {requests
              .filter((r) => r.status === "Completed")
              .map((request) => (
                <Card key={request.request_id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Request #{request.request_id}</CardTitle>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(request.status)}
                        <span className="text-sm font-medium">{request.status}</span>
                      </div>
                    </div>
                    <CardDescription>Submitted on {new Date(request.created_at).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{request.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

