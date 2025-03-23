import { NextResponse } from "next/server"
import { getResidents, createResident } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const residents = await getResidents()
    return NextResponse.json(residents)
  } catch (error) {
    console.error("Error fetching residents:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await createResident(data)
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error("Error creating resident:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

