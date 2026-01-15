"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FaGoogle, FaLinkedin } from "react-icons/fa"
import { MailCheck } from "lucide-react"

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const emailValue = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: emailValue,
          password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setEmail(emailValue)
      } else {
        setError(data.error || "Failed to create account")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {success ? "Check your email" : "Create an account"}
          </CardTitle>
          <CardDescription className="text-center">
            {success
              ? "A verification link has been sent to your email"
              : "Enter your details to create your account"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {success ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <MailCheck className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-700">
                    <p className="font-medium mb-1">Verification email sent!</p>
                    <p>Please check your email at <strong>{email}</strong> and click the verification link to activate your account.</p>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600 text-center">
                <p>The link expires in 24 hours.</p>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>

              <div className="mt-4 flex items-center">
                <Separator className="flex-1" />
                <span className="mx-2 text-xs text-gray-400">OR CONTINUE WITH</span>
                <Separator className="flex-1" />
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="flex-1">
                  <FaGoogle className="mr-2" />
                  Google
                </Button>
                <Button variant="outline" className="flex-1">
                  <FaLinkedin className="mr-2" />
                  LinkedIn
                </Button>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
