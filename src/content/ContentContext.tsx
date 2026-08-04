import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { fetchContent } from '@/content/api'
import { cloneContent, defaultContent } from '@/content/defaults'
import type { CardContent } from '@/content/types'

type ContentContextValue = {
  content: CardContent
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  setContent: (content: CardContent) => void
}

const ContentContext = createContext<ContentContextValue | null>(null)

type ContentProviderProps = {
  children: ReactNode
  /** When provided, skips network fetch and uses this snapshot (admin preview). */
  value?: CardContent
}

export function ContentProvider({ children, value }: ContentProviderProps) {
  const [content, setContentState] = useState<CardContent>(
    () => value ?? cloneContent(defaultContent),
  )
  const [loading, setLoading] = useState(!value)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (value) {
      setContentState(value)
      setLoading(false)
      setError(null)
    }
  }, [value])

  const refresh = useCallback(async () => {
    if (value) return
    setLoading(true)
    setError(null)
    try {
      const next = await fetchContent()
      setContentState(next)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content')
      setContentState(cloneContent(defaultContent))
    } finally {
      setLoading(false)
    }
  }, [value])

  useEffect(() => {
    if (!value) {
      void refresh()
    }
  }, [refresh, value])

  const setContent = useCallback((next: CardContent) => {
    setContentState(next)
  }, [])

  const contextValue = useMemo(
    () => ({
      content,
      loading,
      error,
      refresh,
      setContent,
    }),
    [content, loading, error, refresh, setContent],
  )

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within ContentProvider')
  }
  return context
}
