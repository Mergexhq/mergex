'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal, flushSync } from 'react-dom';
import { X, Minus, Square, Copy, Edit3 } from 'lucide-react';
import { motion, useDragControls, AnimatePresence, useMotionValue } from 'framer-motion';

interface GFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const STORAGE_KEY = 'mergex_gform_modal_state';

export function GFormModal({ isOpen, onClose }: GFormModalProps) {
    const [mounted, setMounted] = useState(false);
    
    // UI States
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    
    // Persisted Position & Size
    const [size, setSize] = useState({ width: 500, height: 700 });
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const dragControls = useDragControls();
    const containerRef = useRef<HTMLDivElement>(null);

    // 1. Initialize from localStorage
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        if (typeof window !== 'undefined') {
            const defaultWidth = Math.min(window.innerWidth * 0.9, 500);
            const defaultHeight = Math.min(window.innerHeight * 0.9, 700);
            const defaultX = Math.max(0, (window.innerWidth - defaultWidth) / 2);
            const defaultY = Math.max(0, (window.innerHeight - defaultHeight) / 2);
            
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    setSize(parsed.size || { width: defaultWidth, height: defaultHeight });
                    x.set(parsed.position?.x ?? defaultX);
                    y.set(parsed.position?.y ?? defaultY);
                    setIsMinimized(parsed.isMinimized || false);
                    setIsMaximized(parsed.isMaximized || false);
                } else {
                    setSize({ width: defaultWidth, height: defaultHeight });
                    x.set(defaultX);
                    y.set(defaultY);
                }
            } catch (e) {
                setSize({ width: defaultWidth, height: defaultHeight });
                x.set(defaultX);
                y.set(defaultY);
            }
        }
    }, [x, y]);

    // 2. Track window resize via CSS resize: both
    useEffect(() => {
        if (!containerRef.current || isMaximized || isMinimized) return;
        
        const observer = new ResizeObserver(() => {
            if (containerRef.current) {
                setSize({ 
                    width: containerRef.current.offsetWidth, 
                    height: containerRef.current.offsetHeight 
                });
            }
        });
        
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [isMaximized, isMinimized]);

    // 3. Save state to localStorage whenever it changes
    useEffect(() => {
        if (mounted) {
            const saveState = () => {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    size,
                    position: { x: x.get(), y: y.get() },
                    isMinimized,
                    isMaximized
                }));
            };
            // Save immediately on prop changes
            saveState();
            
            // Subscribe to motion values
            const unsubX = x.on('change', saveState);
            const unsubY = y.on('change', saveState);
            
            return () => {
                unsubX();
                unsubY();
            };
        }
    }, [size, isMinimized, isMaximized, mounted, x, y]);

    // 4. Lock background scroll when open and not minimized
    useEffect(() => {
        if (isOpen && !isMinimized) {
            document.body.style.overflow = 'hidden';
            document.documentElement.classList.add('lenis-stopped');
        } else {
            document.body.style.overflow = '';
            document.documentElement.classList.remove('lenis-stopped');
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.classList.remove('lenis-stopped');
        };
    }, [isOpen, isMinimized]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <AnimatePresence>
            {isMinimized ? (
                // Minimized State
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, x: -50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -50 }}
                    onClick={() => setIsMinimized(false)}
                    className="fixed bottom-8 left-8 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-105 transition-transform"
                    title="Restore Application Form"
                >
                    <Edit3 className="h-6 w-6" />
                    <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white shadow">
                        1
                    </div>
                </motion.button>
            ) : (
                // Floating / Maximized State
                <div className="fixed inset-0 z-[9999] pointer-events-none flex">
                    <motion.div
                        ref={containerRef}
                        className="pointer-events-auto flex flex-col bg-bg-primary shadow-2xl rounded-token-xl overflow-hidden border border-border absolute"
                        style={
                            isMaximized 
                                ? { left: '16px', top: '16px', right: '16px', bottom: '16px', x: 0, y: 0 } 
                                : { 
                                    width: size.width, 
                                    height: size.height,
                                    x, 
                                    y,
                                    resize: 'both',
                                }
                        }
                        drag={true}
                        dragControls={dragControls}
                        dragListener={false}
                        dragMomentum={false}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => setIsDragging(false)}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Header */}
                        <div 
                            className="flex items-center justify-between bg-bg-secondary p-3 border-b border-border cursor-grab active:cursor-grabbing shrink-0 h-12"
                            onPointerDown={(e) => {
                                if (isMaximized) {
                                    flushSync(() => {
                                        setIsMaximized(false);
                                    });
                                    // Position the restored window horizontally centered under the mouse
                                    const mouseX = (e as React.PointerEvent).clientX;
                                    const mouseY = (e as React.PointerEvent).clientY;
                                    
                                    const newX = mouseX - size.width / 2;
                                    const boundedX = Math.max(0, Math.min(newX, window.innerWidth - size.width));
                                    const newY = Math.max(0, mouseY - 24);
                                    const boundedY = Math.max(0, Math.min(newY, window.innerHeight - size.height));
                                    
                                    x.set(boundedX);
                                    y.set(boundedY);
                                }
                                dragControls.start(e);
                            }}
                        >
                            <div className="font-clash font-semibold text-foreground select-none">
                                Application Form
                            </div>
                            <div className="flex items-center gap-2" onPointerDown={(e) => e.stopPropagation()}>
                                <button 
                                    onClick={() => setIsMinimized(true)}
                                    className="p-1 hover:bg-bg-tertiary rounded text-foreground-muted transition-colors"
                                    title="Minimize"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <button 
                                    onClick={() => setIsMaximized(!isMaximized)}
                                    className="p-1 hover:bg-bg-tertiary rounded text-foreground-muted transition-colors"
                                    title={isMaximized ? "Restore" : "Maximize"}
                                >
                                    {isMaximized ? <Copy className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                                </button>
                                <button 
                                    onClick={onClose}
                                    className="p-1 hover:bg-destructive/10 hover:text-destructive rounded text-foreground-muted transition-colors"
                                    title="Close"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Body */}
                        <div className="flex-1 w-full h-[calc(100%-48px)] bg-white relative">
                            <iframe 
                                src="https://docs.google.com/forms/d/e/1FAIpQLSeeevppnScto6b8QhEOsnRfWRP7yQOP1Hlhz1XHTTj8_D234w/viewform?embedded=true" 
                                className="w-full h-full border-none"
                                title="Google Form Application"
                            />
                            {isDragging && (
                                <div className="absolute inset-0 z-10 bg-transparent" />
                            )}
                        </div>
                        
                        {/* Custom Resize Handle Indicator */}
                        {!isMaximized && (
                            <div 
                                className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none" 
                                style={{
                                    background: 'linear-gradient(135deg, transparent 50%, var(--border) 50%)'
                                }}
                            />
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
