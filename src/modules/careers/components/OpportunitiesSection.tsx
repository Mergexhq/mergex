'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Zap } from 'lucide-react';
import { OPPORTUNITIES } from '../content/careers';

export function OpportunitiesSection() {
    return (
        <section className="bg-[#F3F3F3] py-24" id="opportunities">
            <div className="container mx-auto max-w-6xl px-6">
                {/* Section Heading */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                        {OPPORTUNITIES.headline}
                    </h2>
                </motion.div>

                <div className="grid gap-12 lg:grid-cols-5">
                    {/* Left Side — Open Roles */}
                    <div className="lg:col-span-3">
                        <div className="space-y-6">
                            {OPPORTUNITIES.roles.map((role, index) => (
                                <motion.div
                                    key={index}
                                    className="group flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-purple-300 hover:shadow-md md:flex-row md:items-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="max-w-md">
                                        <div className="mb-2 flex items-center gap-3">
                                            <span className="text-xs font-bold tracking-wider text-purple-600 uppercase">
                                                {role.type}
                                            </span>
                                            <div className="h-1 w-1 rounded-full bg-gray-300" />
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {role.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {role.description}
                                        </p>
                                    </div>
                                    <button className="flex items-center gap-2 rounded-full border border-gray-900 px-5 py-2 text-sm font-bold text-gray-900 transition-all hover:bg-gray-900 hover:text-white">
                                        Apply
                                        <ArrowUpRight className="h-4 w-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side — Open Application */}
                    <div className="lg:col-span-2">
                        <motion.div
                            className="sticky top-32 rounded-3xl bg-gray-900 p-8 text-white shadow-2xl"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="mb-4 text-2xl font-bold">
                                {OPPORTUNITIES.openApplication.headline}
                            </h3>
                            <p className="mb-8 text-gray-300 leading-relaxed">
                                {OPPORTUNITIES.openApplication.description}
                            </p>
                            <a
                                href={OPPORTUNITIES.openApplication.ctaLink}
                                className="inline-flex w-full items-center justify-center rounded-xl bg-white py-4 font-bold text-gray-900 transition-all hover:bg-purple-50"
                            >
                                {OPPORTUNITIES.openApplication.ctaText}
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
