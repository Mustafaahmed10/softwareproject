import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, CreditCard, Wrench, Calendar, Users } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">Welcome back, Admin. Here's an overview of your community.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="admin-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Residents</CardTitle>
            <Users className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card className="admin-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <Building className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85</div>
            <p className="text-xs text-muted-foreground">Registered properties</p>
          </CardContent>
        </Card>
        <Card className="admin-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">From 42 residents</p>
          </CardContent>
        </Card>
        <Card className="admin-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Requests</CardTitle>
            <Wrench className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">8 pending, 16 in progress</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="admin-card">
          <CardHeader>
            <CardTitle>Recent Maintenance Requests</CardTitle>
            <CardDescription>Latest maintenance requests from residents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Plumbing Issue",
                description: "Water leak in apartment 302",
                status: "Pending",
                date: "2 hours ago",
              },
              {
                title: "Electrical Problem",
                description: "Power outage in building B",
                status: "In Progress",
                date: "1 day ago",
              },
              {
                title: "HVAC Repair",
                description: "AC not working in apartment 105",
                status: "In Progress",
                date: "2 days ago",
              },
            ].map((request, index) => (
              <div key={index} className="flex items-start gap-4 rounded-lg border p-3">
                <Wrench className="mt-1 h-5 w-5 text-indigo-500" />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{request.title}</p>
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        request.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800",
                      )}
                    >
                      {request.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{request.description}</p>
                  <p className="text-xs text-muted-foreground">{request.date}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              View All Requests
            </Button>
          </CardContent>
        </Card>
        <Card className="admin-card">
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Latest payments from residents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                resident: "John Doe",
                amount: "$350.00",
                type: "Society Fee",
                date: "Today",
              },
              {
                resident: "Jane Smith",
                amount: "$275.00",
                type: "Utility Bill",
                date: "Yesterday",
              },
              {
                resident: "Robert Johnson",
                amount: "$150.00",
                type: "Maintenance",
                date: "3 days ago",
              },
            ].map((payment, index) => (
              <div key={index} className="flex items-start gap-4 rounded-lg border p-3">
                <CreditCard className="mt-1 h-5 w-5 text-indigo-500" />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{payment.resident}</p>
                    <span className="text-sm font-medium">{payment.amount}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{payment.type}</p>
                  <p className="text-xs text-muted-foreground">{payment.date}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              View All Payments
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/admin/residents">
          <Card className="h-full transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-950 admin-card">
            <CardHeader>
              <Users className="h-5 w-5 text-indigo-500" />
              <CardTitle className="mt-2">Manage Residents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Add, update, and delete resident information</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/admin/properties">
          <Card className="h-full transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-950 admin-card">
            <CardHeader>
              <Building className="h-5 w-5 text-indigo-500" />
              <CardTitle className="mt-2">Manage Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">View and manage all registered properties</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/admin/bills">
          <Card className="h-full transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-950 admin-card">
            <CardHeader>
              <CreditCard className="h-5 w-5 text-indigo-500" />
              <CardTitle className="mt-2">Generate Bills</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Create and send bills to residents</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/admin/events">
          <Card className="h-full transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-950 admin-card">
            <CardHeader>
              <Calendar className="h-5 w-5 text-indigo-500" />
              <CardTitle className="mt-2">Manage Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Create and manage community events</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

