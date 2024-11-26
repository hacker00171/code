import { Suspense } from 'react'
import Link from 'next/link'
import { getUser } from '../actions/auth'
import { LoginForm } from '../components/LoginForm'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default async function LoginPage() {
  const user = await getUser()

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Already Logged In</CardTitle>
            <CardDescription>You are already logged in as {user.email}.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard">
              <Button className="w-full">Go to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/" className="text-sm text-gray-600 hover:underline">
            Don&apos;t have an account? Register here
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

