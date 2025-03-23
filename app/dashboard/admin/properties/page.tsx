"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  getPropertiesAction,
  createPropertyAction,
  updatePropertyAction,
  deletePropertyAction,
  getResidentsAction,
} from "@/lib/actions"
import type { Property, Resident } from "@/types/database"

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [residents, setResidents] = useState<Resident[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [formData, setFormData] = useState({
    resident_id: "",
    address: "",
    property_type: "Apartment" as "Apartment" | "House" | "Villa",
  })
  const { toast } = useToast()

  // Fetch properties and residents
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        const [propertiesResponse, residentsResponse] = await Promise.all([getPropertiesAction(), getResidentsAction()])

        if (propertiesResponse.success) {
          setProperties(propertiesResponse.data)
        } else {
          toast({
            title: "Error",
            description: propertiesResponse.error || "Failed to fetch properties",
            variant: "destructive",
          })
        }

        if (residentsResponse.success) {
          setResidents(residentsResponse.data)
        } else {
          toast({
            title: "Error",
            description: residentsResponse.error || "Failed to fetch residents",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const filteredProperties = properties.filter(
    (property) =>
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.property_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (property.resident_name && property.resident_name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const residentId = Number.parseInt(formData.resident_id)

      if (isNaN(residentId)) {
        toast({
          title: "Error",
          description: "Please select a resident",
          variant: "destructive",
        })
        return
      }

      let result

      if (editingProperty) {
        result = await updatePropertyAction(editingProperty.property_id, {
          ...formData,
          resident_id: residentId,
        })
      } else {
        result = await createPropertyAction({
          ...formData,
          resident_id: residentId,
        })
      }

      if (result.success) {
        toast({
          title: editingProperty ? "Property Updated" : "Property Added",
          description: editingProperty
            ? "The property has been updated successfully"
            : "The property has been registered successfully",
        })

        // Refresh the properties list
        const response = await getPropertiesAction()
        if (response.success) {
          setProperties(response.data)
        }

        setOpen(false)
        setEditingProperty(null)
        setFormData({
          resident_id: "",
          address: "",
          property_type: "Apartment",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to save property",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving property:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (property: Property) => {
    setEditingProperty(property)
    setFormData({
      resident_id: property.resident_id.toString(),
      address: property.address,
      property_type: property.property_type,
    })
    setOpen(true)
  }

  const handleDelete = async (propertyId: number) => {
    try {
      const result = await deletePropertyAction(propertyId)

      if (result.success) {
        toast({
          title: "Property Deleted",
          description: "The property has been deleted successfully",
        })

        // Remove the property from the state
        setProperties((prev) => prev.filter((p) => p.property_id !== propertyId))
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete property",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting property:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Properties</h1>
          <p className="text-muted-foreground">View and manage all registered properties</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="admin-button">
              <Plus className="mr-2 h-4 w-4" /> Add Property
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProperty ? "Edit Property" : "Add New Property"}</DialogTitle>
              <DialogDescription>
                {editingProperty
                  ? "Update property details. Click save when you're done."
                  : "Register a new property in the community."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="resident_id">Resident</Label>
                  <Select
                    value={formData.resident_id}
                    onValueChange={(value) => handleSelectChange(value, "resident_id")}
                  >
                    <SelectTrigger id="resident_id">
                      <SelectValue placeholder="Select resident" />
                    </SelectTrigger>
                    <SelectContent>
                      {residents.map((resident) => (
                        <SelectItem key={resident.resident_id} value={resident.resident_id.toString()}>
                          {resident.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Property Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, Apt 4B"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="property_type">Property Type</Label>
                  <Select
                    value={formData.property_type}
                    onValueChange={(value) => handleSelectChange(value, "property_type")}
                  >
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
              </div>
              <DialogFooter>
                <Button type="submit" className="admin-button">
                  {editingProperty ? "Update Property" : "Add Property"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="admin-card">
        <CardHeader>
          <CardTitle>Properties</CardTitle>
          <CardDescription>All registered properties in your community</CardDescription>
          <div className="flex items-center gap-2 pt-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Registered On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No properties found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProperties.map((property) => (
                    <TableRow key={property.property_id}>
                      <TableCell className="font-medium">{property.address}</TableCell>
                      <TableCell>{property.property_type}</TableCell>
                      <TableCell>{property.resident_name}</TableCell>
                      <TableCell>{new Date(property.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleEdit(property)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(property.property_id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredProperties.length} of {properties.length} properties
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

