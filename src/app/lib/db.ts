import fs from 'fs/promises'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'db.json')

interface User {
  email: string
  password: string
}

async function readDb(): Promise<User[]> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading db.json:', error)
    // If the file doesn't exist, return an empty array
    return []
  }
}

async function writeDb(users: User[]): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2))
}

export async function addUser(email: string, password: string): Promise<void> {
  const users = await readDb()
  users.push({ email, password })
  await writeDb(users)
}

export async function findUser(email: string): Promise<User | undefined> {
  const users = await readDb()
  return users.find(user => user.email === email)
}

