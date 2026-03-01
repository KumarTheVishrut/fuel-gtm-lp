"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  /** Initial x offset in px (replaces translate-x-* CSS classes) */
  x?: number;
  /** Initial y offset in px (replaces translate-y-* CSS classes) */
  y?: number;
  /** Target y in px on hover — Framer Motion handles this, no CSS :hover needed */
  hoverY?: number;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-white/70" />,
  title = "Strategy",
  description = "Transform your go-to-market",
  date = "01",
  iconClassName = "text-white/35",
  titleClassName = "text-white",
  x = 0,
  y = 0,
  hoverY,
}: DisplayCardProps) {
  return (
    <motion.div
      // Framer Motion handles positioning + hover — no CSS translate needed.
      // whileHover preserves the x value automatically; only y changes.
      animate={{ x, y }}
      whileHover={hoverY !== undefined ? { y: hoverY } : undefined}
      transition={{ duration: 0.45, ease: EASE }}
      className={cn(
        // `group` drives hover states on children (description brightness etc.)
        "group relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between",
        "border bg-[#0d0d0d] backdrop-blur-sm px-4 py-3",
        // transition-colors only — Framer Motion owns the transform transition
        "transition-colors duration-300",
        // Right-edge gradient creates the card-tuck stacking illusion
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:z-[2]",
        "after:bg-gradient-to-l after:from-black after:to-transparent after:content-[''] after:pointer-events-none",
        "hover:border-white/40 border-white/15",
        className
      )}
    >
      {/* Row 1: icon + title */}
      <div className="relative z-[1] flex items-center gap-2">
        <span className="relative inline-block bg-white/10 p-1">
          {icon}
        </span>
        <p className={cn("text-sm font-bold tracking-[0.12em] uppercase", titleClassName)}>
          {title}
        </p>
      </div>

      {/* Row 2: description — faint, brightens on hover */}
      <p className="relative z-[1] flex items-center gap-2 whitespace-nowrap text-sm font-medium text-white/25 transition-colors duration-300 group-hover:text-white/85">
        {description}
      </p>

      {/* Row 3: service number */}
      <p className={cn("relative z-[1] flex items-center gap-2 font-mono text-xs", iconClassName)}>
        {date}
      </p>
    </motion.div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      x: 0, y: 0, hoverY: -40,
      className: [
        "[grid-area:stack]",
        "before:absolute before:w-[100%] before:outline-1 before:outline-border",
        "before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/60",
        "before:left-0 before:top-0",
        "hover:before:opacity-0 before:transition-opacity before:duration-700",
      ].join(" "),
    },
    {
      x: 64, y: 40, hoverY: -4,
      className: [
        "[grid-area:stack]",
        "before:absolute before:w-[100%] before:outline-1 before:outline-border",
        "before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/40",
        "before:left-0 before:top-0",
        "hover:before:opacity-0 before:transition-opacity before:duration-700",
      ].join(" "),
    },
    {
      x: 128, y: 80, hoverY: 40,
      className: "[grid-area:stack]",
    },
  ];

  const displayCards = cards ?? defaultCards;

  return (
    // place-items-start anchors all stacked cards at the same top-left origin.
    // Framer Motion then offsets each card via x/y transforms.
    <div className="grid [grid-template-areas:'stack'] place-items-start">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
