// import { redirect } from 'next/navigation'

// export default function Home() {
//   redirect('/login-page')
// }

import { Suspense } from 'react'
import Link from 'next/link'
import { getUser } from './actions/auth'
import { RegisterForm } from './components/RegisterForm'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default async function Home() {
  const user = await getUser()

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Welcome, {user.email}!</CardTitle>
            <CardDescription>You are logged in.</CardDescription>
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
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <RegisterForm />
          </Suspense>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/login" className="text-sm text-gray-600 hover:underline">
            Already have an account? Login here
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

