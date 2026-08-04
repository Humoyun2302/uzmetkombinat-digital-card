import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AdminApp from '@/admin/AdminApp'
import { ContentProvider } from '@/content/ContentContext'
import { LanguageProvider } from '@/i18n/LanguageContext'

const isAdminRoute =
  typeof window !== 'undefined' &&
  window.location.pathname.replace(/\/+$/, '') === '/admin'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdminRoute ? (
      <AdminApp />
    ) : (
      <ContentProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ContentProvider>
    )}
  </StrictMode>,
)
