# O‘ZMETKOMBINAT — Digital Business Card

Executive NFC / QR digital card for **Abdullayev Baxodir Tojimirzayevich**, Boshqaruv raisi – Bosh Direktori of “O‘ZMETKOMBINAT” AJ.

## Develop

```bash
npm install
npm run dev
```

Public card: `http://localhost:5173`  
Admin CMS: `http://localhost:5173/admin`

## Admin

Protected at `/admin`. Credentials come from environment variables:

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-password
ADMIN_SECRET=long-random-string
```

Copy `.env.example` to `.env` for local development.

Content is stored as JSON:
- Local: `data/content.json` (+ synced `public/content.json`)
- Production: Netlify Blobs (no Supabase / external database)

## Build

```bash
npm run build
npm run preview
```
