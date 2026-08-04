import fs from 'node:fs'
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import {
  getBearerToken,
  validateCredentials,
  verifyAdminToken,
} from './shared/auth.ts'

function readJson(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath: string, data: unknown) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

async function readBody(req: IncomingMessage) {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  if (!chunks.length) return {}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

export function adminApiPlugin(rootDir: string): Plugin {
  const dataFile = path.join(rootDir, 'data', 'content.json')
  const publicFile = path.join(rootDir, 'public', 'content.json')
  const defaultFile = path.join(rootDir, 'shared', 'default-content.json')

  const readContent = () => {
    if (fs.existsSync(dataFile)) return readJson(dataFile)
    if (fs.existsSync(publicFile)) return readJson(publicFile)
    return readJson(defaultFile)
  }

  const saveContent = (content: unknown) => {
    writeJson(dataFile, content)
    writeJson(publicFile, content)
    return content
  }

  return {
    name: 'admin-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0] || ''

        if (url === '/api/auth') {
          try {
            if (req.method === 'POST') {
              const body = (await readBody(req)) as {
                username?: string
                password?: string
              }
              const result = validateCredentials(
                String(body.username || ''),
                String(body.password || ''),
              )
              if (!result.ok) {
                sendJson(res, 401, { error: result.error })
                return
              }
              sendJson(res, 200, { token: result.token })
              return
            }

            if (req.method === 'GET') {
              const token = getBearerToken(
                typeof req.headers.authorization === 'string'
                  ? req.headers.authorization
                  : null,
              )
              if (!verifyAdminToken(token)) {
                sendJson(res, 401, { error: 'Unauthorized' })
                return
              }
              sendJson(res, 200, { ok: true })
              return
            }

            sendJson(res, 405, { error: 'Method not allowed' })
            return
          } catch (error) {
            sendJson(res, 500, {
              error: error instanceof Error ? error.message : 'Auth error',
            })
            return
          }
        }

        if (url === '/api/content') {
          try {
            if (req.method === 'GET') {
              sendJson(res, 200, readContent())
              return
            }

            if (req.method === 'PUT') {
              const token = getBearerToken(
                typeof req.headers.authorization === 'string'
                  ? req.headers.authorization
                  : null,
              )
              if (!verifyAdminToken(token)) {
                sendJson(res, 401, { error: 'Unauthorized' })
                return
              }
              const body = await readBody(req)
              sendJson(res, 200, saveContent(body))
              return
            }

            sendJson(res, 405, { error: 'Method not allowed' })
            return
          } catch (error) {
            sendJson(res, 500, {
              error: error instanceof Error ? error.message : 'Content error',
            })
            return
          }
        }

        next()
      })
    },
  }
}
