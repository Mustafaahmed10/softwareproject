export interface Resident {
  resident_id: number
  name: string
  email: string
  phone: string
  address: string
  created_at: string
}

export interface Property {
  property_id: number
  resident_id: number
  address: string
  property_type: "Apartment" | "House" | "Villa"
  created_at: string
  resident_name?: string
}

export interface Payment {
  payment_id: number
  resident_id: number
  amount: number
  payment_type: "Society Fee" | "Utility Bill" | "Maintenance"
  payment_date: string
  status: "Pending" | "Paid"
  created_at: string
  resident_name?: string
}

export interface Bill {
  bill_id: number
  resident_id: number
  amount: number
  bill_type: "Utility" | "Maintenance"
  due_date: string
  status: "Pending" | "Paid"
  created_at: string
  resident_name?: string
}

export interface MaintenanceRequest {
  request_id: number
  resident_id: number
  description: string
  status: "Pending" | "In Progress" | "Completed"
  created_at: string
  resident_name?: string
}

export interface Event {
  event_id: number
  admin_id: number
  event_name: string
  event_date: string
  description: string
  created_at: string
}

