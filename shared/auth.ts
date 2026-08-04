import { createHmac, timingSafeEqual } from 'node:crypto'

const TOKEN_TTL_MS = 1000 * 60 * 60 * 12

type TokenPayload = {
  sub: string
  exp: number
}

function getCredentials() {
  const username = process.env.ADMIN_USERNAME || 'admin'
  const password = process.env.ADMIN_PASSWORD || ''
  const secret = process.env.ADMIN_SECRET || password || 'dev-secret-change-me'
  return { username, password, secret }
}

function sign(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('base64url')
}

export function createAdminToken(username: string): string {
  const { secret } = getCredentials()
  const payload: TokenPayload = {
    sub: username,
    exp: Date.now() + TOKEN_TTL_MS,
  }
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return `${body}.${sign(body, secret)}`
}

export function verifyAdminToken(token: string | null | undefined): boolean {
  if (!token) return false
  const { secret } = getCredentials()
  const [body, signature] = token.split('.')
  if (!body || !signature) return false

  const expected = sign(body, secret)
  const left = Buffer.from(signature)
  const right = Buffer.from(expected)
  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    return false
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, 'base64url').toString('utf8'),
    ) as TokenPayload
    if (!payload.exp || payload.exp < Date.now()) return false
    return typeof payload.sub === 'string' && payload.sub.length > 0
  } catch {
    return false
  }
}

export function validateCredentials(username: string, password: string) {
  const credentials = getCredentials()
  if (!credentials.password) {
    return { ok: false as const, error: 'Admin password is not configured' }
  }

  const userOk =
    username.length === credentials.username.length &&
    timingSafeEqual(Buffer.from(username), Buffer.from(credentials.username))
  const passOk =
    password.length === credentials.password.length &&
    timingSafeEqual(Buffer.from(password), Buffer.from(credentials.password))

  if (!userOk || !passOk) {
    return { ok: false as const, error: 'Invalid username or password' }
  }

  return { ok: true as const, token: createAdminToken(username) }
}

export function getBearerToken(authHeader: string | null | undefined) {
  if (!authHeader) return null
  const [scheme, token] = authHeader.split(' ')
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null
  return token
}
