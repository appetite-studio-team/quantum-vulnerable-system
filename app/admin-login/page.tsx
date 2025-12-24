'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { login, deleteAllSessions } from '@/lib/appwrite-client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear all sessions when the login page loads
  useEffect(() => {
    deleteAllSessions().catch(() => {
      // Ignore errors - this is just cleanup
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo className="w-12 h-12 text-slate-700" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Login</h1>
          <p className="text-slate-600">Sign in to manage vulnerability entries</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              disabled={loading}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              disabled={loading}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full rounded-none"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

