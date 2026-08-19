'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { leadForm } from '@/content/content';

/**
 * Custom two-step lead form (§9).
 *
 * Step 1 asks two low-friction questions to get commitment; step 2 asks the
 * qualifiers. Submission posts to `/api/lead`, which forwards to the
 * GoHighLevel inbound webhook set in `GHL_WEBHOOK_URL` — so the CRM endpoint is
 * never exposed in the browser. If you would rather embed a GHL-hosted form,
 * set `NEXT_PUBLIC_GHL_FORM_EMBED_URL` and this component steps aside.
 */

type Values = {
  name: string;
  business: string;
  industry: string;
  phone: string;
  email: string;
  challenge: string;
  budget: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = {
  name: '',
  business: '',
  industry: '',
  phone: '',
  email: '',
  challenge: '',
  budget: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,}$/;

const embedUrl = process.env.NEXT_PUBLIC_GHL_FORM_EMBED_URL;

export default function LeadForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState(false);
  const headingRef = useRef<HTMLParagraphElement>(null);

  // Option (a): a GoHighLevel-hosted form, dropped straight in.
  if (embedUrl) {
    return (
      <div className="card overflow-hidden p-1">
        <iframe
          src={embedUrl}
          title="Free marketing audit request form"
          className="h-[42rem] w-full rounded"
          loading="lazy"
        />
      </div>
    );
  }

  const set = (key: keyof Values) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validateStep1 = (): boolean => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = leadForm.errors.required;
    if (!values.business.trim()) next.business = leadForm.errors.required;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateStep2 = (): boolean => {
    const next: Errors = {};
    if (!values.industry) next.industry = leadForm.errors.required;
    if (!values.phone.trim()) next.phone = leadForm.errors.required;
    else if (!PHONE_RE.test(values.phone.trim())) next.phone = leadForm.errors.phone;
    if (!values.email.trim()) next.email = leadForm.errors.required;
    else if (!EMAIL_RE.test(values.email.trim())) next.email = leadForm.errors.email;
    if (!values.challenge.trim()) next.challenge = leadForm.errors.required;
    if (!values.budget) next.budget = leadForm.errors.required;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goToStep2 = () => {
    if (!validateStep1()) return;
    setStep(2);
    // Move focus to the new step so keyboard and screen-reader users follow.
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (step === 1) {
      goToStep2();
      return;
    }

    if (!validateStep2()) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          source: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setDone(true);
    } catch {
      setSubmitError(leadForm.errors.generic);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="card p-4 text-center lg:p-6" role="status" aria-live="polite">
        <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-cyan/15">
          <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden>
            <path
              d="M5 13l4 4L19 7"
              stroke="var(--cyan-deep)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </span>
        <h3 className="mt-2 text-2xl font-semibold text-ink">{leadForm.success.title}</h3>
        <p className="mx-auto mt-1 max-w-prose text-lg text-muted">{leadForm.success.body}</p>
        <p className="mt-3 text-base text-muted">{leadForm.success.secondary}</p>
        <Link href={leadForm.success.secondaryCta.href} className="btn-secondary mt-2">
          {leadForm.success.secondaryCta.label}
        </Link>
      </div>
    );
  }

  const copy = step === 1 ? leadForm.step1 : leadForm.step2;

  return (
    <form onSubmit={onSubmit} className="card p-3 sm:p-4 lg:p-5" noValidate>
      {/* Progress */}
      <div className="mb-3 flex items-center gap-2">
        <div className="flex-1">
          <div className="h-0.5 w-full overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-cyan transition-[width] duration-[var(--dur-slow)] ease-brand"
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          Step {step} of 2
        </span>
      </div>

      <p
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-xl font-semibold text-ink outline-none"
      >
        {copy.title}
      </p>
      <p className="mb-3 text-sm text-muted">{copy.hint}</p>

      {step === 1 ? (
        <div className="grid gap-2">
          <Field
            id="name"
            label={leadForm.step1.fields.name.label}
            placeholder={leadForm.step1.fields.name.placeholder}
            value={values.name}
            onChange={set('name')}
            error={errors.name}
            autoComplete="name"
          />
          <Field
            id="business"
            label={leadForm.step1.fields.business.label}
            placeholder={leadForm.step1.fields.business.placeholder}
            value={values.business}
            onChange={set('business')}
            error={errors.business}
            autoComplete="organization"
          />
          <button type="submit" className="btn-primary mt-1 w-full text-lg">
            {leadForm.step1.submitLabel}
            <svg viewBox="0 0 24 24" className="h-2 w-2" aria-hidden>
              <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="grid gap-2">
          <SelectField
            id="industry"
            label={leadForm.step2.fields.industry.label}
            placeholder={leadForm.step2.fields.industry.placeholder}
            options={leadForm.step2.fields.industry.options}
            value={values.industry}
            onChange={set('industry')}
            error={errors.industry}
          />
          <div className="grid gap-2 sm:grid-cols-2">
            <Field
              id="phone"
              type="tel"
              label={leadForm.step2.fields.phone.label}
              placeholder={leadForm.step2.fields.phone.placeholder}
              value={values.phone}
              onChange={set('phone')}
              error={errors.phone}
              autoComplete="tel"
            />
            <Field
              id="email"
              type="email"
              label={leadForm.step2.fields.email.label}
              placeholder={leadForm.step2.fields.email.placeholder}
              value={values.email}
              onChange={set('email')}
              error={errors.email}
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="challenge" className="field-label">
              {leadForm.step2.fields.challenge.label}
            </label>
            <textarea
              id="challenge"
              name="challenge"
              rows={4}
              className="field-input resize-y"
              placeholder={leadForm.step2.fields.challenge.placeholder}
              value={values.challenge}
              onChange={set('challenge')}
              aria-invalid={Boolean(errors.challenge)}
              aria-describedby={errors.challenge ? 'challenge-error' : undefined}
            />
            {errors.challenge && <FieldError id="challenge-error">{errors.challenge}</FieldError>}
          </div>
          <SelectField
            id="budget"
            label={leadForm.step2.fields.budget.label}
            placeholder={leadForm.step2.fields.budget.placeholder}
            options={leadForm.step2.fields.budget.options}
            value={values.budget}
            onChange={set('budget')}
            error={errors.budget}
          />

          {submitError && (
            <p className="rounded bg-cyan/10 px-2 py-1 text-base text-cyan-deep" role="alert">
              {submitError}
            </p>
          )}

          <div className="mt-1 flex flex-col-reverse gap-1 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-ghost sm:w-auto"
            >
              {leadForm.step2.backLabel}
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 text-lg disabled:cursor-not-allowed disabled:opacity-70"
              disabled={submitting}
            >
              {submitting ? 'Sending…' : leadForm.step2.submitLabel}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

/* ---- Small field primitives ---- */

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-0.5 text-sm font-medium text-cyan-deep">
      {children}
    </p>
  );
}

function Field({
  id,
  label,
  error,
  type = 'text',
  ...rest
}: {
  id: string;
  label: string;
  error?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="field-input"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

function SelectField({
  id,
  label,
  placeholder,
  options,
  error,
  ...rest
}: {
  id: string;
  label: string;
  placeholder: string;
  options: readonly string[];
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="field-input appearance-none bg-[right_1rem_center] bg-no-repeat pr-4"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
        }}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}
