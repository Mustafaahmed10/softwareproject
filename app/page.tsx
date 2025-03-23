import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building, CreditCard, Wrench, Calendar, Bell, Shield } from "lucide-react"
import { HomeIcon } from "lucide-react" // Import HomeIcon instead of Home to avoid naming conflict

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Building className="h-6 w-6 text-primary" />
              <span className="font-bold">Community Management System</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Manage Your Community Efficiently
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A comprehensive solution for property management, payments, maintenance requests, and community
                    events.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-full overflow-hidden rounded-xl bg-muted">
                  <img
                    src="/placeholder.svg?height=450&width=600"
                    alt="Community Management Dashboard"
                    className="object-cover"
                    width={600}
                    height={450}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage your community efficiently
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Property Management",
                  description: "Register and manage properties with ease",
                  icon: HomeIcon, // Use HomeIcon instead of Home
                },
                {
                  title: "Payment Tracking",
                  description: "Make and track payments for society fees and utility bills",
                  icon: CreditCard,
                },
                {
                  title: "Maintenance Requests",
                  description: "Submit and track maintenance requests",
                  icon: Wrench,
                },
                {
                  title: "Facility Booking",
                  description: "Book parking and community facilities",
                  icon: Calendar,
                },
                {
                  title: "Event Management",
                  description: "Create, RSVP, and manage community events",
                  icon: Bell,
                },
                {
                  title: "Notifications",
                  description: "Send and receive important notifications",
                  icon: Shield,
                },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Community Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

