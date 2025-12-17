# Quantum Vulnerability Tracking System

A modern, performant dashboard for tracking and managing cryptographic systems vulnerable to quantum computing attacks. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Public Dashboard**: Browse and search quantum vulnerabilities with detailed information
- **Vulnerability Submissions**: Community-driven submission system for new vulnerabilities
- **Admin Review System**: Comprehensive review interface for managing submissions
- **Authentication UI**: Complete login and registration pages
- **Responsive Design**: Fully responsive across all device sizes
- **Performance Optimized**: Fast loading times with Next.js optimizations

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Geist Sans & Geist Mono (optimized with next/font)
- **Icons**: SVG-based components

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
quantum-dashboard/
├── app/
│   ├── auth/
│   │   ├── login/          # Login page
│   │   └── register/       # Registration page
│   ├── dashboard/          # Main dashboard
│   ├── submit/             # Vulnerability submission form
│   ├── admin/              # Admin review interface
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── Textarea.tsx
│   ├── Logo.tsx            # Logo component
│   ├── Navbar.tsx          # Navigation bar
│   └── VulnerabilityCard.tsx
├── lib/
│   └── data.ts             # Hardcoded data (to be replaced with Directus CMS)
└── public/                 # Static assets
```

## Pages

### Landing Page (`/`)
- Hero section with call-to-action
- Feature showcase
- Quick navigation to dashboard and authentication

### Dashboard (`/dashboard`)
- Filterable list of vulnerabilities
- Vulnerability cards with detailed information
- Modal view for individual vulnerabilities
- Statistics overview

### Submit Page (`/submit`)
- Form for submitting new vulnerabilities
- Validation and user feedback
- Success confirmation

### Admin Page (`/admin`)
- Review pending submissions
- Approve or reject submissions
- Statistics dashboard

### Authentication
- `/auth/login` - Login page
- `/auth/register` - Registration page

## Future Enhancements

- [ ] Integration with Directus CMS for dynamic data
- [ ] User authentication with JWT
- [ ] Role-based access control
- [ ] Search and advanced filtering
- [ ] Export functionality
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] API documentation

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
