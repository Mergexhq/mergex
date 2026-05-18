'use client';

import { motion } from 'framer-motion';
import { CONTACT_HERO } from '../content/contact';

export function ContactHero() {
    return (
        <section className="bg-background pt-48 pb-0">
            <div className="container mx-auto max-w-6xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl lg:-ml-12 mb-12"
                >
                    <h1 className="mb-5 text-4xl font-semibold leading-[1.1] tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                        {CONTACT_HERO.headline}
                    </h1>
                    <p className="pt-4 mb-6 max-w-lg text-lg leading-relaxed text-gray-900 font-medium">
                        {CONTACT_HERO.subheadline}
                    </p>
                </motion.div>
                <hr className="border-gray-200 mb-0 lg:-ml-12" />
            </div>
        </section>
    );
}
