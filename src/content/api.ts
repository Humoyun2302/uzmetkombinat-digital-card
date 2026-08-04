import { normalizeContent } from '@/content/defaults'
import type { CardContent } from '@/content/types'

const AUTH_STORAGE_KEY = 'umk_admin_token'

export async function fetchContent(): Promise<CardContent> {
  try {
    const response = await fetch('/api/content', { cache: 'no-store' })
    if (response.ok) {
      return normalizeContent(await response.json())
    }
  } catch {
    // Fall through to static JSON
  }

  const fallback = await fetch('/content.json', { cache: 'no-store' })
  if (!fallback.ok) {
    throw new Error('Unable to load card content')
  }
  return normalizeContent(await fallback.json())
}

export async function saveContent(
  content: CardContent,
  token: string,
): Promise<CardContent> {
  const response = await fetch('/api/content', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(content),
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      error?: string
    } | null
    throw new Error(payload?.error || 'Failed to save content')
  }

  return normalizeContent(await response.json())
}

export async function loginAdmin(
  username: string,
  password: string,
): Promise<string> {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      error?: string
    } | null
    throw new Error(payload?.error || 'Invalid credentials')
  }

  const data = (await response.json()) as { token: string }
  return data.token
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  const response = await fetch('/api/auth', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.ok
}

export function readStoredToken(): string | null {
  try {
    return localStorage.getItem(AUTH_STORAGE_KEY)
  } catch {
    return null
  }
}

export function storeToken(token: string) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, token)
  } catch {
    // Ignore
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  } catch {
    // Ignore
  }
}
