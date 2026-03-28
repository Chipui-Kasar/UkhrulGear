'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-client';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');
    const { error } = await supabase.from('contact_messages').insert([form]);

    if (error) {
      console.error(error);
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12 px-8 bg-[rgba(76,175,80,0.08)] border border-[rgba(76,175,80,0.2)] rounded-2xl">
        <div className="text-4xl mb-3">⛰️</div>
        <h3 className="font-display text-2xl tracking-[2px]">MESSAGE SENT!</h3>
        <p className="text-cloud mt-2">
          We&apos;ll get back to you faster than you can lace up your boots.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-sunrise underline text-sm"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Your Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="flex-1 px-5 py-4 bg-slate border border-white/[0.08] rounded-xl text-snow placeholder:text-cloud outline-none transition-all focus:border-sunrise focus:shadow-[0_0_0_3px_rgba(255,111,32,0.15)]"
        />
        <input
          type="email"
          placeholder="Email Address"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="flex-1 px-5 py-4 bg-slate border border-white/[0.08] rounded-xl text-snow placeholder:text-cloud outline-none transition-all focus:border-sunrise focus:shadow-[0_0_0_3px_rgba(255,111,32,0.15)]"
        />
      </div>
      <select
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
        className="px-5 py-4 bg-slate border border-white/[0.08] rounded-xl text-snow outline-none transition-all focus:border-sunrise focus:shadow-[0_0_0_3px_rgba(255,111,32,0.15)]"
      >
        <option value="" className="bg-slate">What do you need?</option>
        <option className="bg-slate">Gear Rental Inquiry</option>
        <option className="bg-slate">Group / Corporate Booking</option>
        <option className="bg-slate">Custom Adventure Package</option>
        <option className="bg-slate">Gear Return / Issue</option>
        <option className="bg-slate">General Question</option>
      </select>
      <textarea
        placeholder="Tell us about your adventure plans..."
        required
        rows={5}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="px-5 py-4 bg-slate border border-white/[0.08] rounded-xl text-snow placeholder:text-cloud outline-none resize-y transition-all focus:border-sunrise focus:shadow-[0_0_0_3px_rgba(255,111,32,0.15)]"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="self-start bg-sunrise hover:bg-peak text-obsidian px-12 py-4 rounded-full font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-[0_4px_30px_rgba(255,111,32,0.4)] disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message →'}
      </button>
      {status === 'error' && (
        <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
