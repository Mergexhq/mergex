'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { CONTACT_FORM } from '../content/contact';

interface FormState {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    inquiryType: string;
    revenueRange: string;
    teamSize: string;
    biggestConstraint: string;
    howHeard: string;
}

const initialForm: FormState = {
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    inquiryType: '',
    revenueRange: '',
    teamSize: '',
    biggestConstraint: '',
    howHeard: '',
};

export function ContactForm() {
    const [form, setForm] = useState<FormState>(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate async submission
        await new Promise(r => setTimeout(r, 1200));
        setIsSubmitting(false);
        setSubmitted(true);
    };

    const selectClass =
        'w-full rounded-none border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-800 appearance-none focus:border-gray-900 focus:outline-none focus:ring-0 transition-colors';
    const inputClass =
        'w-full rounded-none border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-800 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-0 transition-colors';
    const labelClass = 'mb-1.5 block text-xs font-semibold tracking-wide text-gray-500 uppercase';

    return (
        <section className="bg-[#F3F3F3] py-20" id="inquiry-form">
            <div className="container mx-auto max-w-3xl px-6">

                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="rounded-none border border-gray-200 bg-white p-8 shadow-sm md:p-12"
                        >
                            {/* Form header */}
                            <div className="mb-10">
                                <p className="mb-2 text-xs font-bold tracking-[0.15em] text-gray-400 uppercase">
                                    Inquiry Form
                                </p>
                                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                                    Tell us about your business.
                                </h2>
                                <p className="mt-2 text-sm text-gray-500">
                                    Every field here matters. The more specific you are, the more useful our response will be.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {/* - Basic - */}
                                <div>
                                    <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-gray-300 uppercase">
                                        Basic
                                    </p>
                                    <div className="grid gap-5 md:grid-cols-2">
                                        <div>
                                            <label className={labelClass} htmlFor="fullName">Full Name</label>
                                            <input
                                                id="fullName"
                                                name="fullName"
                                                type="text"
                                                required
                                                placeholder="Your name"
                                                value={form.fullName}
                                                onChange={handleChange}
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClass} htmlFor="companyName">Company Name</label>
                                            <input
                                                id="companyName"
                                                name="companyName"
                                                type="text"
                                                required
                                                placeholder="Your company"
                                                value={form.companyName}
                                                onChange={handleChange}
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClass} htmlFor="email">Work Email</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="you@company.com"
                                                value={form.email}
                                                onChange={handleChange}
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClass} htmlFor="phone">Phone Number</label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                placeholder="+91 00000 00000"
                                                value={form.phone}
                                                onChange={handleChange}
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* - Qualification - */}
                                <div>
                                    <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-gray-300 uppercase">
                                        Qualification
                                    </p>
                                    <div className="grid gap-5 md:grid-cols-3">
                                        <div>
                                            <label className={labelClass} htmlFor="inquiryType">Inquiry Type</label>
                                            <div className="relative">
                                                <select
                                                    id="inquiryType"
                                                    name="inquiryType"
                                                    required
                                                    value={form.inquiryType}
                                                    onChange={handleChange}
                                                    className={selectClass}
                                                >
                                                    <option value="" disabled>Select...</option>
                                                    {CONTACT_FORM.inquiryTypes.map(t => (
                                                        <option key={t} value={t}>{t}</option>
                                                    ))}
                                                </select>
                                                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className={labelClass} htmlFor="revenueRange">Revenue Range</label>
                                            <div className="relative">
                                                <select
                                                    id="revenueRange"
                                                    name="revenueRange"
                                                    required
                                                    value={form.revenueRange}
                                                    onChange={handleChange}
                                                    className={selectClass}
                                                >
                                                    <option value="" disabled>Select...</option>
                                                    {CONTACT_FORM.revenueRanges.map(r => (
                                                        <option key={r} value={r}>{r}</option>
                                                    ))}
                                                </select>
                                                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className={labelClass} htmlFor="teamSize">Team Size</label>
                                            <div className="relative">
                                                <select
                                                    id="teamSize"
                                                    name="teamSize"
                                                    value={form.teamSize}
                                                    onChange={handleChange}
                                                    className={selectClass}
                                                >
                                                    <option value="" disabled>Select...</option>
                                                    {CONTACT_FORM.teamSizes.map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Key constraint field */}
                                    <div className="mt-5">
                                        <label className={labelClass} htmlFor="biggestConstraint">
                                            Biggest Constraint
                                        </label>
                                        <textarea
                                            id="biggestConstraint"
                                            name="biggestConstraint"
                                            required
                                            rows={4}
                                            placeholder="What is currently slowing your business growth?"
                                            value={form.biggestConstraint}
                                            onChange={handleChange}
                                            className={`${inputClass} resize-none`}
                                        />
                                    </div>
                                </div>

                                {/* - Optional - */}
                                <div>
                                    <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-gray-300 uppercase">
                                        Optional
                                    </p>
                                    <div>
                                        <label className={labelClass} htmlFor="howHeard">How did you hear about MergeX?</label>
                                        <input
                                            id="howHeard"
                                            name="howHeard"
                                            type="text"
                                            placeholder="LinkedIn, referral, search..."
                                            value={form.howHeard}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="mt-10">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group flex w-full items-center justify-center gap-3 rounded-none bg-gray-900 py-4 text-base font-bold text-white transition-all hover:bg-gray-800 disabled:opacity-60"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        <>
                                            {CONTACT_FORM.ctaText}
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </button>
                                <p className="mt-4 text-center text-xs text-gray-400">
                                    All submissions are treated confidentially. We do not share your data.
                                </p>
                            </div>
                        </motion.form>
                    ) : (
                        /* - Post-Submission State - */
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="rounded-none border border-gray-200 bg-white p-8 text-center shadow-sm md:p-14"
                        >
                            <div className="mb-6 flex justify-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-900">
                                    <CheckCircle className="h-7 w-7 text-white" />
                                </div>
                            </div>
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">
                                Inquiry received.
                            </h2>
                            <p className="mx-auto mb-8 max-w-sm text-[15px] leading-relaxed text-gray-500">
                                If relevant, schedule a diagnostic conversation below.
                                We will respond within 48 hours.
                            </p>

                            {/* Calendly CTA */}
                            <a
                                href="https://calendly.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-none border-2 border-gray-900 bg-gray-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white hover:text-gray-900"
                            >
                                Schedule Diagnostic Conversation
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
