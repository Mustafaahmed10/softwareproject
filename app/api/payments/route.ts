import { NextResponse } from "next/server"
import { getPayments, getPaymentsByResidentId } from "@/lib/db"
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

    let payments

    if (residentId) {
      // If a resident is requesting their own payments
      if (session.user.role === "resident" && session.user.id !== residentId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      payments = await getPaymentsByResidentId(Number(residentId))
    } else {
      // Only admins can view all payments
      if (session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      payments = await getPayments()
    }

    return NextResponse.json(payments)
  } catch (error) {
    console.error("Error fetching payments:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

