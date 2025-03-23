import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Building, CreditCard, Wrench, Calendar, Bell } from "lucide-react"
import Link from "next/link"

export default function ResidentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-teal-500">
          Welcome Back, John
        </h1>
        <p className="text-muted-foreground">Here's an overview of your community activity</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <GlassCard className="dashboard-card resident-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Properties</p>
              <h2 className="text-3xl font-bold">2</h2>
              <p className="text-xs text-muted-foreground mt-1">Registered properties</p>
            </div>
            <div className="p-2 rounded-full bg-gradient-to-r from-cyan-600 to-teal-500">
              <Building className="h-5 w-5 text-white" />
            </div>
          </div>
        </GlassCard>
        <GlassCard className="dashboard-card resident-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Bills</p>
              <h2 className="text-3xl font-bold">$350</h2>
              <p className="text-xs text-muted-foreground mt-1">Due in 7 days</p>
            </div>
            <div className="p-2 rounded-full bg-gradient-to-r from-warning-600 to-warning-400">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
          </div>
        </GlassCard>
        <GlassCard className="dashboard-card resident-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Maintenance</p>
              <h2 className="text-3xl font-bold">1</h2>
              <p className="text-xs text-muted-foreground mt-1">Active request</p>
            </div>
            <div className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-400">
              <Wrench className="h-5 w-5 text-white" />
            </div>
          </div>
        </GlassCard>
        <GlassCard className="dashboard-card resident-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Upcoming Events</p>
              <h2 className="text-3xl font-bold">3</h2>
              <p className="text-xs text-muted-foreground mt-1">In the next 30 days</p>
            </div>
            <div className="p-2 rounded-full bg-gradient-to-r from-pink-600 to-pink-400">
              <Calendar className="h-5 w-5 text-white" />
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="dashboard-card resident-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-cyan-600" />
              Recent Notifications
            </CardTitle>
            <CardDescription>Your latest community updates and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Maintenance Scheduled",
                description: "Water supply will be interrupted on June 15th from 10 AM to 2 PM",
                date: "2 days ago",
              },
              {
                title: "Payment Received",
                description: "Your maintenance fee payment of $150 has been received",
                date: "1 week ago",
              },
              {
                title: "Community Event",
                description: "Summer BBQ scheduled for July 4th at the community park",
                date: "1 week ago",
              },
            ].map((notification, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-lg border p-3 hover:bg-cyan-50 dark:hover:bg-cyan-950 transition-colors"
              >
                <Bell className="mt-1 h-5 w-5 text-cyan-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                  <p className="text-xs text-muted-foreground">{notification.date}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full resident-button">
              View All Notifications
            </Button>
          </CardContent>
        </Card>
        <Card className="dashboard-card resident-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-cyan-600" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Community events in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Summer BBQ",
                description: "Annual community BBQ at the central park",
                date: "July 4, 2025",
              },
              {
                title: "Neighborhood Watch Meeting",
                description: "Monthly meeting to discuss community safety",
                date: "June 15, 2025",
              },
              {
                title: "Community Cleanup",
                description: "Volunteer event to clean up the community grounds",
                date: "June 22, 2025",
              },
            ].map((event, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-lg border p-3 hover:bg-cyan-50 dark:hover:bg-cyan-950 transition-colors"
              >
                <Calendar className="mt-1 h-5 w-5 text-cyan-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full resident-button">
              View All Events
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/resident/properties">
          <GlassCard className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 resident-card">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-full bg-gradient-to-r from-cyan-600 to-teal-500">
                <Building className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-medium">Manage Properties</h3>
              <p className="text-sm text-muted-foreground">Register and manage your properties</p>
            </div>
          </GlassCard>
        </Link>
        <Link href="/dashboard/resident/payments">
          <GlassCard className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 resident-card">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-full bg-gradient-to-r from-success-600 to-success-400">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-medium">Make Payments</h3>
              <p className="text-sm text-muted-foreground">Pay your bills and track payment history</p>
            </div>
          </GlassCard>
        </Link>
        <Link href="/dashboard/resident/maintenance">
          <GlassCard className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 resident-card">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-400">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-medium">Maintenance Requests</h3>
              <p className="text-sm text-muted-foreground">Submit and track maintenance requests</p>
            </div>
          </GlassCard>
        </Link>
        <Link href="/dashboard/resident/events">
          <GlassCard className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 resident-card">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-full bg-gradient-to-r from-pink-600 to-pink-400">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-medium">Community Events</h3>
              <p className="text-sm text-muted-foreground">View and RSVP to upcoming events</p>
            </div>
          </GlassCard>
        </Link>
      </div>
    </div>
  )
}

