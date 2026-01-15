import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const verifyEmailSchema = z.object({
  token: z.string().min(1, "Token is required"),
  email: z.string().email("Invalid email address"),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")
    const email = searchParams.get("email")

    if (!token || !email) {
      return NextResponse.redirect(new URL("/signin?error=invalid-verification-link", request.url))
    }

    // Verify the token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
    })

    if (!verificationToken) {
      return NextResponse.redirect(new URL("/signin?error=invalid-or-expired-token", request.url))
    }

    if (verificationToken.expires < new Date()) {
      return NextResponse.redirect(new URL("/signin?error=expired-token", request.url))
    }

    // Update user email verification status
    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    })

    // Delete the used token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
    })

    // Redirect to sign-in success page or auto-sign-in
    return NextResponse.redirect(new URL("/signin?verified=true", request.url))
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.redirect(new URL("/signin?error=verification-failed", request.url))
  }
}