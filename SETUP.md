# Quantum Vulnerability Database - Setup Guide

## Overview

This application uses Directus CMS as a headless backend for managing vulnerability data. The frontend is built with Next.js 15 and connects to Directus via the Directus SDK.

## Architecture

- **Frontend**: Next.js 15 (App Router) - Displays vulnerabilities and handles public submissions
- **Backend/CMS**: Directus - Manages data, handles admin reviews, and publishes verified content
- **Data Flow**: 
  1. Public users submit vulnerabilities via the web form
  2. Submissions are saved to Directus with `status: 'pending'`
  3. Admins review and verify submissions in Directus dashboard
  4. When status changes to `verified`, content appears on the public website

## Directus Setup

### 1. Install Directus

```bash
# Using Docker (recommended)
docker pull directus/directus
docker run -d \
  -p 8055:8055 \
  -e KEY=replace-with-random-key \
  -e SECRET=replace-with-random-secret \
  -e DB_CLIENT=sqlite3 \
  -e DB_FILENAME=/directus/database/data.db \
  -e ADMIN_EMAIL=admin@example.com \
  -e ADMIN_PASSWORD=secure-password \
  -v directus_data:/directus/database \
  directus/directus

# Or using npm
npx create-directus-project my-project
```

### 2. Create Collection

In Directus Admin Panel (http://localhost:8055):

1. Go to **Settings** > **Data Model**
2. Create a new collection named `vulnerable_systems`
3. Add the following fields:

| Field Name | Type | Settings |
|------------|------|----------|
| `id` | UUID | Primary Key, Auto-generated |
| `name` | String | Required, Interface: Input, Display: System/Asset name |
| `description` | Text | Required, Interface: Textarea, Display: Technical overview |
| `system_category` | String | Optional, Interface: Input, Example: "Banking", "Healthcare", "IoT" |
| `use_case` | String | Optional, Interface: Input, Example: "Authentication", "Secure transactions" |
| `quantum_risk_level` | String | Required, Interface: Dropdown, Options: quantum-safe, at-risk, quantum-broken |
| `vulnerability_level` | String | Required, Interface: Dropdown, Options: critical, high, medium, low |
| `score` | Float | Required, Min: 0, Max: 10 |
| `weakness_reason` | Text | Required, Interface: Textarea, Display: Short snapshot of exposure |
| `current_cryptography` | JSON | Required, Interface: Tags, Example: ["RSA-2048", "ECC (P-256)"] |
| `affected_protocols` | JSON | Required, Interface: Tags |
| `quantumx_recommendation` | Text | Optional, Interface: Textarea, Display: PQC migration recommendations |
| `mitigation` | Text | Optional, Interface: Textarea |
| `discovered_date` | Timestamp | Auto-generated on create |
| `organization` | String | Required, Interface: Input |
| `status` | String | Required, Default: pending, Interface: Dropdown, Options: verified, pending, under-review |

### 3. Configure Permissions

1. Go to **Settings** > **Roles & Permissions**
2. Click on **Public** role
3. For `vulnerable_systems` collection:
   - **Read**: Enable for items where `status` = `verified`
   - **Create**: Enable (allows public submissions)
   - **Update/Delete**: Disable

### 4. Set Up Admin Review Workflow

Admins can:
1. View all pending submissions in Directus
2. Edit and verify technical details
3. Change status from `pending` to `verified` to publish
4. Change to `under-review` for items needing more research

## Next.js Frontend Setup

### 1. Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Directus URL:

```
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
```

For production, use your Directus instance URL:

```
NEXT_PUBLIC_DIRECTUS_URL=https://your-directus.com
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see the application.

## API Integration

The application uses two main API functions (defined in `lib/directus.ts`):

### Fetch Vulnerabilities

```typescript
import { fetchVulnerabilities } from '@/lib/directus';

const vulnerabilities = await fetchVulnerabilities();
// Returns only verified vulnerabilities, sorted by score and date
```

### Submit Vulnerability

```typescript
import { submitVulnerability } from '@/lib/directus';

const result = await submitVulnerability({
  name: 'RSA-2048',
  description: 'Vulnerable to Shor\'s algorithm...',
  vulnerability_level: 'critical',
  score: 9.5,
  affected_protocols: ['TLS', 'SSH'],
  organization: 'Research Lab',
  mitigation: 'Migrate to post-quantum crypto'
});

if (result.success) {
  // Submission successful
}
```

## Deployment

### Frontend (Vercel/Netlify)

1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Add environment variable: `NEXT_PUBLIC_DIRECTUS_URL`
4. Deploy

### Directus (Cloud/VPS)

Options:
- **Directus Cloud**: https://directus.cloud (easiest)
- **Digital Ocean**: Deploy via App Platform or Droplet
- **AWS/GCP**: Use EC2/Compute Engine with Docker

Make sure to:
1. Use a production database (PostgreSQL/MySQL, not SQLite)
2. Set up proper authentication
3. Configure CORS to allow your frontend domain
4. Enable HTTPS

## Admin Workflow

1. Public user submits vulnerability via `/submit`
2. Submission appears in Directus with status `pending`
3. Admin logs into Directus dashboard
4. Reviews submission for accuracy
5. Edits technical details if needed
6. Changes status to `verified`
7. Vulnerability automatically appears on public website

No backend code needed - everything is managed through Directus!

## Troubleshooting

### CORS Errors

Add your frontend URL to Directus CORS settings:
```
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:3000,https://your-domain.com
```

### Connection Errors

Verify:
1. Directus is running and accessible
2. `NEXT_PUBLIC_DIRECTUS_URL` is correct
3. Network allows connection between frontend and Directus
4. Collection name is exactly `vulnerable_systems`

### No Data Showing

Check:
1. Items exist in Directus with `status: 'verified'`
2. Public role has read permissions for verified items
3. Browser console for any API errors
