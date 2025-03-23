"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash } from "lucide-react"

interface Event {
  event_id: number
  event_name: string
  event_date: string
  description: string
  created_at: string
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, you would fetch from your API
    setTimeout(() => {
      setEvents([
        {
          event_id: 1,
          event_name: "Summer BBQ",
          event_date: "2023-07-04T12:00:00Z",
          description: "Annual community BBQ at the central park",
          created_at: "2023-05-15T00:00:00Z",
        },
        {
          event_id: 2,
          event_name: "Neighborhood Watch Meeting",
          event_date: "2023-06-15T18:00:00Z",
          description: "Monthly meeting to discuss community safety",
          created_at: "2023-05-20T00:00:00Z",
        },
        {
          event_id: 3,
          event_name: "Community Cleanup",
          event_date: "2023-06-22T09:00:00Z",
          description: "Volunteer event to clean up the community grounds",
          created_at: "2023-05-25T00:00:00Z",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredEvents = events.filter(
    (event) =>
      event.event_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit to your API
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Events</h1>
          <p className="text-muted-foreground">Create and manage community events</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>Create a new event for the community.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="event-name">Event Name</Label>
                  <Input id="event-name" placeholder="Summer BBQ" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-date">Event Date & Time</Label>
                  <Input id="event-date" type="datetime-local" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the event..." rows={4} required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Event</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardDescription>All community events</CardDescription>
          <div className="flex items-center gap-2 pt-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No events found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEvents.map((event) => (
                    <TableRow key={event.event_id}>
                      <TableCell className="font-medium">{event.event_name}</TableCell>
                      <TableCell>{new Date(event.event_date).toLocaleString()}</TableCell>
                      <TableCell>{event.description}</TableCell>
                      <TableCell>{new Date(event.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
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
            Showing {filteredEvents.length} of {events.length} events
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

