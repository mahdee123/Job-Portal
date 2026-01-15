"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FaGoogle, FaLinkedin } from "react-icons/fa"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Check URL parameters for messages
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const verified = urlParams.get("verified")
    const errorParam = urlParams.get("error")

    if (verified === "true") {
      setSuccess("Email verified successfully! You can now sign in.")
    }

    if (errorParam) {
      switch (errorParam) {
        case "invalid-verification-link":
          setError("Invalid verification link.")
          break
        case "invalid-or-expired-token":
          setError("Verification link is invalid or has expired.")
          break
        case "expired-token":
          setError("Verification link has expired. Please request a new one.")
          break
        case "verification-failed":
          setError("Email verification failed. Please try again.")
          break
        default:
          setError("An error occurred during verification.")
      }
    }
  }, [])

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // First check if user exists and is verified
      const checkResponse = await fetch("/api/auth/check-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const checkData = await checkResponse.json()

      if (!checkResponse.ok) {
        setError(checkData.error || "Unable to verify account status")
        setIsLoading(false)
        return
      }

      if (!checkData.verified) {
        setError("Your email address is not verified. Please check your email for a verification link or sign up again.")
        setIsLoading(false)
        return
      }

      // User is verified, proceed with sign in
      const result = await signIn("email", {
        email,
        redirect: false,
        callbackUrl: "/dashboard",
      })

      if (result?.error) {
        setError("Failed to send verification email. Please try again.")
      } else if (result?.ok) {
        // Email sent successfully
        window.location.href = `/verify-email?email=${encodeURIComponent(email)}`
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: "/dashboard" })
    } catch (err) {
      setError("Failed to sign in with Google")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">Enter your email to get a sign in link</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
              {success}
            </div>
          )}
          
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending link..." : "Send sign in link"}
            </Button>
          </form>

          <div className="mt-4 flex items-center">
            <Separator className="flex-1" />
            <span className="mx-2 text-xs text-gray-400">OR CONTINUE WITH</span>
            <Separator className="flex-1" />
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <FaGoogle className="mr-2" />
              Google
            </Button>
            <Button variant="outline" className="flex-1" disabled>
              <FaLinkedin className="mr-2" />
              LinkedIn
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
