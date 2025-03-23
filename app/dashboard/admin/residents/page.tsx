"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash } from "lucide-react"

interface Resident {
  resident_id: number
  name: string
  email: string
  phone: string
  address: string
  created_at: string
}

export default function AdminResidentsPage() {
  const [residents, setResidents] = useState<Resident[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, you would fetch from your API
    setTimeout(() => {
      setResidents([
        {
          resident_id: 1,
          name: "John Doe",
          email: "john@example.com",
          phone: "+1 (555) 123-4567",
          address: "123 Main St, Apt 4B",
          created_at: "2023-01-15T00:00:00Z",
        },
        {
          resident_id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+1 (555) 987-6543",
          address: "456 Park Ave",
          created_at: "2023-02-20T00:00:00Z",
        },
        {
          resident_id: 3,
          name: "Robert Johnson",
          email: "robert@example.com",
          phone: "+1 (555) 456-7890",
          address: "789 Oak St",
          created_at: "2023-03-10T00:00:00Z",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredResidents = residents.filter(
    (resident) =>
      resident.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resident.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resident.phone.includes(searchQuery) ||
      resident.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit to your API
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Residents</h1>
          <p className="text-muted-foreground">Add, update, and delete resident information</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Resident
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Resident</DialogTitle>
              <DialogDescription>Add a new resident to the community.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St, Apt 4B" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Resident</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Residents</CardTitle>
          <CardDescription>Manage all residents in your community</CardDescription>
          <div className="flex items-center gap-2 pt-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search residents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResidents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No residents found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredResidents.map((resident) => (
                    <TableRow key={resident.resident_id}>
                      <TableCell className="font-medium">{resident.name}</TableCell>
                      <TableCell>{resident.email}</TableCell>
                      <TableCell>{resident.phone}</TableCell>
                      <TableCell>{resident.address}</TableCell>
                      <TableCell>{new Date(resident.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredResidents.length} of {residents.length} residents
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

