"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";
import { Target, Users, Radar, ArrowRight, Tag, BarChart2 } from "lucide-react";
import { HeroSection, LogosSection } from "@/components/hero-section";
import DisplayCards, { type DisplayCardProps } from "@/components/ui/display-cards";
import { useEffect, useRef, useState } from "react";

// ── Single easing curve used site-wide ──────────────────────
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
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

// ── Hooks ────────────────────────────────────────────────────
function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

// ── TiltCard — 3D perspective hover ─────────────────────────
function TiltCard({
  children,
  className,
  variants,
  custom,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  custom?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), {
    stiffness: 240,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), {
    stiffness: 240,
    damping: 28,
  });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      custom={custom}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{
        borderColor: "rgba(255,255,255,0.5)",
        boxShadow: "0 24px 60px rgba(255,255,255,0.04)",
        zIndex: 1,
      }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        willChange: "transform",
        position: "relative",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── FUEL service cards for the stacked display ───────────────
const fuelServiceCards: DisplayCardProps[] = [
  {
    icon: <Target className="size-4 text-white/70" />,
    title: "GTM Messaging",
    description: "Position your product to win the room.",
    date: "01",
    iconClassName: "text-white/35",
    titleClassName: "text-white",
    className: [
      "[grid-area:stack] hover:-translate-y-10",
      "before:absolute before:w-[100%] before:outline-1 before:outline-border",
      "before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/60",
      "before:left-0 before:top-0",
      "hover:before:opacity-0 before:transition-opacity before:duration-700",
    ].join(" "),
  },
  {
    icon: <Tag className="size-4 text-white/70" />,
    title: "Pricing & Packaging",
    description: "Structure deals engineered to close.",
    date: "02",
    iconClassName: "text-white/35",
    titleClassName: "text-white",
    className: [
      "[grid-area:stack] translate-x-8 translate-y-8 hover:-translate-y-1",
      "before:absolute before:w-[100%] before:outline-1 before:outline-border",
      "before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/45",
      "before:left-0 before:top-0",
      "hover:before:opacity-0 before:transition-opacity before:duration-700",
    ].join(" "),
  },
  {
    icon: <Users className="size-4 text-white/70" />,
    title: "Sales Hiring",
    description: "Build your GTM team from scratch.",
    date: "03",
    iconClassName: "text-white/35",
    titleClassName: "text-white",
    className: [
      "[grid-area:stack] translate-x-16 translate-y-16 hover:-translate-y-1",
      "before:absolute before:w-[100%] before:outline-1 before:outline-border",
      "before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/25",
      "before:left-0 before:top-0",
      "hover:before:opacity-0 before:transition-opacity before:duration-700",
    ].join(" "),
  },
  {
    icon: <BarChart2 className="size-4 text-white/70" />,
    title: "Board-Facing Planning",
    description: "Narratives that move capital.",
    date: "04",
    iconClassName: "text-white/35",
    titleClassName: "text-white",
    className:
      "[grid-area:stack] translate-x-24 translate-y-24 hover:translate-y-14",
  },
];

// ── Page ─────────────────────────────────────────────────────
export default function Home() {
  const scrolled = useScrolled();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ── STICKY NAV — shrinks + glazes on scroll ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        animate={{
          backgroundColor: scrolled ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,1)",
          borderBottomColor: scrolled
            ? "rgba(255,255,255,0.12)"
            : "rgba(255,255,255,1)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{ borderBottomWidth: "1px", borderBottomStyle: "solid" }}
      >
        <motion.div
          className="max-w-7xl mx-auto px-6 flex items-center justify-between"
          animate={{ height: scrolled ? "2.75rem" : "3.5rem" }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <motion.span
            className="font-black tracking-[0.25em]"
            animate={{ fontSize: scrolled ? "0.95rem" : "1.25rem" }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            FUEL
          </motion.span>
          <a
            href="mailto:donp@fuel-bd.com"
            className="px-5 py-2 bg-white text-black text-xs font-bold tracking-[0.15em] hover:bg-black hover:text-white border border-white transition-colors duration-200"
          >
            CONSULT
          </a>
        </motion.div>
      </motion.nav>

      {/* ── HERO + LOGOS ── */}
      <div className="relative overflow-hidden pt-14">
        <HeroSection />
        <LogosSection />
      </div>

      {/* ── SECTION 2: THREE PILLARS ── */}
      <section id="services" className="py-28 px-6 border-b border-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="font-mono text-xs tracking-[0.3em] uppercase mb-12"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              — Service Arms
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/20">
              {[
                {
                  icon: <Target size={24} strokeWidth={1.5} />,
                  title: <>OUTBOUND<br />EXECUTION.</>,
                  body: "We don\u2019t just find leads; we navigate complex sales motions and refine your ICP to spark qualified conversations.",
                  custom: 1,
                },
                {
                  icon: <Users size={24} strokeWidth={1.5} />,
                  title: <>ELITE<br />RECRUITING.</>,
                  body: "A dedicated headhunting arm focused on sourcing high-performance sales leaders and GTM operators.",
                  custom: 2,
                },
                {
                  icon: <Radar size={24} strokeWidth={1.5} />,
                  title: <>INSIGHTS &<br />AUTOMATION.</>,
                  body: "Proprietary tech packages and automation bots providing granular frontline intelligence on your TAM.",
                  custom: 3,
                },
              ].map(({ icon, title, body, custom }) => (
                <TiltCard
                  key={custom}
                  variants={fadeUp}
                  custom={custom}
                  className="bg-black p-10 border border-white/20 flex flex-col gap-8"
                >
                  <div style={{ color: "rgba(255,255,255,0.45)" }}>{icon}</div>
                  <div>
                    <h2 className="text-lg font-black tracking-[0.08em] uppercase mb-3 leading-tight">
                      {title}
                    </h2>
                    <p className="font-mono text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {body}
                    </p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: THE EDGE ── */}
      <section className="py-28 px-6 border-b border-white bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="font-mono text-xs tracking-[0.3em] uppercase mb-8"
              style={{ color: "rgba(0,0,0,0.35)" }}
            >
              — The Edge
            </motion.p>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-black leading-[0.95] tracking-tight uppercase mb-10"
              style={{ fontSize: "clamp(2.5rem,6vw,5.5rem)" }}
            >
              Intelligence<br />from the<br />Frontlines.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-mono text-sm leading-relaxed max-w-2xl"
              style={{ color: "rgba(0,0,0,0.5)" }}
            >
              We gain granular insights into your market by engaging directly with
              operators. We see how your product fits the market pulse because we are
              in the trenches, not just analyzing data.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: STRATEGIC SERVICES ── */}
      {/* No overflow-hidden — the stacked cards translate outside the grid area.
          overflow-x: hidden on body (globals.css) prevents horizontal scroll. */}
      <section className="pt-28 pb-56 px-6 border-b border-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="font-mono text-xs tracking-[0.3em] uppercase mb-16"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              — Strategic Services
            </motion.p>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-16 lg:gap-8">
              {/* Left: numbered editorial list */}
              <div className="flex flex-col gap-6 flex-shrink-0">
                {[
                  { num: "01", label: "GTM Messaging Strategy" },
                  { num: "02", label: "Pricing & Packaging" },
                  { num: "03", label: "Sales Hiring Frameworks" },
                  { num: "04", label: "Board-Facing Planning" },
                ].map(({ num, label }, i) => (
                  <motion.div
                    key={num}
                    variants={fadeUp}
                    custom={i + 1}
                    className="flex items-baseline gap-5"
                  >
                    <span
                      className="font-mono text-xs flex-shrink-0"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                    >
                      {num}
                    </span>
                    <span className="text-2xl font-black uppercase tracking-tight leading-tight">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Right: stacked DisplayCards interactive visual.
                  pb-24 pr-24 gives the translated cards (translate-x/y-24 = 96px)
                  space to paint without being clipped by the flex container. */}
              <motion.div
                variants={fadeUp}
                custom={5}
                className="w-full lg:w-auto flex justify-center lg:justify-start pb-24 pr-6 lg:pr-0"
              >
                <DisplayCards cards={fuelServiceCards} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5: MODELS BANNER + FINAL CTA ── */}
      <section className="py-28 px-6 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="font-mono text-xs tracking-[0.3em] uppercase mb-10"
              style={{ color: "rgba(0,0,0,0.35)" }}
            >
              — Engagement Models
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={1}
              className="bg-black text-white p-10 mb-20"
            >
              <p
                className="font-mono text-xs tracking-[0.25em] uppercase mb-5"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                — Flexible Models
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                {["PAY-PER-MEETING", "PROFIT SHARE", "EQUITY"].map((model, i) => (
                  <span
                    key={model}
                    className="font-black uppercase leading-none"
                    style={{ fontSize: "clamp(1.2rem,3vw,2.25rem)" }}
                  >
                    {model}
                    {i < 2 && (
                      <span style={{ color: "rgba(255,255,255,0.2)" }}> /</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={2}
              className="border-t border-black/20 pt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-10"
            >
              <h2
                className="font-black uppercase tracking-tight leading-none"
                style={{ fontSize: "clamp(2rem,5vw,4.5rem)" }}
              >
                REFINE YOUR<br />MARKET MOTION.
              </h2>

              <div className="flex flex-col items-start md:items-end gap-4">
                <motion.a
                  href="mailto:donp@fuel-bd.com"
                  className="px-8 py-4 bg-black text-white text-xs font-bold tracking-[0.15em] uppercase border border-black flex items-center gap-2.5"
                  whileHover={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    boxShadow: "0 0 0 1px #000000",
                  }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  Consult with an Operator
                  <ArrowRight size={13} />
                </motion.a>
                <a
                  href="mailto:donp@fuel-bd.com"
                  className="font-mono text-xs tracking-widest hover:opacity-80 transition-opacity duration-200"
                  style={{ color: "rgba(0,0,0,0.4)" }}
                >
                  donp@fuel-bd.com
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 border-t border-white bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className="font-mono text-xs tracking-[0.3em]"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            FUEL &copy; {new Date().getFullYear()}
          </span>
          <span
            className="font-mono text-xs tracking-[0.2em]"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            GTM ARCHITECTURE FOR SAAS &amp; COMPLEX TECH
          </span>
        </div>
      </footer>
    </div>
  );
}
