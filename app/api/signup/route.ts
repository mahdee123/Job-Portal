import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { randomBytes } from "crypto"
import nodemailer from "nodemailer"

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  secure: process.env.EMAIL_SERVER_PORT === "465",
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = signUpSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: null, // Will be set when email is verified
      },
    })

    // Generate verification token
    const token = randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Save verification token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    })

    // Send verification email
    const verificationUrl = `${process.env.NEXTAUTH_URL}/api/verify-email?token=${token}&email=${encodeURIComponent(email)}`

    await transporter.sendMail({
      to: email,
      from: `"Job Portal" <${process.env.EMAIL_FROM}>`,
      subject: `Verify your Job Portal account`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { padding: 30px; background-color: #f9f9f9; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome to Job Portal</h1>
              </div>
              <div class="content">
                <p>Hello ${name},</p>
                <p>Thank you for signing up! Please click the button below to verify your email address:</p>
                <a href="${verificationUrl}" class="button">Verify Email</a>
                <p>Or copy and paste this link in your browser:</p>
                <p style="word-break: break-all; color: #667eea;">
                  <a href="${verificationUrl}">${verificationUrl}</a>
                </p>
                <p>This link expires in 24 hours.</p>
                <p style="color: #999; font-size: 14px; margin-top: 30px;">
                  If you didn't create this account, you can safely ignore this email.
                </p>
              </div>
              <div class="footer">
                <p>&copy; 2026 Job Portal. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    return NextResponse.json({
      message: "User created successfully. Please check your email to verify your account.",
      userId: user.id,
    })
  } catch (error) {
    console.error("Sign up error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}