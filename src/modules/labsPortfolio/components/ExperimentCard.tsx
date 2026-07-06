'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Clock } from 'lucide-react';
import type { LabsExperiment } from '../types';

interface ExperimentCardProps {
    experiment: LabsExperiment;
    index?: number;
}

export function ExperimentCard({ experiment, index = 0 }: ExperimentCardProps) {
    const categoryColors = {
        visual: 'from-purple-500 to-pink-500',
        video: 'from-blue-500 to-cyan-500',
        audio: 'from-orange-500 to-red-500',
        concept: 'from-green-500 to-emerald-500',
    };

    const categoryBgColors = {
        visual: 'bg-purple-500/10',
        video: 'bg-blue-500/10',
        audio: 'bg-orange-500/10',
        concept: 'bg-green-500/10',
    };

    return (
        <motion.div
            className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-500 hover:border-white/30 hover:bg-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
        >
            {/* Thumbnail Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                <Image
                    src={experiment.thumbnailImage}
                    alt={experiment.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[experiment.category]} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                {/* Featured Badge */}
                {experiment.featured && (
                    <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-gray-900">
                            <Sparkles className="h-3 w-3" />
                            Featured
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Category & Timeline */}
                <div className="mb-3 flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full ${categoryBgColors[experiment.category]} px-3 py-1 text-xs font-semibold text-white capitalize`}>
                        {experiment.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        {experiment.timeline}
                    </span>
                </div>

                {/* Title */}
                <h3 className="mb-2 text-xl font-bold text-white line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    {experiment.title}
                </h3>

                {/* Description */}
                <p className="mb-4 text-sm text-gray-400 line-clamp-2">
                    {experiment.shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {experiment.tags.slice(0, 3).map((tag, i) => (
                        <span
                            key={i}
                            className="rounded-md bg-white/5 px-2 py-1 text-xs font-medium text-gray-300 border border-white/10"
                        >
                            {tag}
                        </span>
                    ))}
                    {experiment.tags.length > 3 && (
                        <span className="rounded-md bg-white/5 px-2 py-1 text-xs font-medium text-gray-400">
                            +{experiment.tags.length - 3}
                        </span>
                    )}
                </div>

                {/* Creator */}
                <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-500">
                        Created by{' '}
                        <span className={`font-semibold ${experiment.createdBy === 'Sara' ? 'text-purple-400' : 'text-gray-300'}`}>
                            {experiment.createdBy}
                        </span>
                    </p>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${categoryColors[experiment.category]} blur-3xl -z-10`} />
        </motion.div>
    );
}
