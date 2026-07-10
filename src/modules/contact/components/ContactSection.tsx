'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { CONTACT_FORM } from '../content/contact';

const inputClass =
    'w-full rounded-lg border border-black/10 bg-white/50 backdrop-blur-xs px-4 py-3.5 text-[15px] text-gray-900 placeholder:text-gray-400 focus:border-black/30 focus:outline-none transition-colors';
const labelClass = 'mb-2 block text-[11px] font-semibold tracking-[0.15em] text-gray-400 uppercase';

function SuccessState() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-16 text-center"
        >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
                <CheckCircle className="h-7 w-7" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 font-questrial">Message sent.</h3>
            <p className="mb-8 max-w-sm text-sm leading-relaxed text-gray-500">
                Thank you for contacting MergeX. We will review your submission and follow up with you within 48 hours.
            </p>
            <a
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
                Return Home
                <ArrowRight className="h-3.5 w-3.5" />
            </a>
        </motion.div>
    );
}

export function GeneralInquirySection() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        company: '',
        interest: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;

        setIsSubmitting(true);
        // Simulate network latency
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <section className="bg-[var(--bg-primary)] py-16 md:py-24">
                <div className="container mx-auto max-w-2xl px-6">
                    <div className="bg-white border border-black/5 rounded-2xl p-8 md:p-12 shadow-sm">
                        <SuccessState />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[var(--bg-primary)] py-16 md:py-24">
            <div className="container mx-auto max-w-2xl px-6">
                <div className="bg-white border border-black/5 rounded-2xl p-8 md:p-12 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className={labelClass}>Name</label>
                            <input
                                type="text"
                                required
                                placeholder="Your name"
                                className={inputClass}
                                value={form.name}
                                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className={labelClass}>Email</label>
                            <input
                                type="email"
                                required
                                placeholder="you@company.com"
                                className={inputClass}
                                value={form.email}
                                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                            />
                        </div>

                        {/* Company */}
                        <div>
                            <label className={labelClass}>Company (Optional)</label>
                            <input
                                type="text"
                                placeholder="Company name"
                                className={inputClass}
                                value={form.company}
                                onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                            />
                        </div>

                        {/* Area of Interest */}
                        <div>
                            <label className={labelClass}>Area of Interest</label>
                            <div className="relative">
                                <select
                                    required
                                    className="w-full rounded-lg border border-black/10 bg-white/50 backdrop-blur-xs px-4 py-3.5 text-[15px] text-gray-900 placeholder:text-gray-400 focus:border-black/30 focus:outline-none transition-colors appearance-none cursor-pointer"
                                    value={form.interest}
                                    onChange={(e) => setForm((p) => ({ ...p, interest: e.target.value }))}
                                >
                                    <option value="" disabled>Select an area</option>
                                    {CONTACT_FORM.areasOfInterest.map((interest) => (
                                        <option key={interest} value={interest}>
                                            {interest}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className={labelClass}>Message</label>
                            <textarea
                                required
                                rows={5}
                                placeholder="Tell us about your project requirements..."
                                className={`${inputClass} resize-none`}
                                value={form.message}
                                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <span className="inline-block animate-pulse">Sending...</span>
                                ) : (
                                    <>
                                        {CONTACT_FORM.ctaText}
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

// Dummy DiagnosticSection for compatibility (route is removed but just in case of any layout exports)
export function DiagnosticSection() {
    return null;
}
