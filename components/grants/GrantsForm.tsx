'use client';

import { useState, FormEvent } from 'react';
import { categoryOptions } from '@/data/grants';
import { GRANT_CHAR_LIMIT, type GrantCategoryId } from '@/types/grants';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function GrantsForm() {
  // Contact Info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [country, setCountry] = useState('');

  // Project Details
  const [category, setCategory] = useState<GrantCategoryId | ''>('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');

  // Impact & Background
  const [impact, setImpact] = useState('');
  const [background, setBackground] = useState('');

  // Optional
  const [references, setReferences] = useState('');
  const [source, setSource] = useState('');

  // Acknowledgements
  const [ackBitcoin, setAckBitcoin] = useState(false);
  const [ackOpenLicense, setAckOpenLicense] = useState(false);
  const [ackPublicShare, setAckPublicShare] = useState(false);
  const [ackNoGuarantee, setAckNoGuarantee] = useState(false);
  const [ackContact, setAckContact] = useState(false);

  // Form state
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Validate all acknowledgements are checked
    if (!ackBitcoin || !ackOpenLicense || !ackPublicShare || !ackNoGuarantee || !ackContact) {
      setStatus('error');
      setErrorMessage('All acknowledgement checkboxes must be checked');
      return;
    }

    try {
      const response = await fetch('/api/grants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          organization,
          country,
          category,
          projectTitle,
          projectDescription,
          budget: parseFloat(budget),
          timeline,
          impact,
          background,
          references,
          source,
          ackBitcoin,
          ackOpenLicense,
          ackPublicShare,
          ackNoGuarantee,
          ackContact,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit application');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Failed to submit application. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12 bg-[var(--card-background)] border border-[var(--card-border)] p-8">
        <div className="text-5xl text-[var(--terminal-color)] mb-4">✓</div>
        <h3 className="font-mono text-xl font-bold mb-4">APPLICATION SUBMITTED</h3>
        <p className="text-[var(--muted)] leading-relaxed max-w-md mx-auto">
          Thank you for your application. We review proposals on a rolling basis
          and will be in touch if we&apos;d like to learn more.
        </p>
      </div>
    );
  }

  const inputClasses =
    'w-full px-4 py-3 bg-[var(--background)] border border-[var(--card-border)] font-mono text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors';
  const labelClasses = 'block font-mono text-xs tracking-wider text-[var(--muted)] mb-2';
  const sectionClasses = 'bg-[var(--card-background)] border border-[var(--card-border)] p-6';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div className={sectionClasses}>
        <h3 className="font-mono text-sm font-bold text-[var(--terminal-color)] mb-5">
          &gt; CONTACT INFORMATION
        </h3>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className={labelClasses}>
              FULL NAME <span className="text-[var(--accent)]">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              maxLength={200}
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
              required
              maxLength={200}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="organization" className={labelClasses}>
              ORGANIZATION
            </label>
            <input
              type="text"
              id="organization"
              maxLength={200}
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className={inputClasses}
              placeholder="Company, university, or 'Independent'"
            />
          </div>

          <div>
            <label htmlFor="country" className={labelClasses}>
              COUNTRY <span className="text-[var(--accent)]">*</span>
            </label>
            <input
              type="text"
              id="country"
              required
              maxLength={100}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={inputClasses}
              placeholder="Your country"
            />
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className={sectionClasses}>
        <h3 className="font-mono text-sm font-bold text-[var(--terminal-color)] mb-5">
          &gt; PROJECT DETAILS
        </h3>
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="category" className={labelClasses}>
                GRANT CATEGORY <span className="text-[var(--accent)]">*</span>
              </label>
              <select
                id="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value as GrantCategoryId)}
                className={inputClasses}
              >
                <option value="">Select a category...</option>
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="budget" className={labelClasses}>
                BUDGET REQUESTED (USD) <span className="text-[var(--accent)]">*</span>
              </label>
              <input
                type="number"
                id="budget"
                required
                min="1"
                step="1"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={inputClasses}
                placeholder="Amount in USD"
              />
            </div>
          </div>

          <div>
            <label htmlFor="projectTitle" className={labelClasses}>
              PROJECT TITLE <span className="text-[var(--accent)]">*</span>
            </label>
            <input
              type="text"
              id="projectTitle"
              required
              maxLength={500}
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className={inputClasses}
              placeholder="Brief title for your project"
            />
          </div>

          <TextareaWithCounter
            id="projectDescription"
            label="PROJECT DESCRIPTION"
            required
            value={projectDescription}
            onChange={setProjectDescription}
            placeholder="Describe your project in detail. What will you build or create? What problem does it solve?"
            rows={6}
          />

          <TextareaWithCounter
            id="timeline"
            label="TIMELINE"
            required
            value={timeline}
            onChange={setTimeline}
            placeholder="Describe your project timeline. What are the key milestones and when do you expect to complete them?"
            rows={4}
          />
        </div>
      </div>

      {/* Impact & Background */}
      <div className={sectionClasses}>
        <h3 className="font-mono text-sm font-bold text-[var(--terminal-color)] mb-5">
          &gt; IMPACT & BACKGROUND
        </h3>
        <div className="space-y-5">
          <TextareaWithCounter
            id="impact"
            label="EXPECTED IMPACT & DELIVERABLES"
            required
            value={impact}
            onChange={setImpact}
            placeholder="What will be the impact of your project? What specific deliverables will you produce?"
            rows={5}
          />

          <TextareaWithCounter
            id="background"
            label="APPLICANT BACKGROUND"
            required
            value={background}
            onChange={setBackground}
            placeholder="Tell us about yourself or your team. What relevant experience do you have?"
            rows={5}
          />
        </div>
      </div>

      {/* Optional Information */}
      <div className={sectionClasses}>
        <h3 className="font-mono text-sm font-bold text-[var(--terminal-color)] mb-5">
          &gt; ADDITIONAL INFORMATION
        </h3>
        <div className="space-y-5">
          <div>
            <label htmlFor="references" className={labelClasses}>
              REFERENCES
            </label>
            <textarea
              id="references"
              maxLength={1000}
              value={references}
              onChange={(e) => setReferences(e.target.value)}
              className={`${inputClasses} resize-none`}
              placeholder="Optional: 1-2 references who can speak to your work (name and email)"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="source" className={labelClasses}>
              HOW DID YOU HEAR ABOUT US?
            </label>
            <input
              type="text"
              id="source"
              maxLength={500}
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className={inputClasses}
              placeholder="Optional: How did you find out about this grant program?"
            />
          </div>
        </div>
      </div>

      {/* Acknowledgements */}
      <div className={sectionClasses}>
        <h3 className="font-mono text-sm font-bold text-[var(--terminal-color)] mb-5">
          &gt; ACKNOWLEDGEMENTS
        </h3>
        <p className="text-sm text-[var(--muted)] mb-5">
          Please confirm you understand and agree to the following:
        </p>
        <div className="space-y-4">
          <Checkbox
            id="ackBitcoin"
            checked={ackBitcoin}
            onChange={setAckBitcoin}
            label="I understand grants are paid in Bitcoin"
          />
          <Checkbox
            id="ackOpenLicense"
            checked={ackOpenLicense}
            onChange={setAckOpenLicense}
            label="I agree to make project deliverables publicly available under an open license"
          />
          <Checkbox
            id="ackPublicShare"
            checked={ackPublicShare}
            onChange={setAckPublicShare}
            label="I grant 256 Foundation permission to publicly share information about funded projects"
          />
          <Checkbox
            id="ackNoGuarantee"
            checked={ackNoGuarantee}
            onChange={setAckNoGuarantee}
            label="I understand submitting an application does not guarantee funding"
          />
          <Checkbox
            id="ackContact"
            checked={ackContact}
            onChange={setAckContact}
            label="I consent to being contacted about my application"
          />
        </div>
      </div>

      {status === 'error' && (
        <div className="p-4 border border-[var(--red)] bg-[var(--red)]/10 font-mono text-xs text-[var(--red)]">
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
              SUBMITTING...
            </>
          ) : (
            'SUBMIT APPLICATION'
          )}
        </span>
        <span className="btn-heat" />
      </button>
    </form>
  );
}

interface TextareaWithCounterProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

function TextareaWithCounter({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 5,
}: TextareaWithCounterProps) {
  const charCount = value.length;
  const isNearLimit = charCount > GRANT_CHAR_LIMIT * 0.9;
  const isAtLimit = charCount >= GRANT_CHAR_LIMIT;

  const handleChange = (newValue: string) => {
    if (newValue.length <= GRANT_CHAR_LIMIT) {
      onChange(newValue);
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs tracking-wider text-[var(--muted)] mb-2">
        {label} {required && <span className="text-[var(--accent)]">*</span>}
      </label>
      <textarea
        id={id}
        required={required}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--card-border)] font-mono text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
        placeholder={placeholder}
        rows={rows}
      />
      <div
        className={`mt-1 font-mono text-xs text-right ${
          isAtLimit
            ? 'text-[var(--red)]'
            : isNearLimit
            ? 'text-[var(--accent)]'
            : 'text-[var(--muted)]'
        }`}
      >
        {charCount.toLocaleString()} / {GRANT_CHAR_LIMIT.toLocaleString()}
      </div>
    </div>
  );
}

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

function Checkbox({ id, checked, onChange, label }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer group">
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 border ${
            checked
              ? 'bg-[var(--accent)] border-[var(--accent)]'
              : 'bg-[var(--background)] border-[var(--card-border)] group-hover:border-[var(--accent)]'
          } transition-colors flex items-center justify-center`}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-[var(--background)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-sm text-[var(--foreground)] leading-tight">{label}</span>
    </label>
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
