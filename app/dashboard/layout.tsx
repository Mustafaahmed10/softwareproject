"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar-fix"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  Building,
  Calendar,
  CreditCard,
  HomeIcon,
  LogOut,
  Settings,
  Users,
  Wrench,
  Bell,
  ParkingCircle,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [userType, setUserType] = useState<"admin" | "resident">("resident")
  const [userName, setUserName] = useState("John Doe")
  const { toast } = useToast()

  // Determine user type based on URL path
  useEffect(() => {
    if (pathname?.includes("/dashboard/admin")) {
      setUserType("admin")
      setUserName("Admin User")
    } else {
      setUserType("resident")
      setUserName("John Doe")
    }
  }, [pathname])

  const adminMenuItems = [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: HomeIcon,
    },
    {
      title: "Residents",
      href: "/dashboard/admin/residents",
      icon: Users,
    },
    {
      title: "Properties",
      href: "/dashboard/admin/properties",
      icon: Building,
    },
    {
      title: "Payments",
      href: "/dashboard/admin/payments",
      icon: CreditCard,
    },
    {
      title: "Bills",
      href: "/dashboard/admin/bills",
      icon: CreditCard,
    },
    {
      title: "Maintenance",
      href: "/dashboard/admin/maintenance",
      icon: Wrench,
    },
    {
      title: "Events",
      href: "/dashboard/admin/events",
      icon: Calendar,
    },
    {
      title: "Notifications",
      href: "/dashboard/admin/notifications",
      icon: Bell,
    },
    {
      title: "Settings",
      href: "/dashboard/admin/settings",
      icon: Settings,
    },
  ]

  const residentMenuItems = [
    {
      title: "Dashboard",
      href: "/dashboard/resident",
      icon: HomeIcon,
    },
    {
      title: "My Properties",
      href: "/dashboard/resident/properties",
      icon: Building,
    },
    {
      title: "Payments",
      href: "/dashboard/resident/payments",
      icon: CreditCard,
    },
    {
      title: "Bills",
      href: "/dashboard/resident/bills",
      icon: CreditCard,
    },
    {
      title: "Maintenance Requests",
      href: "/dashboard/resident/maintenance",
      icon: Wrench,
    },
    {
      title: "Parking & Facilities",
      href: "/dashboard/resident/facilities",
      icon: ParkingCircle,
    },
    {
      title: "Community Events",
      href: "/dashboard/resident/events",
      icon: Calendar,
    },
    {
      title: "Notifications",
      href: "/dashboard/resident/notifications",
      icon: Bell,
    },
    {
      title: "Settings",
      href: "/dashboard/resident/settings",
      icon: Settings,
    },
  ]

  const menuItems = userType === "admin" ? adminMenuItems : residentMenuItems

  return (
    <SidebarProvider defaultExpanded>
      <div
        className={cn(
          "grid min-h-screen w-full md:grid-cols-[auto_1fr]",
          userType === "admin" ? "admin-dashboard-bg" : "resident-dashboard-bg",
        )}
      >
        <Sidebar
          className={cn(
            userType === "admin" ? "border-indigo-200 dark:border-indigo-800" : "border-cyan-200 dark:border-cyan-800",
          )}
        >
          <SidebarHeader className={cn("p-4", userType === "admin" ? "admin-header" : "resident-header")}>
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              <span className="font-bold">CMS</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} className="w-full">
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      className={cn(
                        pathname === item.href &&
                          (userType === "admin"
                            ? "bg-indigo-100 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100"
                            : "bg-cyan-100 text-cyan-900 dark:bg-cyan-900 dark:text-cyan-100"),
                      )}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/login" className="w-full">
                  <SidebarMenuButton>
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <div
            className={cn(
              "flex items-center h-16 px-4 border-b",
              userType === "admin"
                ? "border-indigo-200 dark:border-indigo-800"
                : "border-cyan-200 dark:border-cyan-800",
            )}
          >
            <SidebarTrigger className="md:hidden" />
            <DashboardHeader userType={userType} userName={userName} />
          </div>
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

