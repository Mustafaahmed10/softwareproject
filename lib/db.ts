import mysql from "mysql2/promise";
import type { Resident, Property, Payment, MaintenanceRequest, Event, Bill, Admin, Parking, Facility, InfrastructureMaintenance } from "@/types/database";

// Create a connection pool using environment variables.
// If any environment variable is missing, it falls back to default values.
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD, // Consider providing a default if applicable
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Generic helper function to execute SQL queries
export async function query<T>(sql: string, params: any[] = []): Promise<T> {
  try {
    const [results] = await pool.execute(sql, params);
    return results as T;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

/* ===================== Resident-related queries ===================== */

export async function getResidents(): Promise<Resident[]> {
  return query<Resident[]>("SELECT * FROM residents ORDER BY created_at DESC");
}

export async function getResidentById(id: number): Promise<Resident | undefined> {
  const results = await query<Resident[]>("SELECT * FROM residents WHERE resident_id = ?", [id]);
  return results[0];
}

export async function createResident(
  data: Omit<Resident, "resident_id" | "created_at">
): Promise<mysql.ResultSetHeader> {
  const { name, email, phone, address } = data;
  return query<mysql.ResultSetHeader>(
    "INSERT INTO residents (name, email, phone, address) VALUES (?, ?, ?, ?)",
    [name, email, phone, address]
  );
}

/* ===================== Property-related queries ===================== */

export async function getProperties(): Promise<Property[]> {
  return query<Property[]>(`
    SELECT p.*, r.name as resident_name 
    FROM properties p 
    JOIN residents r ON p.resident_id = r.resident_id 
    ORDER BY p.created_at DESC
  `);
}

export async function getPropertyById(id: number): Promise<Property | undefined> {
  const results = await query<Property[]>(
    `
    SELECT p.*, r.name as resident_name 
    FROM properties p 
    JOIN residents r ON p.resident_id = r.resident_id 
    WHERE p.property_id = ?
  `,
    [id]
  );
  return results[0];
}

export async function getPropertiesByResidentId(residentId: number): Promise<Property[]> {
  return query<Property[]>("SELECT * FROM properties WHERE resident_id = ?", [residentId]);
}

/* ===================== Payment-related queries ===================== */

export async function getPayments(): Promise<Payment[]> {
  return query<Payment[]>(`
    SELECT p.*, r.name as resident_name 
    FROM payments p 
    JOIN residents r ON p.resident_id = r.resident_id 
    ORDER BY p.created_at DESC
  `);
}

export async function getPaymentsByResidentId(residentId: number): Promise<Payment[]> {
  return query<Payment[]>("SELECT * FROM payments WHERE resident_id = ?", [residentId]);
}

/* ===================== Maintenance-related queries ===================== */

export async function getMaintenanceRequests(): Promise<MaintenanceRequest[]> {
  return query<MaintenanceRequest[]>(`
    SELECT m.*, r.name as resident_name 
    FROM maintenance_requests m 
    JOIN residents r ON m.resident_id = r.resident_id 
    ORDER BY m.created_at DESC
  `);
}

export async function getMaintenanceRequestsByResidentId(residentId: number): Promise<MaintenanceRequest[]> {
  return query<MaintenanceRequest[]>("SELECT * FROM maintenance_requests WHERE resident_id = ?", [residentId]);
}

/* ===================== Event-related queries ===================== */

export async function getEvents(): Promise<Event[]> {
  return query<Event[]>("SELECT * FROM events ORDER BY event_date DESC");
}

export async function getEventById(id: number): Promise<Event | undefined> {
  const results = await query<Event[]>("SELECT * FROM events WHERE event_id = ?", [id]);
  return results[0];
}

/* ===================== Bill-related queries ===================== */

export async function getBills(): Promise<Bill[]> {
  return query<Bill[]>(`
    SELECT b.*, r.name as resident_name 
    FROM bills b 
    JOIN residents r ON b.resident_id = r.resident_id 
    ORDER BY b.due_date ASC
  `);
}

export async function getBillsByResidentId(residentId: number): Promise<Bill[]> {
  return query<Bill[]>("SELECT * FROM bills WHERE resident_id = ? ORDER BY due_date ASC", [residentId]);
}

/* ===================== Admin-related queries ===================== */

export async function getAdmins(): Promise<Admin[]> {
  return query<Admin[]>("SELECT * FROM admins ORDER BY created_at DESC");
}

export async function createAdmin(data: Omit<Admin, "admin_id" | "created_at">): Promise<mysql.ResultSetHeader> {
  const { name, email, password_hash } = data;
  return query<mysql.ResultSetHeader>(
    "INSERT INTO admins (name, email, password_hash) VALUES (?, ?, ?)",
    [name, email, password_hash]
  );
}

export async function updateAdmin(id: number, data: Partial<Admin>): Promise<mysql.ResultSetHeader> {
  const updates = Object.entries(data)
    .filter(([key]) => key !== "admin_id" && key !== "created_at")
    .map(([key]) => `${key} = ?`)
    .join(", ");
  const values = [
    ...Object.entries(data)
      .filter(([key]) => key !== "admin_id" && key !== "created_at")
      .map(([, value]) => value),
    id,
  ];
  
  return query<mysql.ResultSetHeader>(
    `UPDATE admins SET ${updates} WHERE admin_id = ?`,
    values
  );
}

/* ===================== Extended Property queries ===================== */

export async function createProperty(
  data: Omit<Property, "property_id" | "created_at">
): Promise<mysql.ResultSetHeader> {
  const { resident_id, address, property_type } = data;
  return query<mysql.ResultSetHeader>(
    "INSERT INTO properties (resident_id, address, property_type) VALUES (?, ?, ?)",
    [resident_id, address, property_type]
  );
}

export async function updateProperty(id: number, data: Partial<Property>): Promise<mysql.ResultSetHeader> {
  const updates = Object.entries(data)
    .filter(([key]) => key !== "property_id" && key !== "created_at")
    .map(([key]) => `${key} = ?`)
    .join(", ");
  const values = [
    ...Object.entries(data)
      .filter(([key]) => key !== "property_id" && key !== "created_at")
      .map(([, value]) => value),
    id,
  ];
  
  return query<mysql.ResultSetHeader>(
    `UPDATE properties SET ${updates} WHERE property_id = ?`,
    values
  );
}

export async function deleteProperty(id: number): Promise<mysql.ResultSetHeader> {
  return query<mysql.ResultSetHeader>("DELETE FROM properties WHERE property_id = ?", [id]);
}

/* ===================== Parking-related queries ===================== */

export async function getParkingSpots(): Promise<Parking[]> {
  return query<Parking[]>(`
    SELECT p.*, r.name as resident_name 
    FROM parking p 
    JOIN residents r ON p.resident_id = r.resident_id 
    ORDER BY p.created_at DESC
  `);
}

export async function createParkingBooking(
  data: Omit<Parking, "parking_id" | "created_at">
): Promise<mysql.ResultSetHeader> {
  const { resident_id, spot_number, booking_date, status } = data;
  return query<mysql.ResultSetHeader>(
    "INSERT INTO parking (resident_id, spot_number, booking_date, status) VALUES (?, ?, ?, ?)",
    [resident_id, spot_number, booking_date, status]
  );
}

/* ===================== Facilities-related queries ===================== */

export async function getFacilities(): Promise<Facility[]> {
  return query<Facility[]>(`
    SELECT f.*, r.name as resident_name 
    FROM facilities f 
    JOIN residents r ON f.resident_id = r.resident_id 
    ORDER BY f.created_at DESC
  `);
}

export async function createFacilityBooking(
  data: Omit<Facility, "facility_id" | "created_at">
): Promise<mysql.ResultSetHeader> {
  const { resident_id, facility_name, booking_date, status } = data;
  return query<mysql.ResultSetHeader>(
    "INSERT INTO facilities (resident_id, facility_name, booking_date, status) VALUES (?, ?, ?, ?)",
    [resident_id, facility_name, booking_date, status]
  );
}

/* ===================== Infrastructure Maintenance queries ===================== */

export async function getInfrastructureMaintenance(): Promise<InfrastructureMaintenance[]> {
  return query<InfrastructureMaintenance[]>(`
    SELECT im.*, a.name as admin_name 
    FROM infrastructure_maintenance im 
    JOIN admins a ON im.admin_id = a.admin_id 
    ORDER BY im.created_at DESC
  `);
}

/* ===================== Generic delete function ===================== */

// Note: When using a generic delete function that dynamically sets the table and ID field,
// ensure that you trust the inputs, as this approach might be vulnerable to SQL injection
// if the table or field names come from user input. Consider whitelisting allowed values.
export async function deleteRecord(
  table: string,
  idField: string,
  id: number
): Promise<mysql.ResultSetHeader> {
  return query<mysql.ResultSetHeader>(`DELETE FROM ${table} WHERE ${idField} = ?`, [id]);
}
