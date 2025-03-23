"use server"

import { revalidatePath } from "next/cache"
import { query } from "@/lib/db"
import type { Resident, Property, Payment, MaintenanceRequest, Event, Bill } from "@/types/database"

// Resident actions
export async function getResidentsAction() {
  try {
    const residents = await query<Resident[]>("SELECT * FROM residents ORDER BY created_at DESC")
    return { success: true, data: residents }
  } catch (error) {
    console.error("Error fetching residents:", error)
    return { success: false, error: "Failed to fetch residents" }
  }
}

export async function createResidentAction(data: Omit<Resident, "resident_id" | "created_at">) {
  try {
    const { name, email, phone, address } = data
    const result = await query<any>(
      "INSERT INTO residents (name, email, phone, address, password_hash) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone, address, "hashed_password"], // In a real app, you would hash the password
    )
    revalidatePath("/dashboard/admin/residents")
    return { success: true, data: { id: result.insertId, ...data } }
  } catch (error) {
    console.error("Error creating resident:", error)
    return { success: false, error: "Failed to create resident" }
  }
}

export async function updateResidentAction(id: number, data: Partial<Resident>) {
  try {
    const { name, email, phone, address } = data
    await query("UPDATE residents SET name = ?, email = ?, phone = ?, address = ? WHERE resident_id = ?", [
      name,
      email,
      phone,
      address,
      id,
    ])
    revalidatePath("/dashboard/admin/residents")
    return { success: true }
  } catch (error) {
    console.error("Error updating resident:", error)
    return { success: false, error: "Failed to update resident" }
  }
}

export async function deleteResidentAction(id: number) {
  try {
    await query("DELETE FROM residents WHERE resident_id = ?", [id])
    revalidatePath("/dashboard/admin/residents")
    return { success: true }
  } catch (error) {
    console.error("Error deleting resident:", error)
    return { success: false, error: "Failed to delete resident" }
  }
}

// Property actions
export async function getPropertiesAction() {
  try {
    const properties = await query<Property[]>(
      `SELECT p.*, r.name as resident_name 
       FROM properties p 
       JOIN residents r ON p.resident_id = r.resident_id 
       ORDER BY p.created_at DESC`,
    )
    return { success: true, data: properties }
  } catch (error) {
    console.error("Error fetching properties:", error)
    return { success: false, error: "Failed to fetch properties" }
  }
}

export async function getPropertiesByResidentIdAction(residentId: number) {
  try {
    const properties = await query<Property[]>("SELECT * FROM properties WHERE resident_id = ?", [residentId])
    return { success: true, data: properties }
  } catch (error) {
    console.error("Error fetching resident properties:", error)
    return { success: false, error: "Failed to fetch properties" }
  }
}

export async function createPropertyAction(data: Omit<Property, "property_id" | "created_at">) {
  try {
    const { resident_id, address, property_type } = data
    const result = await query<any>("INSERT INTO properties (resident_id, address, property_type) VALUES (?, ?, ?)", [
      resident_id,
      address,
      property_type,
    ])
    revalidatePath("/dashboard/admin/properties")
    revalidatePath("/dashboard/resident/properties")
    return { success: true, data: { property_id: result.insertId, ...data } }
  } catch (error) {
    console.error("Error creating property:", error)
    return { success: false, error: "Failed to create property" }
  }
}

export async function updatePropertyAction(id: number, data: Partial<Property>) {
  try {
    const { resident_id, address, property_type } = data
    await query("UPDATE properties SET resident_id = ?, address = ?, property_type = ? WHERE property_id = ?", [
      resident_id,
      address,
      property_type,
      id,
    ])
    revalidatePath("/dashboard/admin/properties")
    revalidatePath("/dashboard/resident/properties")
    return { success: true }
  } catch (error) {
    console.error("Error updating property:", error)
    return { success: false, error: "Failed to update property" }
  }
}

export async function deletePropertyAction(id: number) {
  try {
    await query("DELETE FROM properties WHERE property_id = ?", [id])
    revalidatePath("/dashboard/admin/properties")
    revalidatePath("/dashboard/resident/properties")
    return { success: true }
  } catch (error) {
    console.error("Error deleting property:", error)
    return { success: false, error: "Failed to delete property" }
  }
}

// Bill actions
export async function getBillsAction() {
  try {
    const bills = await query<Bill[]>(
      `SELECT b.*, r.name as resident_name 
       FROM bills b 
       JOIN residents r ON b.resident_id = r.resident_id 
       ORDER BY b.due_date ASC`,
    )
    return { success: true, data: bills }
  } catch (error) {
    console.error("Error fetching bills:", error)
    return { success: false, error: "Failed to fetch bills" }
  }
}

export async function getBillsByResidentIdAction(residentId: number) {
  try {
    const bills = await query<Bill[]>("SELECT * FROM bills WHERE resident_id = ? ORDER BY due_date ASC", [residentId])
    return { success: true, data: bills }
  } catch (error) {
    console.error("Error fetching resident bills:", error)
    return { success: false, error: "Failed to fetch bills" }
  }
}

export async function createBillAction(data: Omit<Bill, "bill_id" | "created_at">) {
  try {
    const { resident_id, amount, bill_type, due_date, status } = data
    const result = await query<any>(
      "INSERT INTO bills (resident_id, amount, bill_type, due_date, status) VALUES (?, ?, ?, ?, ?)",
      [resident_id, amount, bill_type, due_date, status],
    )
    revalidatePath("/dashboard/admin/bills")
    revalidatePath("/dashboard/resident/bills")
    return { success: true, data: { bill_id: result.insertId, ...data } }
  } catch (error) {
    console.error("Error creating bill:", error)
    return { success: false, error: "Failed to create bill" }
  }
}

export async function updateBillAction(id: number, data: Partial<Bill>) {
  try {
    const { status } = data
    await query("UPDATE bills SET status = ? WHERE bill_id = ?", [status, id])
    revalidatePath("/dashboard/admin/bills")
    revalidatePath("/dashboard/resident/bills")
    return { success: true }
  } catch (error) {
    console.error("Error updating bill:", error)
    return { success: false, error: "Failed to update bill" }
  }
}

// Payment actions
export async function getPaymentsAction() {
  try {
    const payments = await query<Payment[]>(
      `SELECT p.*, r.name as resident_name 
       FROM payments p 
       JOIN residents r ON p.resident_id = r.resident_id 
       ORDER BY p.created_at DESC`,
    )
    return { success: true, data: payments }
  } catch (error) {
    console.error("Error fetching payments:", error)
    return { success: false, error: "Failed to fetch payments" }
  }
}

export async function getPaymentsByResidentIdAction(residentId: number) {
  try {
    const payments = await query<Payment[]>("SELECT * FROM payments WHERE resident_id = ?", [residentId])
    return { success: true, data: payments }
  } catch (error) {
    console.error("Error fetching resident payments:", error)
    return { success: false, error: "Failed to fetch payments" }
  }
}

export async function createPaymentAction(data: Omit<Payment, "payment_id" | "created_at">) {
  try {
    const { resident_id, amount, payment_type, payment_date, status } = data
    const result = await query<any>(
      "INSERT INTO payments (resident_id, amount, payment_type, payment_date, status) VALUES (?, ?, ?, ?, ?)",
      [resident_id, amount, payment_type, payment_date, status],
    )

    // If payment is for a bill, update the bill status
    if (data.payment_type === "Society Fee" || data.payment_type === "Utility Bill") {
      await query(
        "UPDATE bills SET status = 'Paid' WHERE resident_id = ? AND bill_type = ? AND status = 'Pending' LIMIT 1",
        [resident_id, data.payment_type],
      )
    }

    revalidatePath("/dashboard/admin/payments")
    revalidatePath("/dashboard/resident/payments")
    return { success: true, data: { payment_id: result.insertId, ...data } }
  } catch (error) {
    console.error("Error creating payment:", error)
    return { success: false, error: "Failed to create payment" }
  }
}

// Maintenance request actions
export async function getMaintenanceRequestsAction() {
  try {
    const requests = await query<MaintenanceRequest[]>(
      `SELECT m.*, r.name as resident_name 
       FROM maintenance_requests m 
       JOIN residents r ON m.resident_id = r.resident_id 
       ORDER BY m.created_at DESC`,
    )
    return { success: true, data: requests }
  } catch (error) {
    console.error("Error fetching maintenance requests:", error)
    return { success: false, error: "Failed to fetch maintenance requests" }
  }
}

export async function getMaintenanceRequestsByResidentIdAction(residentId: number) {
  try {
    const requests = await query<MaintenanceRequest[]>("SELECT * FROM maintenance_requests WHERE resident_id = ?", [
      residentId,
    ])
    return { success: true, data: requests }
  } catch (error) {
    console.error("Error fetching resident maintenance requests:", error)
    return { success: false, error: "Failed to fetch maintenance requests" }
  }
}

export async function createMaintenanceRequestAction(data: Omit<MaintenanceRequest, "request_id" | "created_at">) {
  try {
    const { resident_id, description, status } = data
    const result = await query<any>(
      "INSERT INTO maintenance_requests (resident_id, description, status) VALUES (?, ?, ?)",
      [resident_id, description, status || "Pending"],
    )
    revalidatePath("/dashboard/admin/maintenance")
    revalidatePath("/dashboard/resident/maintenance")
    return { success: true, data: { request_id: result.insertId, ...data } }
  } catch (error) {
    console.error("Error creating maintenance request:", error)
    return { success: false, error: "Failed to create maintenance request" }
  }
}

export async function updateMaintenanceRequestAction(id: number, data: Partial<MaintenanceRequest>) {
  try {
    const { status } = data
    await query("UPDATE maintenance_requests SET status = ? WHERE request_id = ?", [status, id])
    revalidatePath("/dashboard/admin/maintenance")
    revalidatePath("/dashboard/resident/maintenance")
    return { success: true }
  } catch (error) {
    console.error("Error updating maintenance request:", error)
    return { success: false, error: "Failed to update maintenance request" }
  }
}

// Event actions
export async function getEventsAction() {
  try {
    const events = await query<Event[]>("SELECT * FROM events ORDER BY event_date DESC")
    return { success: true, data: events }
  } catch (error) {
    console.error("Error fetching events:", error)
    return { success: false, error: "Failed to fetch events" }
  }
}

export async function createEventAction(data: Omit<Event, "event_id" | "created_at">) {
  try {
    const { admin_id, event_name, event_date, description } = data
    const result = await query<any>(
      "INSERT INTO events (admin_id, event_name, event_date, description) VALUES (?, ?, ?, ?)",
      [admin_id, event_name, event_date, description],
    )
    revalidatePath("/dashboard/admin/events")
    revalidatePath("/dashboard/resident/events")
    return { success: true, data: { event_id: result.insertId, ...data } }
  } catch (error) {
    console.error("Error creating event:", error)
    return { success: false, error: "Failed to create event" }
  }
}

export async function updateEventAction(id: number, data: Partial<Event>) {
  try {
    const { event_name, event_date, description } = data
    await query("UPDATE events SET event_name = ?, event_date = ?, description = ? WHERE event_id = ?", [
      event_name,
      event_date,
      description,
      id,
    ])
    revalidatePath("/dashboard/admin/events")
    revalidatePath("/dashboard/resident/events")
    return { success: true }
  } catch (error) {
    console.error("Error updating event:", error)
    return { success: false, error: "Failed to update event" }
  }
}

export async function deleteEventAction(id: number) {
  try {
    await query("DELETE FROM events WHERE event_id = ?", [id])
    revalidatePath("/dashboard/admin/events")
    revalidatePath("/dashboard/resident/events")
    return { success: true }
  } catch (error) {
    console.error("Error deleting event:", error)
    return { success: false, error: "Failed to delete event" }
  }
}

