'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage() {
  const supabase = createClient();
  const router = useRouter();
  const [mode, setMode] = useState<'phone' | 'google'>('google');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!phone) return;
    setLoading(true);
    setError('');

    // Ensure phone has country code
    const formattedPhone = phone.startsWith('+') ? phone : `+1${phone}`;

    const { error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
    });

    if (error) {
      setError(error.message);
    } else {
      setOtpSent(true);
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (!otp) return;
    setLoading(true);
    setError('');

    const formattedPhone = phone.startsWith('+') ? phone : `+1${phone}`;

    const { error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: 'sms',
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate via-obsidian to-[#1a2a1a] -z-10" />
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_50%_40%,rgba(255,111,32,0.06),transparent_70%)]" />
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="font-display text-4xl tracking-[3px] text-snow inline-block mb-6">
            SUMMIT<span className="text-sunrise">.</span>
          </Link>
          <h1 className="font-display text-3xl tracking-[2px]">WELCOME BACK</h1>
          <p className="text-cloud text-sm mt-2">Sign in to manage rentals and bookings</p>
        </div>

        {/* Auth Card */}
        <div className="bg-slate/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-4 rounded-xl font-semibold transition-all hover:bg-gray-100 hover:-translate-y-0.5 disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-cloud uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Phone Login */}
          {!otpSent ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-cloud uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <span className="flex items-center px-4 bg-obsidian border border-white/10 rounded-xl text-cloud text-sm">
                    +1
                  </span>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError('');
                    }}
                    className="flex-1 px-4 py-3.5 bg-obsidian border border-white/10 rounded-xl text-snow placeholder:text-cloud/50 outline-none focus:border-sunrise transition-colors"
                  />
                </div>
              </div>
              <button
                onClick={handleSendOTP}
                disabled={loading || !phone}
                className="w-full bg-sunrise hover:bg-peak text-obsidian py-4 rounded-xl font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {loading ? 'Sending...' : 'Send Verification Code'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-cloud text-sm text-center">
                We sent a code to <span className="text-snow font-medium">{phone}</span>
              </p>
              <div>
                <label className="block text-xs text-cloud uppercase tracking-wider mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, ''));
                    setError('');
                  }}
                  className="w-full px-4 py-3.5 bg-obsidian border border-white/10 rounded-xl text-snow text-center text-2xl tracking-[8px] placeholder:text-sm placeholder:tracking-normal outline-none focus:border-sunrise transition-colors font-display"
                />
              </div>
              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length < 6}
                className="w-full bg-sunrise hover:bg-peak text-obsidian py-4 rounded-xl font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify & Sign In'}
              </button>
              <button
                onClick={() => {
                  setOtpSent(false);
                  setOtp('');
                  setError('');
                }}
                className="w-full text-cloud text-sm hover:text-sunrise transition-colors text-center"
              >
                Use a different number
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 text-center">
              {error}
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-cloud/60 text-xs mt-6 leading-relaxed">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </section>
  );
}
