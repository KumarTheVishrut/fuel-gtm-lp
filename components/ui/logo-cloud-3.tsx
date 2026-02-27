"use client";

interface Logo {
  src: string;
  alt: string;
}

interface LogoCloudProps {
  logos: Logo[];
}

export function LogoCloud({ logos }: LogoCloudProps) {
  const doubled = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

      <div className="flex animate-marquee items-center gap-12">
        {doubled.map((logo, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-5 w-auto opacity-40 grayscale invert"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
