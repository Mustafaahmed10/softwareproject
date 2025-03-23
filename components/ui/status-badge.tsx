import * as React from "react"

import { cn } from "@/lib/utils"

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: "pending" | "in-progress" | "completed" | "paid" | "unpaid"
}

const statusClasses = {
  pending: "status-badge status-pending",
  "in-progress": "status-badge status-progress",
  completed: "status-badge status-completed",
  paid: "status-badge status-completed",
  unpaid: "status-badge status-pending",
}

const statusLabels = {
  pending: "Pending",
  "in-progress": "In Progress",
  completed: "Completed",
  paid: "Paid",
  unpaid: "Unpaid",
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(({ className, status, ...props }, ref) => {
  return (
    <span ref={ref} className={cn(statusClasses[status], className)} {...props}>
      {statusLabels[status]}
    </span>
  )
})
StatusBadge.displayName = "StatusBadge"

export { StatusBadge }

