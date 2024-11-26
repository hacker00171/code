'use server'

import { cookies } from 'next/headers'
import { addUser, findUser } from '../lib/db'

export async function register(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const existingUser = await findUser(email)
  if (existingUser) {
    return { error: 'User already exists' }
  }

  await addUser(email, password)
  return { success: true }
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const user = await findUser(email)
  if (!user || user.password !== password) {
    return { error: 'Invalid credentials' }
  }

  const cookieStore = await cookies()
  cookieStore.set('user', email, { httpOnly: true, secure: true })
  return { success: true }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('user')
  return { success: true }
}

export async function getUser() {
  const cookieStore = await cookies()
  const user = cookieStore.get('user')
  return user ? { email: user.value } : null
}

