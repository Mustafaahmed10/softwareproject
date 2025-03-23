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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Send } from "lucide-react"

interface Bill {
  bill_id: number
  resident_name: string
  amount: number
  bill_type: string
  due_date: string
  status: "Pending" | "Paid"
}

export default function AdminBillsPage() {
  const [bills, setBills] = useState<Bill[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, you would fetch from your API
    setTimeout(() => {
      setBills([
        {
          bill_id: 1,
          resident_name: "John Doe",
          amount: 350,
          bill_type: "Society Fee",
          due_date: "2023-07-15",
          status: "Pending",
        },
        {
          bill_id: 2,
          resident_name: "Jane Smith",
          amount: 275,
          bill_type: "Utility Bill",
          due_date: "2023-07-01",
          status: "Pending",
        },
        {
          bill_id: 3,
          resident_name: "Robert Johnson",
          amount: 350,
          bill_type: "Society Fee",
          due_date: "2023-07-20",
          status: "Paid",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredBills = bills.filter(
    (bill) =>
      bill.resident_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.bill_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.status.toLowerCase().includes(searchQuery.toLowerCase()),
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
          <h1 className="text-3xl font-bold tracking-tight">Generate Bills</h1>
          <p className="text-muted-foreground">Create and send bills to residents</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Bill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Bill</DialogTitle>
              <DialogDescription>Generate a new bill for a resident.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="resident">Resident</Label>
                  <Select>
                    <SelectTrigger id="resident">
                      <SelectValue placeholder="Select resident" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">John Doe</SelectItem>
                      <SelectItem value="2">Jane Smith</SelectItem>
                      <SelectItem value="3">Robert Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bill-type">Bill Type</Label>
                  <Select>
                    <SelectTrigger id="bill-type">
                      <SelectValue placeholder="Select bill type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Society Fee">Society Fee</SelectItem>
                      <SelectItem value="Utility Bill">Utility Bill</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" min="0" step="0.01" placeholder="0.00" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input id="due-date" type="date" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Bill</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bills</CardTitle>
          <CardDescription>All bills for community residents</CardDescription>
          <div className="flex items-center gap-2 pt-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bills..."
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
                  <TableHead>Resident</TableHead>
                  <TableHead>Bill Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No bills found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBills.map((bill) => (
                    <TableRow key={bill.bill_id}>
                      <TableCell className="font-medium">{bill.resident_name}</TableCell>
                      <TableCell>{bill.bill_type}</TableCell>
                      <TableCell>${bill.amount.toFixed(2)}</TableCell>
                      <TableCell>{new Date(bill.due_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            bill.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {bill.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Send className="h-4 w-4 mr-2" /> Send Reminder
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
            Showing {filteredBills.length} of {bills.length} bills
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

