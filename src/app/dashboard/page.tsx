import { getUser, logout } from '../actions/auth'
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default async function Dashboard() {
  const user = await getUser()

  if (!user) {
    redirect('/')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard, {user.email}!</h1>
      <form action={async () => {
        'use server'
        await logout();
      }}>
        <Button type="submit">Logout</Button>
      </form>
    </div>
  )
}

