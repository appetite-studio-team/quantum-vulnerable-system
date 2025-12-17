# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A Next.js 15 dashboard for tracking and managing cryptographic systems vulnerable to quantum computing attacks. Uses TypeScript, Tailwind CSS v4, and the App Router architecture.

**Key Context**: This is a Directus CMS-backed application. The frontend displays vulnerabilities and handles public submissions. Directus manages all data, admin reviews, and publishing. No authentication is needed in the frontend - all admin work happens in Directus dashboard.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### Routing Structure (App Router)
- `/` - Landing page with technical overview and CTAs
- `/dashboard` - Main vulnerability browser with search and modal views
- `/submit` - Public submission form for new vulnerabilities

Each route has its own `page.tsx` and may have a `layout.tsx` for shared UI elements.

### Data Model
The core data structure is `VulnerableSystem` defined in `lib/directus.ts`:
- Vulnerability metadata (name, description, organization)
- Risk assessment (vulnerability_level: critical/high/medium/low, score 0-10)
- Protocol information (affected_protocols array)
- Status tracking (verified/pending/under-review)
- Mitigation strategies (optional)
- Discovery date (auto-generated)

Data is stored in Directus CMS in the `vulnerable_systems` collection. The frontend fetches only verified vulnerabilities via `fetchVulnerabilities()` and submits new ones via `submitVulnerability()`.

### Component Architecture
**UI Components** (`components/ui/`):
- Reusable form elements: Button, Input, Select, Textarea
- All support variant/size props and forward refs
- Styled with Tailwind classes following a purple/gray color scheme

**Feature Components** (`components/`):
- `Navbar` - Client component with active route highlighting via `usePathname()`
- `VulnerabilityCard` - Displays vulnerability information with color-coded severity
- `Logo` - SVG quantum atom icon

### Styling Conventions
- Primary colors: Slate/gray scale for professional, technical feel
- Accent colors: Blue for primary actions, red/orange/yellow/green for severity indicators
- Responsive design with mobile-first Tailwind breakpoints (sm, md, lg)
- Font system: Geist Sans (body) and Geist Mono (code) loaded via next/font
- Clean, minimal design without heavy gradients or marketing fluff
- Color utilities: `getVulnerabilityColor()` and `getStatusColor()` in `lib/data.ts`

### TypeScript Configuration
- Strict mode enabled
- Path alias: `@/*` maps to project root
- Target ES2017 with modern module resolution

## Code Patterns

### Client vs Server Components
- Navigation and interactive elements use `'use client'` directive (e.g., Navbar)
- Pages are server components by default (no directive needed)
- Forms and modals require client-side state, thus must be client components

### Styling Pattern
Components use template literals to combine:
1. Base utility classes
2. Variant-specific classes (from objects/mappings)
3. Size-specific classes
4. Additional className props passed by parent

Example from Button component:
```typescript
className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
```

## Performance Optimizations
- Font optimization with `next/font` (display: swap, preload: true)
- SWC minification enabled
- Console statements removed in production builds
- Image optimization with AVIF/WebP formats
- Compression enabled
- React Strict Mode for development checks

## Directus CMS Integration

The app uses Directus SDK (`@directus/sdk`) for all data operations:

**Setup**:
1. Environment variable: `NEXT_PUBLIC_DIRECTUS_URL`
2. Directus client configured in `lib/directus.ts`
3. Collection name: `vulnerable_systems`

**API Functions**:
- `fetchVulnerabilities()` - Fetches verified vulnerabilities (client-side)
- `submitVulnerability()` - Creates pending submissions (client-side)

**Admin Workflow**:
1. Public submits via `/submit` → saved as `pending` in Directus
2. Admin reviews in Directus dashboard (not in frontend)
3. Admin changes status to `verified` → appears on website

No backend code needed in Next.js - all admin functionality is in Directus.

See SETUP.md for detailed configuration instructions.

## Lint Configuration
Uses Next.js ESLint config with TypeScript rules. Ignores `.next/`, `out/`, `build/`, and `next-env.d.ts`.
