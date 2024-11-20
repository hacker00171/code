// app/api/data.ts
interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

export const users: User[] = [
  { id: 1, username: "user1", password: "pass1", role: "Bytenova admin" },
  { id: 2, username: "user2", password: "pass2", role: "client admin" },
];

export function verifyUser(
  username: string,
  password: string
): Omit<User, "password"> | null {
  const timestamp = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  // Server-side logging of login attempt in cyan
  console.log('\x1b[36m%s\x1b[0m', `[${timestamp}] Login attempt for username: ${username}`);

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Log successful login in green
    console.log('\x1b[32m%s\x1b[0m', `[${timestamp}] Login successful:`, {
      username: user.username,
      role: user.role,
      time: timestamp
    });
    return { id: user.id, username: user.username, role: user.role };
  } else {
    // Log failed login in red
    console.log('\x1b[31m%s\x1b[0m', `[${timestamp}] Login failed: Invalid credentials for username: ${username}`);
    return null;
  }
}
