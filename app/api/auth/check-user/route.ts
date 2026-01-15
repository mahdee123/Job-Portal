import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const checkUserSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = checkUserSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        emailVerified: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email address. Please sign up first." },
        { status: 404 }
      )
    }

    return NextResponse.json({
      verified: !!user.emailVerified,
      userId: user.id,
    })
  } catch (error) {
    console.error("Check user error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}