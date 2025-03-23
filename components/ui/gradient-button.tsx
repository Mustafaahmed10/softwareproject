import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const gradientButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-white shadow-lg",
        outline: "border bg-background hover:text-white",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      gradient: {
        blue: "bg-gradient-to-r from-community-600 to-community-400 hover:from-community-700 hover:to-community-500",
        green: "bg-gradient-to-r from-success-600 to-success-400 hover:from-success-700 hover:to-success-500",
        amber: "bg-gradient-to-r from-warning-600 to-warning-400 hover:from-warning-700 hover:to-warning-500",
        purple: "bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500",
        pink: "bg-gradient-to-r from-pink-600 to-pink-400 hover:from-pink-700 hover:to-pink-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      glow: {
        true: "after:content-[''] after:absolute after:inset-0 after:z-[-1] after:opacity-40 after:blur-xl after:bg-inherit",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      gradient: "blue",
      size: "default",
      glow: false,
    },
  },
)

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gradientButtonVariants> {
  asChild?: boolean
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant, gradient, size, glow, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp className={cn(gradientButtonVariants({ variant, gradient, size, glow, className }))} ref={ref} {...props} />
    )
  },
)
GradientButton.displayName = "GradientButton"

export { GradientButton, gradientButtonVariants }

