'use client';

import React, { useEffect, useRef } from 'react';

export interface ParticleTypographyProps {
    text: string;
    fontSize?: number;
    fontFamily?: string;
    particleSize?: number;
    particleDensity?: number;
    dispersionStrength?: number;
    returnSpeed?: number;
    color?: string;
    className?: string;
}

class Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    dispersion: number;
    returnSpd: number;

    constructor(x: number, y: number, size: number, color: string, dispersion: number, returnSpd: number) {
        this.x = x + (Math.random() - 0.5) * 10;
        this.y = y + (Math.random() - 0.5) * 10;
        this.originX = x;
        this.originY = y;
        this.vx = (Math.random() - 0.5) * 5;
        this.vy = (Math.random() - 0.5) * 5;
        this.size = size;
        this.color = color;
        this.dispersion = dispersion;
        this.returnSpd = returnSpd;
    }

    update(mouseX: number, mouseY: number) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 140;

        if (distance < interactionRadius && mouseX !== -9999 && mouseY !== -9999) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (interactionRadius - distance) / interactionRadius;
            this.vx -= forceDirectionX * force * this.dispersion;
            this.vy -= forceDirectionY * force * this.dispersion;
        }

        this.vx += (this.originX - this.x) * this.returnSpd;
        this.vy += (this.originY - this.y) * this.returnSpd;
        this.vx *= 0.85;
        this.vy *= 0.85;

        const distToOrigin = Math.sqrt(Math.pow(this.x - this.originX, 2) + Math.pow(this.y - this.originY, 2));
        if (distToOrigin < 1 && Math.random() > 0.95) {
            this.vx += (Math.random() - 0.5) * 0.2;
            this.vy += (Math.random() - 0.5) * 0.2;
        }

        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

export function ParticleTypography({
    text,
    fontSize = 120,
    fontFamily = 'Questrial, sans-serif',
    particleSize = 1.8,
    particleDensity = 5,
    dispersionStrength = 18,
    returnSpeed = 0.07,
    color = '#ffffff',
    className = '',
}: ParticleTypographyProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouseX = -9999;
        let mouseY = -9999;
        let containerWidth = 0;
        let containerHeight = 0;

        const init = () => {
            containerWidth = container.clientWidth;
            containerHeight = container.clientHeight;
            if (containerWidth === 0 || containerHeight === 0) return;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = containerWidth * dpr;
            canvas.height = containerHeight * dpr;
            canvas.style.width = `${containerWidth}px`;
            canvas.style.height = `${containerHeight}px`;
            ctx.scale(dpr, dpr);

            ctx.clearRect(0, 0, containerWidth, containerHeight);

            // Step 1: measure text at a reference size, then scale to fill container width
            const referenceFontSize = Math.min(fontSize, containerHeight * 1.2);
            ctx.font = `900 ${referenceFontSize}px ${fontFamily}`;
            const measuredWidth = ctx.measureText(text).width;
            // Scale so text fills ~95% of container width
            const effectiveFontSize = measuredWidth > 0
                ? referenceFontSize * (containerWidth * 0.95 / measuredWidth)
                : referenceFontSize;

            ctx.fillStyle = color;
            ctx.font = `900 ${effectiveFontSize}px ${fontFamily}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, containerWidth / 2, containerHeight / 2);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            particles = [];

            const step = Math.max(1, Math.floor(particleDensity * dpr));
            for (let y = 0; y < imageData.height; y += step) {
                for (let x = 0; x < imageData.width; x += step) {
                    const index = (y * imageData.width + x) * 4;
                    if ((imageData.data[index + 3] ?? 0) > 128) {
                        particles.push(new Particle(
                            x / dpr, y / dpr,
                            particleSize, color,
                            dispersionStrength, returnSpeed
                        ));
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, containerWidth, containerHeight);
            for (const p of particles) {
                p.update(mouseX, mouseY);
                p.draw(ctx);
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const onMouseLeave = () => { mouseX = -9999; mouseY = -9999; };

        const onTouchMove = (e: TouchEvent) => {
            const t = e.touches[0];
            if (!t) return;
            const rect = canvas.getBoundingClientRect();
            mouseX = t.clientX - rect.left;
            mouseY = t.clientY - rect.top;
        };

        const timeoutId = setTimeout(() => { init(); animate(); }, 150);

        const resizeObserver = new ResizeObserver(() => { init(); });
        resizeObserver.observe(container);

        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseleave', onMouseLeave);
        canvas.addEventListener('touchmove', onTouchMove, { passive: true });
        canvas.addEventListener('touchend', onMouseLeave);

        return () => {
            clearTimeout(timeoutId);
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener('mousemove', onMouseMove);
            canvas.removeEventListener('mouseleave', onMouseLeave);
            canvas.removeEventListener('touchmove', onTouchMove);
            canvas.removeEventListener('touchend', onMouseLeave);
        };
    }, [text, fontSize, fontFamily, particleSize, particleDensity, dispersionStrength, returnSpeed, color]);

    return (
        <div
            ref={containerRef}
            className={`w-full h-full ${className}`}
        >
            <canvas
                ref={canvasRef}
                className="block w-full h-full touch-none"
            />
        </div>
    );
}
