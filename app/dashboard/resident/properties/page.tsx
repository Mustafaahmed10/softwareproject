"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
import { useSession } from "next-auth/react"

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

  const { data: session, status } = useSession()

  useEffect(() => {
    if (status !== "authenticated") return

    const fetchProperties = async () => {
      try {
        const response = await fetch(`/api/properties?residentId=${session.user.id}`)
        const data = await response.json()

        if (Array.isArray(data)) {
          setProperties(data)
        } else {
          console.error("API did not return an array:", data)
          setProperties([])
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error)
        setProperties([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [session, status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const form = new FormData(e.target as HTMLFormElement)
      const newProperty = {
        address: form.get("address"),
        property_type: form.get("property_type"),
        proof: form.get("proof") as File, // Handling file input
      }

      const formData = new FormData()
      formData.append("address", newProperty.address as string)
      formData.append("property_type", newProperty.property_type as string)
      formData.append("proof", newProperty.proof)

      const res = await fetch("/api/properties", {
        method: "POST",
        body: formData, // Sending FormData
      })

      if (res.ok) {
        const saved = await res.json()
        setProperties((prev) => [...prev, saved])
        setOpen(false)
      } else {
        console.error("Error saving property:", await res.text())
      }
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
                  <Input id="address" name="address" placeholder="123 Main St, Apt 4B" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="property_type">Property Type</Label>
                  <Select name="property_type" defaultValue="Apartment">
                    <SelectTrigger id="property_type">
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
                  <Input id="proof" name="proof" type="file" required />
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
                <Button>View Details</Button>
                <Button>Edit</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
