"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building,
  Calendar,
  CreditCard,
  Home,
  LogOut,
  Settings,
  Users,
  Wrench,
  Bell,
  ParkingCircle,
  Building2,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

interface DashboardSidebarProps {
  userType: "admin" | "resident"
}

export function DashboardSidebar({ userType }: DashboardSidebarProps) {
  const pathname = usePathname()

  const adminMenuItems = [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: Home,
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
      icon: Home,
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
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          <span className="font-bold">CMS</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/login">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

