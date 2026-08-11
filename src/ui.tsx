import type { ReactNode } from "react";

// Reusable, Tailwind-styled primitives. No CSS component classes.

const btnBase =
  "inline-flex items-center gap-2 px-[1.05rem] py-[0.62rem] rounded-lg font-semibold text-[0.95rem] border cursor-pointer transition-[color,border-color,background-color,transform] duration-150 active:translate-y-px no-underline";

export const btn = `${btnBase} border-border bg-bg-card text-text hover:border-accent`;
export const btnPrimary = `${btnBase} border-accent bg-accent text-accent-ink hover:brightness-110`;

// Content container.
export const wrap = "w-full max-w-[64rem] mx-auto px-[clamp(1rem,4vw,2rem)]";

// Header toggle buttons.
const toggleBase =
  "inline-flex items-center justify-center h-[2.1rem] border border-border bg-bg-card text-text-soft rounded-lg cursor-pointer leading-none hover:text-accent hover:border-accent no-underline";
export const themeToggle = `${toggleBase} w-[2.1rem] text-base`;
export const langToggle = `${toggleBase} w-auto px-[0.6rem] font-mono text-[0.78rem] font-semibold tracking-[0.04em]`;

export function Badge({ children, variant = "plain" }: { children: ReactNode; variant?: "oss" | "plain" }) {
  const color = variant === "oss" ? "text-accent-2 border-accent-2" : "text-text-mute border-border";
  return (
    <span className={`font-mono text-[0.68rem] uppercase tracking-[0.05em] px-[0.45rem] py-[0.15rem] rounded border ${color}`}>
      {children}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="font-mono text-[0.82rem] px-[0.6rem] py-[0.28rem] border border-border rounded-full text-text-soft bg-bg-soft">
      {children}
    </li>
  );
}

export function SectionHead({ index, title, lead }: { index: string; title: string; lead?: string }) {
  return (
    <div className="mb-7">
      <h2
        data-index={index}
        className="flex items-baseline gap-[0.6rem] text-[clamp(1.4rem,4vw,1.9rem)] tracking-[-0.01em] before:content-[attr(data-index)] before:font-mono before:text-[0.8rem] before:font-semibold before:text-accent"
      >
        {title}
      </h2>
      {lead && <p className="text-text-soft mt-[0.35rem] max-w-[52ch]">{lead}</p>}
    </div>
  );
}
