import mysql from "mysql2/promise"
import type { Resident, Property, Payment, MaintenanceRequest, Event, Bill } from "@/types/database"

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Helper function to execute SQL queries
export async function query<T>(sql: string, params: any[] = []): Promise<T> {
  try {
    const [results] = await pool.execute(sql, params)
    return results as T
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Resident-related queries
export async function getResidents(): Promise<Resident[]> {
  return query<Resident[]>("SELECT * FROM residents ORDER BY created_at DESC")
}

export async function getResidentById(id: number): Promise<Resident | undefined> {
  const results = await query<Resident[]>("SELECT * FROM residents WHERE resident_id = ?", [id])
  return results[0]
}

export async function createResident(
  data: Omit<Resident, "resident_id" | "created_at">,
): Promise<mysql.ResultSetHeader> {
  const { name, email, phone, address } = data
  return query<mysql.ResultSetHeader>("INSERT INTO residents (name, email, phone, address) VALUES (?, ?, ?, ?)", [
    name,
    email,
    phone,
    address,
  ])
}

// Property-related queries
export async function getProperties(): Promise<Property[]> {
  return query<Property[]>(`
    SELECT p.*, r.name as resident_name 
    FROM properties p 
    JOIN residents r ON p.resident_id = r.resident_id 
    ORDER BY p.created_at DESC
  `)
}

export async function getPropertyById(id: number): Promise<Property | undefined> {
  const results = await query<Property[]>(
    `
    SELECT p.*, r.name as resident_name 
    FROM properties p 
    JOIN residents r ON p.resident_id = r.resident_id 
    WHERE p.property_id = ?
  `,
    [id],
  )
  return results[0]
}

export async function getPropertiesByResidentId(residentId: number): Promise<Property[]> {
  return query<Property[]>("SELECT * FROM properties WHERE resident_id = ?", [residentId])
}

// Payment-related queries
export async function getPayments(): Promise<Payment[]> {
  return query<Payment[]>(`
    SELECT p.*, r.name as resident_name 
    FROM payments p 
    JOIN residents r ON p.resident_id = r.resident_id 
    ORDER BY p.created_at DESC
  `)
}

export async function getPaymentsByResidentId(residentId: number): Promise<Payment[]> {
  return query<Payment[]>("SELECT * FROM payments WHERE resident_id = ?", [residentId])
}

// Maintenance-related queries
export async function getMaintenanceRequests(): Promise<MaintenanceRequest[]> {
  return query<MaintenanceRequest[]>(`
    SELECT m.*, r.name as resident_name 
    FROM maintenance_requests m 
    JOIN residents r ON m.resident_id = r.resident_id 
    ORDER BY m.created_at DESC
  `)
}

export async function getMaintenanceRequestsByResidentId(residentId: number): Promise<MaintenanceRequest[]> {
  return query<MaintenanceRequest[]>("SELECT * FROM maintenance_requests WHERE resident_id = ?", [residentId])
}

// Event-related queries
export async function getEvents(): Promise<Event[]> {
  return query<Event[]>("SELECT * FROM events ORDER BY event_date DESC")
}

export async function getEventById(id: number): Promise<Event | undefined> {
  const results = await query<Event[]>("SELECT * FROM events WHERE event_id = ?", [id])
  return results[0]
}

// Bill-related queries
export async function getBills(): Promise<Bill[]> {
  return query<Bill[]>(`
    SELECT b.*, r.name as resident_name 
    FROM bills b 
    JOIN residents r ON b.resident_id = r.resident_id 
    ORDER BY b.due_date ASC
  `)
}

export async function getBillsByResidentId(residentId: number): Promise<Bill[]> {
  return query<Bill[]>("SELECT * FROM bills WHERE resident_id = ? ORDER BY due_date ASC", [residentId])
}

