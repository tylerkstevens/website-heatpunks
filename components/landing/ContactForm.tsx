'use client';

import { useState, FormEvent } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="text-4xl text-[var(--terminal-color)] mb-4">✓</div>
        <h3 className="font-mono text-lg font-bold mb-2">MESSAGE SENT</h3>
        <p className="text-[var(--muted)] text-sm mb-6">
          Thank you for reaching out. We&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="font-mono text-xs tracking-wider text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
        >
          &gt; SEND ANOTHER MESSAGE
        </button>
      </div>
    );
  }

  const inputClasses = "w-full px-4 py-3 bg-[var(--background)] border border-[var(--card-border)] font-mono text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors";
  const labelClasses = "block font-mono text-xs tracking-wider text-[var(--muted)] mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className={labelClasses}>
          NAME <span className="text-[var(--accent)]">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClasses}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClasses}>
          EMAIL <span className="text-[var(--accent)]">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClasses}
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          MESSAGE <span className="text-[var(--accent)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClasses} resize-none`}
          placeholder="Your message..."
        />
      </div>

      {status === 'error' && (
        <div className="p-3 border border-[var(--red)] bg-[var(--red)]/10 font-mono text-xs text-[var(--red)]">
          <span className="text-[var(--red)]">&gt;</span> ERROR: {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {status === 'submitting' ? (
            <>
              <LoadingSpinner className="h-4 w-4" />
              SENDING...
            </>
          ) : (
            'SEND MESSAGE'
          )}
        </span>
        <span className="btn-heat" />
      </button>
    </form>
  );
}

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
