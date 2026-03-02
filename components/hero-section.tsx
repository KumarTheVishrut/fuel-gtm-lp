"use client";

import { cn } from "@/lib/utils";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { ArrowRightIcon, SignalIcon } from "lucide-react";
import { motion } from "framer-motion";

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

      {/* Main content — center-aligned with premium vertical padding */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center justify-center gap-8 pt-48 pb-32"
      >
        {/* Frontline intelligence badge — JetBrains Mono via font-mono */}
        <motion.div variants={fadeUp} custom={0} className="flex justify-center">
          <a
            href="#services"
            className={cn(
              "animate-float group inline-flex items-center gap-3",
              "border border-white/20 bg-white/[0.04] px-4 py-1.5",
              "font-mono text-xs tracking-[0.2em] uppercase",
              "transition-all duration-300 hover:border-white/40 hover:bg-white/[0.07]"
            )}
          >
            <SignalIcon className="size-3 text-white/40" />
            <span className="text-white/60 transition-colors duration-200 group-hover:text-white/80">
              Frontline intelligence, now available
            </span>
            <ArrowRightIcon className="size-3 text-white/40 duration-150 group-hover:translate-x-0.5 group-hover:text-white/60" />
          </a>
        </motion.div>

        {/* H1 — Inter 800, 8rem, -0.04em, uppercase */}
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="text-center font-extrabold uppercase leading-none tracking-[-0.04em]"
          style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
        >
          GTM Architecture.
        </motion.h1>

        {/* Sub-headline — JetBrains Mono, muted #888888 */}
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mx-auto max-w-xl text-center text-sm leading-relaxed tracking-wider font-mono"
          style={{ color: "#888888" }}
        >
          A multi-disciplinary consultancy for SaaS and complex tech.
          <br />
          We refine your ICP, build your sales team, and execute
          <br />
          outbound engines through direct frontline intelligence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          custom={3}
          className="flex flex-row flex-wrap items-center justify-center gap-3 pt-2"
        >
          {/* Primary — white bg, black text */}
          <motion.a
            href="mailto:don@fuel-bd.com"
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

          {/* Secondary — transparent bg, solid white border */}
          <motion.a
            href="#services"
            className="px-7 py-3 bg-transparent text-white text-xs font-bold tracking-[0.15em] uppercase border border-white"
            whileHover={{
              backgroundColor: "rgba(255,255,255,0.06)",
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
    <section className="relative space-y-7 border-t border-white/10 pt-12 pb-20">
      <p className="text-center font-mono text-xs tracking-[0.25em] uppercase" style={{ color: "#ffffff" }}>
        Trusted By
      </p>
      <div className="relative z-10 mx-auto max-w-6xl">
        <LogoCloud logos={logos} />
      </div>
    </section>
  );
}

const logos = [
  {
    svg: (
      <svg width="72" height="72" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.0673828 45.1145V26.5568C0.0673828 23.8272 1.38269 21.2643 3.60129 19.6709L27.6112 2.42687C29.1549 1.31814 31.0081 0.72168 32.9094 0.72168H32.9851C34.9592 0.72168 36.8685 1.33602 38.4593 2.47874C43.7448 6.2754 56.2521 15.2574 62.3985 19.6713C64.6172 21.2646 65.9323 23.8272 65.9323 26.5568V41.4429C65.9323 44.1725 64.6165 46.7349 62.3971 48.3273L38.41 65.5383C36.8333 66.6695 34.941 67.2781 32.9998 67.2781C31.0515 67.2781 29.1528 66.6685 27.5695 65.5345C24.4301 63.286 19.382 59.6608 19.382 59.6608V36.7552C19.382 36.454 19.7233 36.2792 19.9682 36.455L32.7838 45.6581C32.9128 45.7508 33.0868 45.7508 33.2159 45.6581L49.0324 34.3001C49.2378 34.1525 49.2378 33.8472 49.0324 33.6997L33.2159 22.3417C33.0868 22.2489 32.9128 22.2489 32.7838 22.3417L0.653597 45.4147C0.408749 45.5906 0.0673828 45.4158 0.0673828 45.1145Z" fill="white"/>
      </svg>
    ),
  },
  { src: "https://cdn.prod.website-files.com/6852e9ba3916be9a10af657f/6983c686c43acdce069472ba_Group%2015.svg", alt: "Glimpse Logo" },
  { src: "https://app.ashbyhq.com/api/images/org-theme-wordmark/85c537e4-cb06-48eb-b1f1-9d7b1d7b977e/d6784893-307b-43a0-a3f0-dd8240890444/28767dd9-0650-494a-8ebb-3fefba32a67b.png", alt: "GovDash Logo" },
  { src: "https://dzh2zima160vx.cloudfront.net/logo/655e18f11661c16ae9c30773428afd08_304_160?Expires=1861920000&Signature=nFnS249edVaQgtOlCHN4OtOsW9tam5I3D1kF-bQrJotFB~QgoqxwdMPIW6DnZElEBzB2S-ZcIQw5ZUqwXdKf-3ahZ47l98XfdzVn0tfhsIh5fWdRvk4eXqRbo0r6Emn~M-TmUOKZdfiHfOW8gymT~gNJ1lPMKcaR-4m~K7Dcdl-G1ZgdX1PkYzyR4lPS572XoI4MCow~Qt0EQ-VH9ETk4wdr~0gabkmM6vhzub0arlXT92rLW3sZy2p8CRQTUSPw1KZp3AejuvrllV3WWrfh-g3bBRBwxLEHKynKfkDD84n7fkME8m2e-1cyWA~Vn8CLg5moNmdOVZuggn-Q~m90jA__&Key-Pair-Id=APKAII5OVX4LZ3WT422Q", alt: "Endeavor Logo", imgClassName: "h-36" },
  { src: "https://group.softbank/media/Project/sbg/sbg/themes/custom/sbg/sbg-logo.svg", alt: "SoftBank Logo" },
  { src: "https://mma.prnewswire.com/media/2106994/drivepoint_logo_primary_Logo.jpg", alt: "Drivepoint Logo" },
  { src: "https://media.licdn.com/dms/image/v2/D4E0BAQHlOVyBe6zDNA/company-logo_200_200/B4EZlMDXb9GUAI-/0/1757917575361/findarbor_logo?e=1773878400&v=beta&t=OQhFbDF5KEHHkN84x0TEH0Z3NE6yj6rRCn-ZtAR5s4k", alt: "Arbor Logo" },
  { src: "https://www.siriusxm.com/content/dam/sxm-com/corporate/corp-com/media-assets/brand-logo---icons/SiriusXM%20WORDMARK%20BLACK%20RGB.png", alt: "SiriusXM Logo" },
  { src: "https://mma.prnewswire.com/media/2649780/CHORD_Logo.jpg", alt: "Chord Logo" },

];
