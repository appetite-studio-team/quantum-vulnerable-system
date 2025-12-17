# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A Next.js 15 dashboard for tracking and managing cryptographic systems vulnerable to quantum computing attacks. Uses TypeScript, Tailwind CSS v4, and the App Router architecture.

**Key Context**: This is currently a frontend-only application with hardcoded data in `lib/data.ts`. Future plans include Directus CMS integration for dynamic data management and JWT-based authentication.

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
- `/` - Landing page with hero section
- `/dashboard` - Main vulnerability browser with filtering and modal views
- `/submit` - Community submission form for new vulnerabilities
- `/admin` - Review interface for pending submissions
- `/auth/login` - Login page (UI only, no backend yet)
- `/auth/register` - Registration page (UI only, no backend yet)

Each route has its own `page.tsx` and may have a `layout.tsx` for shared UI elements.

### Data Model
The core data structure is `VulnerableSystem` defined in `lib/data.ts`:
- Vulnerability metadata (name, description, organization)
- Risk assessment (vulnerabilityLevel: critical/high/medium/low, score 0-10)
- Protocol information (affectedProtocols array)
- Status tracking (verified/pending/under-review)
- Mitigation strategies (optional)

Currently uses hardcoded array `vulnerableSystems` with 10 sample entries. This will be replaced by Directus CMS API calls.

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
- Primary color: Purple (purple-600 as base)
- Secondary colors: Gray scale for text and backgrounds
- Responsive design with mobile-first Tailwind breakpoints (sm, md, lg)
- Font system: Geist Sans (body) and Geist Mono (code) loaded via next/font
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

## Future Development Notes

When implementing Directus CMS integration:
1. Replace `lib/data.ts` hardcoded array with API calls
2. Use Next.js API routes (`app/api/`) or server actions for data fetching
3. Implement proper error handling and loading states
4. Add revalidation strategies (ISR or on-demand)

When adding authentication:
1. Implement JWT-based auth system
2. Protect `/admin` route with middleware
3. Connect login/register pages to auth API
4. Add role-based access control (public, user, admin)

## Lint Configuration
Uses Next.js ESLint config with TypeScript rules. Ignores `.next/`, `out/`, `build/`, and `next-env.d.ts`.
