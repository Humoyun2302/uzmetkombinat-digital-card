import { getStore } from '@netlify/blobs'
import defaultContent from '../../shared/default-content.json'
import { getBearerToken, verifyAdminToken } from '../../shared/auth.ts'

const STORE_NAME = 'card-cms'
const CONTENT_KEY = 'content'

async function readContent() {
  try {
    const store = getStore(STORE_NAME)
    const value = await store.get(CONTENT_KEY, { type: 'json' })
    if (value) return value
  } catch {
    // Fall back to bundled defaults
  }
  return defaultContent
}

async function writeContent(content) {
  const store = getStore(STORE_NAME)
  await store.setJSON(CONTENT_KEY, content)
  return content
}

export default async (req) => {
  if (req.method === 'GET') {
    const content = await readContent()
    return Response.json(content, {
      headers: { 'Cache-Control': 'no-store' },
    })
  }

  if (req.method === 'PUT') {
    const token = getBearerToken(req.headers.get('authorization'))
    if (!verifyAdminToken(token)) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return Response.json({ error: 'Invalid content payload' }, { status: 400 })
    }

    const saved = await writeContent(body)
    return Response.json(saved, {
      headers: { 'Cache-Control': 'no-store' },
    })
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}
