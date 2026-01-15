import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import nodemailer from "nodemailer"

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

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
        secure: process.env.EMAIL_SERVER_PORT === "465",
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier: email, url, provider, theme }) {
        const { host } = new URL(url)
        const result = await transporter.sendMail({
          to: email,
          from: `"Job Portal" <${process.env.EMAIL_FROM}>`,
          subject: `Sign in to Job Portal`,
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
                    <p>Hello,</p>
                    <p>Click the button below to sign in to your Job Portal account:</p>
                    <a href="${url}" class="button">Sign In</a>
                    <p>Or copy and paste this link in your browser:</p>
                    <p style="word-break: break-all; color: #667eea;">
                      <a href="${url}">${url}</a>
                    </p>
                    <p>This link expires in 24 hours.</p>
                    <p style="color: #999; font-size: 14px; margin-top: 30px;">
                      If you didn't request this email, you can safely ignore it.
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
        return result
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    verifyRequest: "/verify-email",
    newUser: "/signup",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`User ${user.email} signed in via ${account?.provider}`)
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
})

export { handler as GET, handler as POST }
