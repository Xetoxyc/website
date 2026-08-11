import type { ComponentProps, ReactNode } from "react";

// Utility-styled elements shared by the legal pages (Impressum, Datenschutz).
export const H1 = (p: ComponentProps<"h1">) => <h1 className="text-[clamp(1.6rem,5vw,2.2rem)] mb-2 tracking-[-0.01em]" {...p} />;
export const H2 = (p: ComponentProps<"h2">) => <h2 className="text-[1.15rem] mt-8 mb-[0.6rem] tracking-[-0.01em]" {...p} />;
export const H3 = (p: ComponentProps<"h3">) => <h3 className="text-base mt-5 mb-[0.4rem]" {...p} />;
export const P = (p: ComponentProps<"p">) => <p className="text-text-soft mb-[0.6rem] max-w-[70ch]" {...p} />;
export const UL = (p: ComponentProps<"ul">) => <ul className="list-disc pl-[1.2rem] mb-[0.8rem]" {...p} />;
export const LI = (p: ComponentProps<"li">) => <li className="text-text-soft mb-[0.3rem] max-w-[70ch] marker:text-accent" {...p} />;
export const A = (p: ComponentProps<"a">) => <a className="text-accent hover:underline break-words" {...p} />;

export const Block = ({ children }: { children: ReactNode }) => (
  <div className="bg-bg-card border border-border rounded-lg px-[1.2rem] py-4 font-mono text-[0.9rem] text-text leading-[1.8] whitespace-pre-wrap mb-4">
    {children}
  </div>
);

export const Rule = () => (
  <hr className="border-0 h-0.5 rounded-sm my-[1.6rem] mx-6 bg-[linear-gradient(90deg,transparent_0%,var(--color-accent)_30%,var(--color-accent-2)_70%,transparent_100%)]" />
);
