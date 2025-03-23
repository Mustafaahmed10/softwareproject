"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Simple context to avoid circular dependencies
type SidebarContextType = {
  expanded: boolean
  setExpanded: (expanded: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export function SidebarProvider({
  children,
  defaultExpanded = true,
}: {
  children: React.ReactNode
  defaultExpanded?: boolean
}) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <div className="flex min-h-screen">{children}</div>
    </SidebarContext.Provider>
  )
}

export function Sidebar({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded } = useSidebar()

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background transition-all duration-300",
        expanded ? "w-64" : "w-16",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function SidebarHeader({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-b p-4", className)}>{children}</div>
}

export function SidebarContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-auto p-4", className)}>{children}</div>
}

export function SidebarFooter({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-t p-4", className)}>{children}</div>
}

export function SidebarTrigger({ className }: React.HTMLAttributes<HTMLButtonElement>) {
  const { expanded, setExpanded } = useSidebar()

  return (
    <button className={cn("p-2 hover:bg-accent rounded-md", className)} onClick={() => setExpanded(!expanded)}>
      {expanded ? "←" : "→"}
    </button>
  )
}

export function SidebarInset({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col flex-1", className)}>{children}</div>
}

export function SidebarMenu({ className, children }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("space-y-2", className)}>{children}</ul>
}

export function SidebarMenuItem({ className, children }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)}>{children}</li>
}

export function SidebarMenuButton({
  className,
  children,
  isActive,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }) {
  const { expanded } = useSidebar()

  return (
    <button
      className={cn(
        "flex items-center w-full rounded-md p-2 hover:bg-accent transition-colors",
        isActive && "bg-accent",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

