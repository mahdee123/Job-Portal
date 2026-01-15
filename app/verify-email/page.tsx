"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MailCheck, AlertCircle } from "lucide-react"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <MailCheck className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>
            A sign-in link has been sent to<br />
            <strong className="text-gray-700">{email || "your email"}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">Instructions:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Check your email inbox</li>
                  <li>Click the sign-in link</li>
                  <li>You'll be redirected to your dashboard</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 text-center">
            <p>The link expires in 24 hours.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <p className="text-sm text-gray-500 text-center">
            Didn&apos;t receive the email? Check your spam folder or{" "}
            <Link href="/signin" className="text-blue-600 hover:underline font-medium">
              try again
            </Link>
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/signin">Back to Sign In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
