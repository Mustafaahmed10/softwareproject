"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { CreditCard, DollarSign, Plus } from "lucide-react"

interface Payment {
  payment_id: number
  amount: number
  payment_type: string
  payment_date: string
  status: "Pending" | "Paid"
}

interface Bill {
  bill_id: number
  amount: number
  bill_type: string
  due_date: string
  status: "Pending" | "Paid"
}

export default function ResidentPayments() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [bills, setBills] = useState<Bill[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, you would fetch from your API
    setTimeout(() => {
      setPayments([
        {
          payment_id: 1,
          amount: 350,
          payment_type: "Society Fee",
          payment_date: "2023-05-15",
          status: "Paid",
        },
        {
          payment_id: 2,
          amount: 275,
          payment_type: "Utility Bill",
          payment_date: "2023-06-01",
          status: "Paid",
        },
        {
          payment_id: 3,
          amount: 150,
          payment_type: "Maintenance",
          payment_date: "2023-06-15",
          status: "Pending",
        },
      ])

      setBills([
        {
          bill_id: 1,
          amount: 350,
          bill_type: "Society Fee",
          due_date: "2023-07-15",
          status: "Pending",
        },
        {
          bill_id: 2,
          amount: 275,
          bill_type: "Utility Bill",
          due_date: "2023-07-01",
          status: "Pending",
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments & Bills</h1>
          <p className="text-muted-foreground">Manage your payments and view pending bills</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Make Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Make a Payment</DialogTitle>
              <DialogDescription>Pay your pending bills or make an advance payment.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="bill">Select Bill</Label>
                  <Select>
                    <SelectTrigger id="bill">
                      <SelectValue placeholder="Select a bill to pay" />
                    </SelectTrigger>
                    <SelectContent>
                      {bills
                        .filter((bill) => bill.status === "Pending")
                        .map((bill) => (
                          <SelectItem key={bill.bill_id} value={bill.bill_id.toString()}>
                            {bill.bill_type} - ${bill.amount}
                          </SelectItem>
                        ))}
                      <SelectItem value="other">Other Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" min="0" step="0.01" placeholder="0.00" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select defaultValue="credit-card">
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Pay Now</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="bills">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bills">Pending Bills</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>
        <TabsContent value="bills" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Pending Bills</h2>
              <p className="text-sm text-muted-foreground">Bills that require payment</p>
            </div>
            {isLoading ? (
              <div className="p-4 space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse flex items-center justify-between p-4 border-t">
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-muted rounded"></div>
                      <div className="h-3 w-16 bg-muted rounded"></div>
                    </div>
                    <div className="h-8 w-20 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {bills.filter((bill) => bill.status === "Pending").length > 0 ? (
                  bills
                    .filter((bill) => bill.status === "Pending")
                    .map((bill) => (
                      <div key={bill.bill_id} className="flex items-center justify-between p-4 border-t">
                        <div>
                          <h3 className="font-medium">{bill.bill_type}</h3>
                          <p className="text-sm text-muted-foreground">
                            Due: {new Date(bill.due_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-medium">${bill.amount.toFixed(2)}</p>
                          <Button size="sm">Pay Now</Button>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="p-4 border-t text-center">
                    <p className="text-muted-foreground">No pending bills</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Payment History</h2>
              <p className="text-sm text-muted-foreground">Record of your past payments</p>
            </div>
            {isLoading ? (
              <div className="p-4 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex items-center justify-between p-4 border-t">
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-muted rounded"></div>
                      <div className="h-3 w-16 bg-muted rounded"></div>
                    </div>
                    <div className="h-8 w-20 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {payments.map((payment) => (
                  <div key={payment.payment_id} className="flex items-center justify-between p-4 border-t">
                    <div>
                      <h3 className="font-medium">{payment.payment_type}</h3>
                      <p className="text-sm text-muted-foreground">
                        Date: {new Date(payment.payment_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">${payment.amount.toFixed(2)}</p>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          payment.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Payment Summary
            </CardTitle>
            <CardDescription>Overview of your payment status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Paid (This Year)</span>
              <span className="font-medium">
                $
                {payments
                  .filter((p) => p.status === "Paid")
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Pending Payments</span>
              <span className="font-medium">
                $
                {payments
                  .filter((p) => p.status === "Pending")
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Upcoming Bills</span>
              <span className="font-medium">
                $
                {bills
                  .filter((b) => b.status === "Pending")
                  .reduce((sum, b) => sum + b.amount, 0)
                  .toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Methods
            </CardTitle>
            <CardDescription>Your saved payment methods</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5" />
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Payment Method
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

