'use client';

import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import type { UseFormReturn, UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, UploadCloud, CheckCircle2, File as FileIcon, Edit2, Check } from 'lucide-react';

// ==========================================================================
// Schema & Constants
// ==========================================================================

const FORM_STORAGE_KEY = 'mergex_careers_apply_form';

const formSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Valid phone number is required'),
    department: z.string().min(2, 'Department is required'),
    degreeLevel: z.enum(['UG', 'PG'], { message: 'Degree level is required' }),
    year: z.enum(['I YEAR', 'II YEAR', 'III YEAR'], { message: 'Year is required' }),
    technicalInternship: z.string().optional(),
    nonTechnicalInternship: z.string().optional(),
    resume: z.any().refine((files) => files?.length >= 1, 'Resume is required.'),
    pastWork: z.any().optional(),
    portfolioUrl: z.string().url('Valid URL is required'),
});

type FormValues = z.infer<typeof formSchema>;

const TECHNICAL_ROLES = [
    'Software Development Intern',
    'AI Video Production Intern',
    'None of the above',
] as const;

const NON_TECHNICAL_ROLES = [
    'Communication Specialist',
    'HR Intern',
    'Market Research Intern',
    'Video Editor Intern',
    'Graphic Designer',
    'Sales Intern',
    'Content Research Intern',
    'Content Writer',
    'None of the above',
] as const;

// ==========================================================================
// Atomic Components — Reusable building blocks for any form field
// ==========================================================================

/** Wraps any input with a label, required marker, hint text, and error message. */
interface FormFieldProps {
    label: string;
    required?: boolean;
    hint?: string;
    error?: FieldError | { message?: string };
    children: ReactNode;
}

function FormField({ label, required, hint, error, children }: FormFieldProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
                {label}{' '}
                {required && <span className="text-destructive">*</span>}
                {hint && <span className="text-foreground-muted text-xs font-normal">{hint}</span>}
            </label>
            {children}
            {error && <p className="text-xs text-destructive">{error.message as string}</p>}
        </div>
    );
}

/** Renders a horizontal or vertical set of radio inputs. */
interface RadioGroupProps {
    options: readonly string[];
    registration: UseFormRegisterReturn;
    direction?: 'row' | 'column';
}

function RadioGroup({ options, registration, direction = 'row' }: RadioGroupProps) {
    return (
        <div className={`flex gap-4 ${direction === 'column' ? 'flex-col' : ''}`}>
            {options.map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value={option}
                        {...registration}
                        className="h-4 w-4 text-primary focus:ring-primary accent-primary"
                    />
                    <span className="text-sm text-foreground-muted">{option}</span>
                </label>
            ))}
        </div>
    );
}

/** Styled file drop-zone with a hidden file input overlay. */
interface FileUploadProps {
    name: keyof FormValues;
    form: UseFormReturn<FormValues>;
    accept?: string;
    helperText?: string;
}

function FileUpload({ form, name, accept, helperText = 'Upload File (Max 10MB)' }: FileUploadProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState('');
    const [localError, setLocalError] = useState('');

    const files = form.watch(name);
    const file = files?.[0] instanceof File ? files[0] : (files instanceof FileList ? files[0] : null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > 10 * 1024 * 1024) {
                setLocalError('File size exceeds 10MB limit.');
                form.setValue(name, null as any, { shouldValidate: true });
                return;
            }
            setLocalError('');
            form.setValue(name, [selectedFile] as any, { shouldValidate: true });
            // Clear the input value so the same file can be selected again if needed
            e.target.value = '';
        }
    };

    const startEditing = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (file) {
            const lastDotIndex = file.name.lastIndexOf('.');
            const nameWithoutExtension = lastDotIndex !== -1 ? file.name.substring(0, lastDotIndex) : file.name;
            setEditName(nameWithoutExtension);
            setIsEditing(true);
        }
    };

    const saveName = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (file && editName.trim()) {
            const lastDotIndex = file.name.lastIndexOf('.');
            const extension = lastDotIndex !== -1 ? file.name.substring(lastDotIndex) : '';
            const finalName = editName.trim() + extension;
            const newFile = new File([file], finalName, { type: file.type });
            form.setValue(name, [newFile] as any, { shouldValidate: true });
        }
        setIsEditing(false);
    };

    const removeFile = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        form.setValue(name, null as any, { shouldValidate: true });
        setLocalError('');
        setIsEditing(false);
    };

    if (file && !localError) {
        return (
            <div className="relative flex items-center justify-between rounded-token-lg border border-border bg-bg-secondary p-4">
                <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0 pr-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <FileIcon className="h-5 w-5" />
                    </div>
                    {isEditing ? (
                        <div className="flex items-center gap-2 flex-1">
                            <div className="flex items-center flex-1 bg-bg-primary border border-border rounded overflow-hidden h-8">
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="bg-transparent py-1 px-2 text-sm w-full outline-none"
                                    autoFocus
                                    onClick={(e) => e.stopPropagation()}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') saveName(e);
                                        if (e.key === 'Escape') setIsEditing(false);
                                    }}
                                />
                                {file.name.lastIndexOf('.') !== -1 && (
                                    <span className="text-foreground-muted text-sm px-2 bg-bg-secondary border-l border-border h-full flex items-center select-none shrink-0">
                                        {file.name.substring(file.name.lastIndexOf('.'))}
                                    </span>
                                )}
                            </div>
                            <button type="button" onClick={saveName} className="p-1 text-primary hover:bg-primary/10 rounded shrink-0">
                                <Check className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col overflow-hidden flex-1 min-w-0">
                            <span className="truncate text-sm font-medium text-foreground w-full" title={file.name}>{file.name}</span>
                            <span className="text-xs text-foreground-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                    )}
                </div>
                
                {!isEditing && (
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                        <button type="button" onClick={startEditing} className="px-3 py-1.5 text-xs font-medium text-foreground-muted bg-bg-primary border border-border hover:bg-border/50 rounded-token-md transition-colors flex items-center gap-1.5">
                            <Edit2 className="h-3 w-3" />
                            Rename
                        </button>
                        <button type="button" onClick={removeFile} className="p-1.5 text-destructive hover:bg-destructive/10 rounded transition-colors" title="Remove file">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="relative flex flex-col items-center justify-center rounded-token-lg border-2 border-dashed border-border bg-bg-secondary p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <UploadCloud className="h-8 w-8 text-foreground-muted mb-2" />
            <span className="text-sm text-foreground-muted">{helperText}</span>
            {localError && <span className="text-xs text-destructive mt-2">{localError}</span>}
            <input
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
        </div>
    );
}

// ==========================================================================
// Form Sections — Each section groups related fields
// ==========================================================================

/** Personal info: name, email, phone, department, degree level, year. */
function PersonalInfoSection({ form }: { form: UseFormReturn<FormValues> }) {
    const { register, formState: { errors } } = form;

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <FormField label="Full Name" required error={errors.fullName}>
                    <input {...register('fullName')} className="input-field" placeholder="Santhosh M K" />
                </FormField>
                <FormField label="E-mail Address" required error={errors.email}>
                    <input {...register('email')} type="email" className="input-field" placeholder="connectwithsanthoshmk@gmail.com" />
                </FormField>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <FormField label="Phone number" required error={errors.phone}>
                    <input {...register('phone')} type="tel" className="input-field" placeholder="7904127446" />
                </FormField>
                <FormField label="Department" required error={errors.department}>
                    <input {...register('department')} className="input-field" placeholder="e.g. Computer Science" />
                </FormField>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <FormField label="Degree Level" required error={errors.degreeLevel}>
                    <RadioGroup options={['UG', 'PG']} registration={register('degreeLevel')} />
                </FormField>
                <FormField label="Year" required error={errors.year}>
                    <RadioGroup options={['I YEAR', 'II YEAR', 'III YEAR']} registration={register('year')} />
                </FormField>
            </div>
        </div>
    );
}

/** A single role-picker card used inside RoleSelectionSection. */
interface RoleSelectionCardProps {
    title: string;
    roles: readonly string[];
    registration: UseFormRegisterReturn;
}

function RoleSelectionCard({ title, roles, registration }: RoleSelectionCardProps) {
    return (
        <div className="space-y-3 rounded-token-lg border border-border bg-bg-secondary p-4">
            <label className="text-sm font-medium text-foreground block mb-2">{title}</label>
            {roles.map((role) => (
                <label key={role} className="flex items-center gap-3 cursor-pointer group">
                    <input
                        type="radio"
                        value={role}
                        {...registration}
                        className="h-4 w-4 rounded text-primary focus:ring-primary accent-primary"
                    />
                    <span className="text-sm text-foreground-muted group-hover:text-foreground transition-colors">
                        {role}
                    </span>
                </label>
            ))}
        </div>
    );
}

/** Internship specialization pickers (technical + non-technical). */
function RoleSelectionSection({ form }: { form: UseFormReturn<FormValues> }) {
    const { register } = form;

    return (
        <div className="space-y-6">
            <h3 className="font-clash text-lg font-semibold text-foreground">Internship Specializations</h3>
            <div className="grid gap-8 md:grid-cols-2">
                <RoleSelectionCard title="Technical Internships" roles={TECHNICAL_ROLES} registration={register('technicalInternship')} />
                <RoleSelectionCard title="Non - Technical Internships" roles={NON_TECHNICAL_ROLES} registration={register('nonTechnicalInternship')} />
            </div>
        </div>
    );
}

/** Portfolio URL, resume upload, and optional past-work upload. */
function UploadsSection({ form }: { form: UseFormReturn<FormValues> }) {
    const { register, formState: { errors } } = form;

    return (
        <div className="space-y-6">
            <FormField label="Portfolio / LinkedIn URL" required error={errors.portfolioUrl}>
                <input {...register('portfolioUrl')} type="url" className="input-field" placeholder="https://linkedin.com/in/yourprofile" />
            </FormField>

            <div className="grid gap-6 md:grid-cols-2">
                <FormField label="Resume" required error={errors.resume}>
                    <FileUpload form={form} name="resume" accept=".pdf" helperText="Upload PDF (Max 10MB)" />
                </FormField>
                <FormField label="Past Work" hint="(Optional)">
                    <FileUpload form={form} name="pastWork" helperText="Upload File (Max 10MB)" />
                </FormField>
            </div>
        </div>
    );
}

// ==========================================================================
// Form Footer & Success View
// ==========================================================================

/** Sticky submit / cancel buttons at the bottom of the modal. */
function FormFooter({ isSubmitting, onCancel, onReset }: { isSubmitting: boolean; onCancel: () => void; onReset: () => void }) {
    return (
        <div className="sticky bottom-0 -ml-6 -mr-4 -mb-6 mt-8 border-t border-border bg-bg-primary/80 p-6 backdrop-blur-md flex justify-between items-center gap-4">
            <button type="button" onClick={onReset} className="text-sm font-medium text-foreground-muted hover:text-destructive transition-colors" disabled={isSubmitting}>
                Reset Form
            </button>
            <div className="flex gap-4">
                <button type="button" onClick={onCancel} className="btn-secondary" disabled={isSubmitting}>
                    Cancel
                </button>
                <button type="submit" className="btn-accent min-w-[140px]" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    ) : (
                        'Submit Application'
                    )}
                </button>
            </div>
        </div>
    );
}

/** Animated confirmation shown after successful submission. */
function SuccessView({ onClose }: { onClose: () => void }) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center py-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="mb-2 font-clash text-3xl font-semibold text-foreground">Application Submitted</h3>
            <p className="text-foreground-muted max-w-md">
                Thank you for applying to MergeX! Our team will review your application and get back to you soon.
            </p>
            <button onClick={onClose} className="btn-primary mt-8">Close Window</button>
        </motion.div>
    );
}

// ==========================================================================
// ApplicationForm — Composes all sections into the form layout
// ==========================================================================

interface ApplicationFormProps {
    form: UseFormReturn<FormValues>;
    onSubmit: (data: FormValues) => void;
    onCancel: () => void;
    onReset: () => void;
}

function ApplicationForm({ form, onSubmit, onCancel, onReset }: ApplicationFormProps) {
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <PersonalInfoSection form={form} />
            <div className="h-px w-full bg-border" />
            <RoleSelectionSection form={form} />
            <div className="h-px w-full bg-border" />
            <UploadsSection form={form} />
            <FormFooter isSubmitting={form.formState.isSubmitting} onCancel={onCancel} onReset={onReset} />
        </form>
    );
}

// ==========================================================================
// ApplyModal — Root modal (portal, backdrop, scroll lock, animation)
// ==========================================================================

interface ApplyModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultRole?: string;
}

export function ApplyModal({ isOpen, onClose, defaultRole }: ApplyModalProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            technicalInternship: defaultRole && (TECHNICAL_ROLES as readonly string[]).includes(defaultRole) ? defaultRole : undefined,
            nonTechnicalInternship: defaultRole && (NON_TECHNICAL_ROLES as readonly string[]).includes(defaultRole) ? defaultRole : undefined,
        },
    });

    // Reset form and manage body scroll when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setIsSubmitted(false);
            
            // Try to load saved data, otherwise use defaults
            let initialData: Partial<FormValues> = {
                technicalInternship: defaultRole && (TECHNICAL_ROLES as readonly string[]).includes(defaultRole) ? defaultRole : undefined,
                nonTechnicalInternship: defaultRole && (NON_TECHNICAL_ROLES as readonly string[]).includes(defaultRole) ? defaultRole : undefined,
            };

            try {
                const savedData = localStorage.getItem(FORM_STORAGE_KEY);
                if (savedData) {
                    initialData = { ...initialData, ...JSON.parse(savedData) };
                }
            } catch (e) {
                console.error('Failed to parse saved form data', e);
            }

            form.reset(initialData);

            // Prevent background scrolling
            document.body.style.overflow = 'hidden';
            // If Lenis is used, this helps pause it or prevent double scrollbars
            document.documentElement.classList.add('lenis-stopped');
        } else {
            document.body.style.overflow = '';
            document.documentElement.classList.remove('lenis-stopped');
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.classList.remove('lenis-stopped');
        };
    }, [isOpen, defaultRole, form]);

    // Save data on change
    useEffect(() => {
        const subscription = form.watch((value) => {
            if (Object.keys(value).length > 0) {
                const { resume, pastWork, ...serializableData } = value;
                localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(serializableData));
            }
        });
        return () => subscription.unsubscribe();
    }, [form]);

    const handleReset = () => {
        localStorage.removeItem(FORM_STORAGE_KEY);
        form.reset({
            fullName: '',
            email: '',
            phone: '',
            department: '',
            degreeLevel: undefined,
            year: undefined,
            technicalInternship: defaultRole && (TECHNICAL_ROLES as readonly string[]).includes(defaultRole) ? defaultRole : undefined,
            nonTechnicalInternship: defaultRole && (NON_TECHNICAL_ROLES as readonly string[]).includes(defaultRole) ? defaultRole : undefined,
            resume: undefined,
            pastWork: undefined,
            portfolioUrl: '',
        });
    };

    const onSubmit = async (data: FormValues) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Form data:', data);
        localStorage.removeItem(FORM_STORAGE_KEY);
        setIsSubmitted(true);
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-12"
                    data-lenis-prevent="true"
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Panel */}
                    <motion.div
                        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-token-xl border border-border bg-bg-primary shadow-2xl"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-border p-6 bg-bg-secondary shrink-0">
                            <div>
                                <h2 className="font-clash text-2xl font-semibold text-foreground">
                                    MergeX Internship Application
                                </h2>
                                <p className="text-sm text-foreground-muted mt-1">
                                    Join the MergeX ecosystem. Submit your details below to get started.
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 text-foreground-muted transition-colors hover:bg-bg-tertiary hover:text-foreground"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div
                            className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar pr-4"
                            data-lenis-prevent="true"
                        >
                            {isSubmitted ? (
                                <SuccessView onClose={onClose} />
                            ) : (
                                <ApplicationForm form={form} onSubmit={onSubmit} onCancel={onClose} onReset={handleReset} />
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
