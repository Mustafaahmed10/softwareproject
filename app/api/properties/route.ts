import { NextResponse } from "next/server"
import { getProperties, getPropertiesByResidentId } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const residentId = searchParams.get("residentId")

    let properties

    if (residentId) {
      // If a resident is requesting their own properties
      if (session.user.role === "resident" && session.user.id !== residentId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      properties = await getPropertiesByResidentId(Number(residentId))
    } else {
      // Only admins can view all properties
      if (session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      properties = await getProperties()
    }

    return NextResponse.json(properties)
  } catch (error) {
    console.error("Error fetching properties:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

