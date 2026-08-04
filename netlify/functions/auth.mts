import {
  getBearerToken,
  validateCredentials,
  verifyAdminToken,
} from '../../shared/auth.ts'

export default async (req) => {
  if (req.method === 'POST') {
    const body = await req.json().catch(() => ({}))
    const result = validateCredentials(
      String(body.username || ''),
      String(body.password || ''),
    )
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 401 })
    }
    return Response.json({ token: result.token })
  }

  if (req.method === 'GET') {
    const token = getBearerToken(req.headers.get('authorization'))
    if (!verifyAdminToken(token)) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return Response.json({ ok: true })
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}
