export function HomeHero() {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-6 bg-background">
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-foreground-muted mb-6">
                The Scaling Ecosystem
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center leading-[0.95] tracking-tight max-w-5xl">
                Scale is not luck.
                <br />
                <span className="text-primary">It&apos;s structure.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-foreground-muted max-w-2xl text-center leading-relaxed">
                We build the infrastructure that helps ambitious businesses
                scale with clarity, precision, and zero friction.
            </p>
            <div className="mt-12 flex gap-4">
                <a
                    href="/diagnostic"
                    className="px-8 py-3.5 bg-foreground text-background rounded-none text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                    Book a Diagnostic Call
                </a>
                <a
                    href="/methodology"
                    className="px-8 py-3.5 border border-border rounded-none text-sm font-semibold hover:bg-background-subtle transition-colors"
                >
                    Our Methodology
                </a>
            </div>
        </section>
    );
}
