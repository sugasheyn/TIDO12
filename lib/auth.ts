interface User {
  id: string
  email: string
  role: 'user' | 'admin' | 'moderator'
  permissions: string[]
}

interface AuthResult {
  isAuthenticated: boolean
  user?: User
  error?: string
}

// Simple in-memory user store (in production, use a database)
const users = new Map<string, User>([
  ['user1', { id: 'user1', email: 'user@example.com', role: 'user', permissions: ['read:claims', 'create:claims'] }],
  ['admin1', { id: 'admin1', email: 'admin@example.com', role: 'admin', permissions: ['read:claims', 'create:claims', 'moderate:claims', 'delete:claims'] }],
  ['mod1', { id: 'mod1', email: 'mod@example.com', role: 'moderator', permissions: ['read:claims', 'moderate:claims'] }]
])

// Simple token validation (in production, use JWT)
const tokens = new Map<string, string>([
  ['user1-token', 'user1'],
  ['admin1-token', 'admin1'],
  ['mod1-token', 'mod1']
])

export function authenticateUser(authHeader?: string): AuthResult {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { isAuthenticated: false, error: 'Missing or invalid authorization header' }
  }

  const token = authHeader.substring(7)
  const userId = tokens.get(token)
  
  if (!userId) {
    return { isAuthenticated: false, error: 'Invalid token' }
  }

  const user = users.get(userId)
  if (!user) {
    return { isAuthenticated: false, error: 'User not found' }
  }

  return { isAuthenticated: true, user }
}

export function hasPermission(user: User, permission: string): boolean {
  return user.permissions.includes(permission)
}

export function requireAuth(authHeader?: string): User {
  const result = authenticateUser(authHeader)
  if (!result.isAuthenticated) {
    throw new Error(result.error || 'Authentication required')
  }
  return result.user!
}

export function requireRole(user: User, role: string): void {
  if (user.role !== role && user.role !== 'admin') {
    throw new Error(`Role '${role}' required`)
  }
}
