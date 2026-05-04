import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import emailjs from '@emailjs/browser';
import { FiSend, FiCheckCircle } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import styles from './HireMe.module.css';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  description: string;
  budget: string;
  timeline: string;
}

const PHONE_REGEX = /^[+]?[\d\s().-]{7,20}$/;

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Your name is required.')
    .max(50, 'Name must be 50 characters or fewer.'),
  email: yup.string().email('That email doesn\'t look quite right.').default(''),
  phone: yup
    .string()
    .default('')
    .test('phone-format', 'Please enter a valid phone number.', (value) => {
      if (!value?.trim()) return true;
      return PHONE_REGEX.test(value.trim());
    }),
  description: yup
    .string()
    .trim()
    .required('Tell me a bit about your project.')
    .max(1000, 'Description must be 1000 characters or fewer.'),
  budget: yup.string().default(''),
  timeline: yup.string().default(''),
}).test('contact', '', function(value) {
  if (!value.email?.trim() && !value.phone?.trim()) {
    return this.createError({
      path: 'email',
      message: 'Please provide at least an email or a phone number.',
    });
  }
  return true;
});

const RECIPIENT_EMAIL = 'andrew@andrewdamas.dev';

// EmailJS configuration — set these in `.env`:
//   VITE_EMAILJS_SERVICE_ID=...
//   VITE_EMAILJS_TEMPLATE_ID=...
//   VITE_EMAILJS_PUBLIC_KEY=...
// In your EmailJS template, set the "To Email" to andrew@andrewdamas.dev
// and reference these template variables: {{name}}, {{email}}, {{phone}},
// {{description}}, {{budget}}, {{timeline}}, {{subject}}, {{message}}.
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

function buildEmailBody(data: FormValues) {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email || '(not provided)'}`,
    `Phone: ${data.phone || '(not provided)'}`,
    `Budget: ${data.budget || '(not provided)'}`,
    `Timeline: ${data.timeline || '(not provided)'}`,
    '',
    'Project Description:',
    data.description,
  ].join('\n');
}

export default function HireMe() {
  const ref = useScrollAnimation<HTMLElement>();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: { name: '', email: '', phone: '', description: '', budget: '', timeline: '' },
  });

  const descriptionValue = useWatch({ control, name: 'description' }) ?? '';
  const DESCRIPTION_MAX = 1000;

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    setSubmitted(false);

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setSubmitError(
        `Email service isn't configured yet. Please email me directly at ${RECIPIENT_EMAIL}.`,
      );
      return;
    }

    const subject = `New project inquiry from ${data.name}`;
    const message = buildEmailBody(data);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: RECIPIENT_EMAIL,
          reply_to: data.email || undefined,
          subject,
          message,
          name: data.name,
          email: data.email,
          phone: data.phone,
          description: data.description,
          budget: data.budget,
          timeline: data.timeline,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );

      reset();
      setSubmitted(true);
    } catch (err) {
      console.error('Hire Me form submission failed:', err);
      setSubmitError(
        `Something went wrong sending your message. Please email me directly at ${RECIPIENT_EMAIL}.`,
      );
    }
  };

  return (
    <section id="hire" className={`${styles.hire} section`} ref={ref}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.header}>
            <p className="section-label fade-up">Freelance</p>
            <h2 className="section-title fade-up">Work With Me</h2>
            <p className={`section-subtitle fade-up`}>
              Have a project that needs a skilled hand? Tell me about it — I take
              on select freelance work and love collaborating on meaningful
              problems.
            </p>
          </div>

          {submitted && (
            <div className={styles.successBanner} role="status" aria-live="polite">
              <FiCheckCircle size={24} />
              <div>
                <strong>Message sent!</strong>
                <span>
                  Thanks for reaching out — I'll get back to you within one business day.
                </span>
              </div>
            </div>
          )}

          <form className={`${styles.form} fade-up`} onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Name */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="hire-name">
                Full Name <span className={styles.required}>*</span>
              </label>
              <input
                id="hire-name"
                type="text"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                placeholder="Jane Smith"
                autoComplete="name"
                maxLength={50}
                {...register('name')}
              />
              {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            {/* Email + Phone */}
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="hire-email">
                  Email Address
                </label>
                <input
                  id="hire-email"
                  type="email"
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  placeholder="jane@example.com"
                  autoComplete="email"
                  {...register('email')}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="hire-phone">
                  Phone Number
                </label>
                <input
                  id="hire-phone"
                  type="tel"
                  className={`${styles.input} ${errors.phone || errors.email ? styles.inputError : ''}`}
                  placeholder="+1 (512) 555-0100"
                  autoComplete="tel"
                  maxLength={20}
                  {...register('phone', { onChange: () => { void trigger('email'); } })}
                />
              </div>
            </div>
            {errors.phone && (
              <span className={`${styles.error} ${styles.contactError}`}>{errors.phone.message}</span>
            )}
            {!errors.phone && errors.email && (
              <span className={`${styles.error} ${styles.contactError}`}>{errors.email.message}</span>
            )}

            {/* Description */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="hire-desc">
                Project Description <span className={styles.required}>*</span>
              </label>
              <textarea
                id="hire-desc"
                className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                placeholder="Tell me about your project — what you're building, the problem you're solving, who it's for, and any technical context that'd be useful..."
                rows={5}
                maxLength={DESCRIPTION_MAX}
                {...register('description')}
              />
              <div className={styles.descMeta}>
                {errors.description ? (
                  <span className={styles.error}>{errors.description.message}</span>
                ) : (
                  <span />
                )}
                <span
                  className={`${styles.counter} ${
                    descriptionValue.length >= DESCRIPTION_MAX ? styles.counterMax : ''
                  }`}
                >
                  {descriptionValue.length} / {DESCRIPTION_MAX}
                </span>
              </div>
            </div>

            {/* Budget + Timeline */}
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="hire-budget">
                  Budget Range <span className={styles.optional}>(optional)</span>
                </label>
                <select id="hire-budget" className={styles.select} {...register('budget')}>
                  <option value="">Select a range…</option>
                  <option value="under-5k">Under $5,000</option>
                  <option value="5k-15k">$5,000 – $15,000</option>
                  <option value="15k-50k">$15,000 – $50,000</option>
                  <option value="50k-plus">$50,000+</option>
                  <option value="ongoing">Ongoing / retainer</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="hire-timeline">
                  Timeline <span className={styles.optional}>(optional)</span>
                </label>
                <select id="hire-timeline" className={styles.select} {...register('timeline')}>
                  <option value="">Select a timeline…</option>
                  <option value="asap">ASAP / urgent</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="1-3-months">1 – 3 months</option>
                  <option value="3-6-months">3 – 6 months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div className={styles.submitRow}>
              {submitError && (
                <span className={styles.error} role="alert">
                  {submitError}
                </span>
              )}
              <button
                type="submit"
                className={`btn btn-primary ${styles.submitBtn}`}
                disabled={isSubmitting || submitted}
              >
                {isSubmitting ? (
                  <span className={styles.spinner} />
                ) : submitted ? (
                  <FiCheckCircle size={16} />
                ) : (
                  <FiSend size={16} />
                )}
                {isSubmitting ? 'Sending…' : submitted ? 'Sent!' : 'Send Message'}
              </button>
              <p className={styles.privacy}>Your details stay private — no spam, ever.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
