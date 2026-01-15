import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">AI Job Finder</h1>
          <p className="mt-2 text-gray-600">Find your perfect job match with AI</p>
        </div>

        <div className="flex flex-col space-y-4">
          <Button asChild className="h-12 bg-blue-600 hover:bg-blue-700">
            <Link href="/signup">Create an Account</Link>
          </Button>

          <Button asChild variant="outline" className="h-12">
            <Link href="/signin">Sign In</Link>
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Powered by advanced AI to match your skills with the perfect job</p>
        </div>
      </div>
    </div>
  )
}
