'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap } from 'lucide-react';
import { OPPORTUNITIES } from '../content/careers';
// import { ApplyModal } from './ApplyModal';
import { GFormModal } from './GFormModal';

// ==========================================================================
// RoleCard — A single open-role listing with an Apply button
// ==========================================================================

interface RoleCardProps {
    title: string;
    type: string;
    description: string;
    index: number;
    onApply: () => void;
}

function RoleCard({ title, type, description, index, onApply }: RoleCardProps) {
    return (
        <motion.div
            className="group flex flex-col items-start justify-between gap-4 rounded-token-xl border border-border bg-bg-secondary p-6 transition-all hover:border-primary/50 hover:shadow-md md:flex-row md:items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="max-w-md">
                <div className="mb-2 flex items-center gap-3">
                    <span className="text-xs font-bold tracking-wider text-primary uppercase">
                        {type}
                    </span>
                    <div className="h-1 w-1 rounded-full bg-border" />
                    <h3 className="font-clash font-semibold text-lg text-foreground">
                        {title}
                    </h3>
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed">
                    {description}
                </p>
            </div>

            <button className="btn-secondary flex items-center gap-2" onClick={onApply}>
                Apply
                <ArrowUpRight className="h-4 w-4" />
            </button>
        </motion.div>
    );
}

// ==========================================================================
// OpenApplicationCard — Sticky sidebar CTA for general applications
// ==========================================================================

interface OpenApplicationCardProps {
    headline: string;
    description: string;
    ctaText: string;
    onApply: () => void;
}

function OpenApplicationCard({ headline, description, ctaText, onApply }: OpenApplicationCardProps) {
    return (
        <motion.div
            className="sticky top-32 rounded-token-xl bg-bg-secondary border border-border p-8 text-foreground shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="mb-4 text-2xl font-clash font-semibold text-foreground">{headline}</h3>
            <p className="mb-8 text-foreground-muted leading-relaxed">{description}</p>
            <button onClick={onApply} className="btn-primary w-full py-4">{ctaText}</button>
        </motion.div>
    );
}

// ==========================================================================
// SectionHeading — Animated heading for the section
// ==========================================================================

function SectionHeading({ text }: { text: string }) {
    return (
        <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {text}
            </h2>
        </motion.div>
    );
}

// ==========================================================================
// OpportunitiesSection — Main exported section
// ==========================================================================

export function OpportunitiesSection() {
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    // const [selectedRole, setSelectedRole] = useState<string | undefined>();

    const handleApplyClick = (role?: string) => {
        // setSelectedRole(role);
        setIsApplyModalOpen(true);
    };

    return (
        <section className="bg-bg-primary py-24" id="opportunities">
            <div className="container mx-auto max-w-content px-6">
                <SectionHeading text={OPPORTUNITIES.headline} />

                <div className="grid gap-12 lg:grid-cols-5">
                    {/* Left Side — Open Roles */}
                    <div className="lg:col-span-3">
                        <div className="space-y-6">
                            {OPPORTUNITIES.roles.map((role, index) => (
                                <RoleCard
                                    key={index}
                                    title={role.title}
                                    type={role.type}
                                    description={role.description}
                                    index={index}
                                    onApply={() => handleApplyClick(role.title)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Side — Open Application */}
                    <div className="lg:col-span-2">
                        <OpenApplicationCard
                            headline={OPPORTUNITIES.openApplication.headline}
                            description={OPPORTUNITIES.openApplication.description}
                            ctaText={OPPORTUNITIES.openApplication.ctaText}
                            onApply={() => handleApplyClick()}
                        />
                    </div>
                </div>
            </div>

            {/* FEATURE REFERENCE: Temporarily the apply button opens a GForm in a drag-and-droppable, resizable window with min/max/close buttons instead of the custom ApplyModal. */}
            <GFormModal
                isOpen={isApplyModalOpen}
                onClose={() => setIsApplyModalOpen(false)}
            />
            {/*
            <ApplyModal
                isOpen={isApplyModalOpen}
                onClose={() => setIsApplyModalOpen(false)}
                defaultRole={selectedRole}
            />
            */}
        </section>
    );
}
