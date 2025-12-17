import Link from 'next/link';
import Logo from '@/components/Logo';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logo className="w-10 h-10 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">Quantum Vulnerabilities</span>
          </div>
          <Link href="/auth/login">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center pt-20 pb-16">
          <div className="flex justify-center mb-8">
            <Logo className="w-24 h-24 text-purple-600" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Quantum Vulnerability
            <br />
            <span className="text-purple-600">Tracking System</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            A comprehensive database tracking cryptographic systems and protocols vulnerable to quantum computing attacks.
            Monitor, submit, and review quantum security threats in real-time.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/dashboard">
              <Button variant="primary" size="lg">
                View Dashboard
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" size="lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 py-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Track Vulnerabilities</h3>
            <p className="text-gray-600">
              Monitor cryptographic systems vulnerable to quantum attacks with detailed vulnerability scores and affected protocols.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Submit Findings</h3>
            <p className="text-gray-600">
              Contribute to the community by submitting newly discovered quantum vulnerabilities for expert review.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Admin Review</h3>
            <p className="text-gray-600">
              All submissions undergo rigorous review by quantum security experts before publication.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-12 text-center text-white mb-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Join the quantum security community and help build the most comprehensive database of quantum vulnerabilities.
          </p>
          <Link href="/auth/register">
            <Button variant="secondary" size="lg">
              Create Free Account
            </Button>
          </Link>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>&copy; 2024 Quantum Vulnerability Tracking System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
