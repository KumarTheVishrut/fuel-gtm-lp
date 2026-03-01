"use client";

interface Logo {
  name?: string;
  src?: string;
  alt?: string;
  svg?: React.ReactNode;
  imgClassName?: string;
}

interface LogoCloudProps {
  logos: Logo[];
}

export function LogoCloud({ logos }: LogoCloudProps) {
  const doubled = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

      <div
        className="flex items-center gap-16"
        style={{
          width: "max-content",
          animation: "marquee 25s linear infinite",
        }}
      >
        {doubled.map((logo, i) =>
          logo.svg ? (
            <div key={i} className="shrink-0 h-12 w-auto opacity-35 flex items-center">
              {logo.svg}
            </div>
          ) : logo.src ? (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt ?? ""}
              className={`shrink-0 w-auto opacity-35 grayscale invert ${logo.imgClassName ?? "h-12"}`}
            />
          ) : (
            <span
              key={i}
              className="shrink-0 font-bold uppercase tracking-[0.15em] text-[2.2rem] opacity-35"
            >
              {logo.name}
            </span>
          )
        )}
      </div>
    </div>
  );
}
