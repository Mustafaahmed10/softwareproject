"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Plus } from "lucide-react"

interface Property {
  property_id: number
  address: string
  property_type: "Apartment" | "House" | "Villa"
  created_at: string
}

export default function ResidentProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, you would fetch from your API
    const timer = setTimeout(() => {
      try {
        setProperties([
          {
            property_id: 1,
            address: "123 Main St, Apt 4B",
            property_type: "Apartment",
            created_at: "2023-01-15T00:00:00Z",
          },
          {
            property_id: 2,
            address: "456 Park Ave",
            property_type: "House",
            created_at: "2023-03-22T00:00:00Z",
          },
        ])
        setIsLoading(false)
      } catch (error) {
        console.error("Error setting properties:", error)
        setIsLoading(false)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // In a real app, you would submit to your API
      setOpen(false)
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Properties</h1>
          <p className="text-muted-foreground">Manage your registered properties</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Property
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register New Property</DialogTitle>
              <DialogDescription>Add a new property to your account. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="address">Property Address</Label>
                  <Input id="address" placeholder="123 Main St, Apt 4B" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="property-type">Property Type</Label>
                  <Select defaultValue="Apartment">
                    <SelectTrigger id="property-type">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="House">House</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="proof">Proof of Ownership</Label>
                  <Input id="proof" type="file" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Register Property</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-2">
                <div className="h-5 w-1/3 rounded-md bg-muted"></div>
                <div className="h-4 w-1/2 rounded-md bg-muted"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 w-full rounded-md bg-muted"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Card key={property.property_id}>
              <CardHeader className="flex flex-row items-start gap-4">
                <Building className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <CardTitle>{property.address}</CardTitle>
                  <CardDescription>{property.property_type}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Registered on {new Date(property.created_at).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button>
                  View Details
                </Button>
                <Button>
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

