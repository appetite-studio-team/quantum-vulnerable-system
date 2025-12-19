# Quantum Vulnerability Tracking System

A Next.js 15 application for tracking and managing cryptographic systems vulnerable to quantum computing attacks. This is a Directus CMS-backed platform where the frontend displays verified vulnerabilities and handles public submissions, while Directus manages all data, admin reviews, and publishing workflows.

## Features

- **Landing Page**: Technical overview with quantum threat information (Shor's and Grover's algorithms)
- **Public Dashboard**: Browse and search verified quantum vulnerabilities with modal details
- **Vulnerability Submissions**: Community-driven submission system with pending status
- **Admin Review System**: Managed via Directus CMS dashboard (no frontend authentication needed)
- **Risk Assessment**: Color-coded severity indicators (Critical/High/Medium/Low) with 0-10 scores
- **Responsive Design**: Fully responsive across all device sizes
- **Performance Optimized**: Font optimization, image optimization, compression, and SWC minification

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Directus CMS (headless)
- **SDK**: @directus/sdk
- **Fonts**: Montserrat & Geist Mono (optimized with next/font)
- **Icons**: SVG-based components
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Directus instance (see SETUP.md for configuration)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/appetite-studio-team/quantum-vulnerable-system.git
cd quantum-vulnerable-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your Directus URL
# NEXT_PUBLIC_DIRECTUS_URL=your_directus_url
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Directus Setup

See [SETUP.md](./SETUP.md) for detailed Directus configuration instructions, including collection schema and admin workflow.

## Project Structure

```
quantum-vulnerable-system/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx        # Vulnerability browser with search and modal
│   │   └── layout.tsx      # Dashboard layout with Navbar
│   ├── submit/
│   │   ├── page.tsx        # Public submission form
│   │   └── layout.tsx      # Submit layout with Navbar
│   ├── layout.tsx          # Root layout with metadata and fonts
│   ├── page.tsx            # Landing page with quantum threat overview
│   └── globals.css         # Global styles and Tailwind configuration
├── components/
│   ├── ui/
│   │   ├── Button.tsx      # Reusable button with variants and sizes
│   │   ├── Input.tsx       # Form input component
│   │   ├── Select.tsx      # Dropdown select component
│   │   └── Textarea.tsx    # Multi-line text input
│   ├── Logo.tsx            # SVG quantum atom icon
│   ├── Navbar.tsx          # Client component with active route highlighting
│   └── VulnerabilityCard.tsx # Vulnerability display card
├── lib/
│   ├── directus.ts         # Directus client, types, and API functions
│   └── data.ts             # Utility functions (color helpers)
├── public/                 # Static assets (header image, etc.)
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── SETUP.md                # Directus setup guide
└── WARP.md                 # WARP agent development guide
```

## Pages & Routes

### Landing Page (`/`)
- Hero section with header image and call-to-action buttons
- Key metrics display (24+ vulnerabilities, RSA/ECC/DH at risk, ~10 years to Q-Day)
- Technical overview of quantum threats (Shor's and Grover's algorithms)
- Community workflow explanation
- Footer with GitHub link

### Dashboard (`/dashboard`)
- Search and filter verified vulnerabilities
- Vulnerability cards with color-coded severity levels
- Modal view for detailed vulnerability information
- Only displays vulnerabilities with `verified` status from Directus

### Submit Page (`/submit`)
- Public submission form for new vulnerabilities
- Fields: name, description, organization, vulnerability level, score, affected protocols, mitigation strategies
- Submissions saved as `pending` status in Directus
- Success/error feedback to users

### Admin Review
- Managed entirely in Directus CMS dashboard (not in frontend)
- Admins review pending submissions and change status to `verified` for publication
- No authentication needed in the Next.js app

## Data Model

The core data structure is `VulnerableSystem` (stored in Directus `vulnerable_systems` collection):

- **Metadata**: name, description, organization
- **Risk Assessment**: vulnerability_level (critical/high/medium/low), score (0-10)
- **Protocol Information**: affected_protocols (array of strings)
- **Status**: verified/pending/under-review
- **Mitigation**: strategies (optional text field)
- **Discovery**: date (auto-generated timestamp)

API functions in `lib/directus.ts`:
- `fetchVulnerabilities()` - Fetches verified vulnerabilities (client-side)
- `submitVulnerability()` - Creates pending submissions (client-side)

## Workflow

1. **Public Submission**: Users submit vulnerabilities via `/submit` → saved as `pending` in Directus
2. **Admin Review**: Admins review submissions in Directus dashboard (not in frontend)
3. **Publication**: Admin changes status to `verified` → appears on website dashboard

No backend authentication is needed in the frontend - all admin functionality is handled in Directus.

## Future Enhancements

- [ ] Advanced search filters (by protocol, severity, organization)
- [ ] Export functionality (CSV/JSON)
- [ ] Email notifications for submission status
- [ ] Analytics dashboard with charts
- [ ] Public API documentation
- [ ] RSS feed for new vulnerabilities
- [ ] Integration with CVE databases

## Performance Optimizations

- Font optimization with `next/font`
- Automatic image optimization
- SWC-based minification
- Compression enabled
- Console removal in production
- React Strict Mode enabled

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## License

MIT License
