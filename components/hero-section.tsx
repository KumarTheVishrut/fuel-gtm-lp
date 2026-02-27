"use client";

import { cn } from "@/lib/utils";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { ArrowRightIcon, SignalIcon } from "lucide-react";
import { motion } from "framer-motion";

// ── Matches site-wide easing ─────────────────────────────────
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function HeroSection() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-6">
      {/* Radial top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -top-14 -z-10 hidden lg:block"
        style={{
          background:
            "radial-gradient(35% 60% at 50% 0%, rgba(255,255,255,0.07), transparent)",
        }}
      />

      {/* Outer column rails */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      {/* Main content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center justify-center gap-6 pt-36 pb-24"
      >
        {/* Signal badge — outer motion.div for entrance, inner <a> floats via CSS */}
        <motion.div variants={fadeUp} custom={0} className="flex justify-center">
          <a
            href="#services"
            className="animate-float group inline-flex items-center gap-3 border border-white/20 bg-white/[0.04] px-4 py-1.5 text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:border-white/40 hover:bg-white/[0.07]"
          >
            <SignalIcon className="size-3 text-white/40" />
            <span className="text-white/60 transition-colors duration-200 group-hover:text-white/80">
              Frontline intelligence, now available
            </span>
            <ArrowRightIcon className="size-3 text-white/40 duration-150 group-hover:translate-x-0.5 group-hover:text-white/60" />
          </a>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="text-center font-black uppercase leading-[0.92] tracking-tight"
          style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
        >
          GTM Architecture.
        </motion.h1>

        {/* Sub-headline — mono, secondary */}
        <motion.p
          variants={fadeUp}
          custom={2}
          className={cn(
            "mx-auto max-w-xl text-center text-sm leading-relaxed tracking-wider",
            "font-mono text-white/55"
          )}
        >
          A multi-disciplinary consultancy for SaaS and complex tech.
          <br />
          We refine your ICP, build your sales team, and execute
          <br />
          outbound engines through direct frontline intelligence.
        </motion.p>

        {/* CTAs — with hover depth */}
        <motion.div
          variants={fadeUp}
          custom={3}
          className="flex flex-row flex-wrap items-center justify-center gap-3 pt-2"
        >
          <motion.a
            href="mailto:donp@fuel-bd.com"
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-black text-xs font-bold tracking-[0.15em] uppercase border border-white"
            whileHover={{
              backgroundColor: "#000000",
              color: "#ffffff",
              boxShadow: "0 0 40px rgba(255,255,255,0.12)",
            }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            Consult with an Operator
            <ArrowRightIcon className="size-3.5" />
          </motion.a>
          <motion.a
            href="#services"
            className="px-7 py-3 bg-transparent text-white text-xs font-bold tracking-[0.15em] uppercase border border-white/30"
            whileHover={{
              borderColor: "rgba(255,255,255,1)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)",
            }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            View Service Arms
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function LogosSection() {
  return (
    <section className="relative space-y-5 border-t border-white/10 pt-8 pb-12">
      <p className="text-center font-mono text-xs tracking-[0.25em] uppercase text-white/35">
        Trusted By 
      </p>
      <div className="relative z-10 mx-auto max-w-4xl">
        <LogoCloud logos={logos} />
      </div>
    </section>
  );
}

const logos = [
  { src: "https://storage.efferd.com/logo/nvidia-wordmark.svg", alt: "Nvidia Logo" },
  { src: "https://storage.efferd.com/logo/supabase-wordmark.svg", alt: "Supabase Logo" },
  { src: "https://storage.efferd.com/logo/openai-wordmark.svg", alt: "OpenAI Logo" },
  { src: "https://storage.efferd.com/logo/turso-wordmark.svg", alt: "Turso Logo" },
  { src: "https://storage.efferd.com/logo/vercel-wordmark.svg", alt: "Vercel Logo" },
  { src: "https://storage.efferd.com/logo/github-wordmark.svg", alt: "GitHub Logo" },
  { src: "https://storage.efferd.com/logo/claude-wordmark.svg", alt: "Claude AI Logo" },
  { src: "https://storage.efferd.com/logo/clerk-wordmark.svg", alt: "Clerk Logo" },
];
