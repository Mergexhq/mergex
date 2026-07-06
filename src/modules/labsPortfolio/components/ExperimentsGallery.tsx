'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { useGlobalVideoObserver } from '@/lib/videoObserver';

gsap.registerPlugin(ScrollTrigger);

const CAROUSEL_MEDIA = [
    { src: '/mockups/labs/Portfolio/Mountain_Dew_online-video-cutter.com.mp4', alt: 'Mountain Dew Dynamic', type: 'video' },
    { src: '/mockups/labs/Gallery/Sara_1.png', alt: 'Sara AI Model 1', type: 'image' },
    { src: '/mockups/labs/Portfolio/ad.mp4', alt: 'Promo Ad', type: 'video' },
    { src: '/mockups/labs/Gallery/Sara_2.png', alt: 'Sara AI Model 2', type: 'image' },
    { src: '/mockups/labs/Portfolio/WhatsApp_Video_2026-02-28_at_2.16.34_PM.mp4', alt: 'WhatsApp Campaign', type: 'video' },
    { src: '/mockups/labs/Gallery/Sara_3.jpg', alt: 'Sara AI Model 3', type: 'image' },
    { src: '/mockups/labs/Gallery/Sara_4.png', alt: 'Sara AI Model 4', type: 'image' },
    { src: '/mockups/labs/Gallery/Sara_5.jpg', alt: 'Sara AI Model 5', type: 'image' },
] as const;

function CarouselVideo({ src, shouldPlay }: { src: string, shouldPlay: boolean }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    useGlobalVideoObserver(videoRef, shouldPlay);
    
    return (
        <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
        >
            <source src={src} type="video/mp4" />
        </video>
    );
}

export function ExperimentsGallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSwiper = useCallback((swiper: SwiperType) => {
        swiperRef.current = swiper;
    }, []);


    const swiperStyles = `
        .experiments-swiper {
            width: 100%;
            padding-bottom: 50px;
        }
        
        .experiments-swiper .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 300px;
            overflow: visible !important;
        }
        
        .experiments-swiper .swiper-slide > div {
            transform-style: preserve-3d;
            backface-visibility: hidden;
            isolation: isolate;
            will-change: transform;
            clip-path: inset(0 round 1.5rem);
        }
        
        .experiments-swiper .swiper-slide video,
        .experiments-swiper .swiper-slide img {
            border-radius: 1.5rem;
        }
        
        .video-zoom-rose {
            transform: scale(1.15);
            transform-origin: center;
        }
        
        .experiments-swiper .swiper-3d .swiper-slide-shadow-left,
        .experiments-swiper .swiper-3d .swiper-slide-shadow-right {
            background-image: none;
        }

        .experiments-swiper .swiper-pagination-bullet {
            background: var(--primary);
            opacity: 0.4;
        }

        .experiments-swiper .swiper-pagination-bullet-active {
            opacity: 1;
            width: 24px;
            border-radius: 4px;
        }
    `;

    return (
        <section ref={sectionRef} className="relative pt-8 pb-8 md:pt-16 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <style>{swiperStyles}</style>
            <div className="container mx-auto max-w-[1600px] px-2 text-[var(--text-primary)]">

                {/* Section Header */}
                <motion.div
                    className="mb-24 flex flex-col items-center text-center w-full px-4 md:px-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-6">
                        <span
                            className="text-xs md:text-sm font-semibold text-[var(--primary)] uppercase tracking-[0.25em]"
                        >
                            EXPLORATIONS
                        </span>
                    </div>

                    <h2
                        className="text-4xl md:text-5xl lg:text-7xl tracking-tight leading-tight font-medium mb-8 font-serif"
                    >
                        Applied Creative Intelligence
                    </h2>

                    <p
                        className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed font-sans max-w-2xl mx-auto"
                    >
                        Structured AI experimentation transformed into measurable creative advantage.
                    </p>
                </motion.div>

            </div>

            {/* Swiper Coverflow Carousel */}
            <div className="relative w-full">
                <Swiper
                    className="experiments-swiper"
                    spaceBetween={50}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 80,
                        modifier: 2.0,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Autoplay, Pagination]}
                    onSwiper={handleSwiper}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                >
                    {/* Swiper slides mapping... */}
                    {CAROUSEL_MEDIA.map((item, index) => {
                        const distance = Math.min(
                            Math.abs(index - activeIndex),
                            CAROUSEL_MEDIA.length - Math.abs(index - activeIndex)
                        );
                        const isWithin5 = distance <= 2;
                        return (
                            <SwiperSlide key={`slide-${index}`}>
                                <div className="w-[300px] h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-[var(--bg-secondary)]">
                                    {item.type === 'video' ? (
                                        <CarouselVideo src={item.src} shouldPlay={isWithin5} />
                                    ) : (
                                        <Image
                                            src={item.src}
                                            width={300}
                                            height={400}
                                            className="w-full h-full object-cover"
                                            alt={item.alt}
                                            unoptimized
                                        />
                                    )}
                                </div>
                            </SwiperSlide>
                        );
                    })}
                    {/* Duplicate Slides for Looping */}
                    {CAROUSEL_MEDIA.map((item, index) => {
                        const distance = Math.min(
                            Math.abs(index - activeIndex),
                            CAROUSEL_MEDIA.length - Math.abs(index - activeIndex)
                        );
                        const isWithin5 = distance <= 2;
                        return (
                            <SwiperSlide key={`slide-dup-${index}`}>
                                <div className="w-[300px] h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-[var(--bg-secondary)]">
                                    {item.type === 'video' ? (
                                        <CarouselVideo src={item.src} shouldPlay={isWithin5} />
                                    ) : (
                                        <Image
                                            src={item.src}
                                            width={300}
                                            height={400}
                                            className="w-full h-full object-cover"
                                            alt={item.alt}
                                            unoptimized
                                        />
                                    )}
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
}
