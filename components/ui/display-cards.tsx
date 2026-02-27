"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-white/70" />,
  title = "Strategy",
  description = "Transform your go-to-market",
  date = "01",
  iconClassName = "text-white/35",
  titleClassName = "text-white",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        // `group` drives hover states on children
        // `relative` anchors the before: overlay correctly
        "group relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between",
        "border bg-[#0d0d0d] backdrop-blur-sm px-4 py-3",
        "transition-all duration-700",
        // Right-edge gradient creates the card-tuck stacking illusion.
        // z-[2] keeps it above content; pointer-events-none so it doesn't block hover.
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:z-[2]",
        "after:bg-gradient-to-l after:from-black after:to-transparent after:content-[''] after:pointer-events-none",
        "hover:border-white/40",
        "border-white/15",
        className
      )}
    >
      {/*
        All three rows get `relative z-[1]` so they paint ABOVE the `before:` overlay
        (which is position:absolute with no z-index → z-index:auto → below z:1).
        The overlay still dims the card background for depth, but never covers the text.
      */}

      {/* Row 1: icon + title */}
      <div className="relative z-[1] flex items-center gap-2">
        <span className="relative inline-block bg-white/10 p-1">
          {icon}
        </span>
        <p className={cn("text-sm font-bold tracking-[0.12em] uppercase", titleClassName)}>
          {title}
        </p>
      </div>

      {/* Row 2: description — starts faint, brightens clearly on hover */}
      <p className="relative z-[1] flex items-center gap-2 whitespace-nowrap text-sm font-medium text-white/25 transition-colors duration-300 group-hover:text-white/85">
        {description}
      </p>

      {/* Row 3: date / service number */}
      <p className={cn("relative z-[1] flex items-center gap-2 font-mono text-xs", iconClassName)}>
        {date}
      </p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      className: [
        "[grid-area:stack] hover:-translate-y-10",
        "before:absolute before:w-[100%] before:outline-1 before:outline-border",
        "before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/60",
        "before:left-0 before:top-0",
        "hover:before:opacity-0 before:transition-opacity before:duration-700",
      ].join(" "),
    },
    {
      className: [
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1",
        "before:absolute before:w-[100%] before:outline-1 before:outline-border",
        "before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/40",
        "before:left-0 before:top-0",
        "hover:before:opacity-0 before:transition-opacity before:duration-700",
      ].join(" "),
    },
    {
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards ?? defaultCards;

  return (
    // place-items-start anchors all stacked cards at the same top-left corner.
    // Translated cards then flow right+down, which we give room for via the
    // pb-28 pr-28 wrapper in page.tsx.
    <div className="grid [grid-template-areas:'stack'] place-items-start animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
