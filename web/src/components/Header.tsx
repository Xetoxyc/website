import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { t, type Lang } from "../i18n";
import { wrap, themeToggle, langToggle } from "../ui";

const toggleTheme = () => (window as unknown as { toggleTheme?: () => void }).toggleTheme?.();
const ThemeIcon = () => (
  <>
    <span className="inline light:hidden" aria-hidden="true">&#9789;</span>
    <span className="hidden light:inline" aria-hidden="true">&#9788;</span>
  </>
);

export function Header({
  lang,
  isHome,
  cvActive,
  altHref,
}: {
  lang: Lang;
  isHome?: boolean;
  cvActive?: boolean;
  altHref: string;
}) {
  const [open, setOpen] = useState(false);
  const home = lang === "de" ? "/de" : "/";
  const cv = lang === "de" ? "/de/cv" : "/cv";
  const anchor = (id: string) => (isHome ? `#${id}` : `${home}#${id}`);
  const items: { label: string; href: string; link?: boolean }[] = [
    { label: t(lang, "nav.about"), href: anchor("about") },
    { label: t(lang, "nav.skills"), href: anchor("skills") },
    { label: t(lang, "nav.projects"), href: anchor("projects") },
    { label: t(lang, "nav.services"), href: anchor("services") },
    { label: t(lang, "nav.cv"), href: cv, link: true },
    { label: t(lang, "nav.contact"), href: anchor("contact") },
  ];
  const navLink = "text-text-soft text-[0.92rem] hover:text-text no-underline";

  // Reopen the menu after a language switch (which navigates to a new route and
  // would otherwise mount a fresh, closed Header).
  useEffect(() => {
    try {
      if (sessionStorage.getItem("menu-open")) {
        sessionStorage.removeItem("menu-open");
        setOpen(true);
      }
    } catch { /* no-op */ }
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border-soft backdrop-blur-[8px] bg-[color-mix(in_srgb,var(--color-bg)_88%,transparent)] print:hidden">
        <div className={wrap}>
          <nav className="flex items-center gap-4 min-h-[3.5rem]" aria-label="Primary">
            <Link className="font-mono font-semibold text-text tracking-[-0.01em] whitespace-nowrap no-underline hover:text-accent" to={home}>
              <span className="text-accent">&gt;_</span> tobias.sittenauer
            </Link>

            <ul className="hidden md:flex md:ml-auto items-center flex-wrap gap-[clamp(0.5rem,2vw,1.1rem)] list-none p-0">
              {items.map((it) => (
                <li key={it.href}>
                  {it.link
                    ? <Link className={navLink} to={it.href} aria-current={cvActive ? "page" : undefined}>{it.label}</Link>
                    : <a className={navLink} href={it.href}>{it.label}</a>}
                </li>
              ))}
            </ul>

            <span className="ml-auto md:ml-0 inline-flex items-center gap-[0.4rem]">
              {/* desktop toggles (wrapper controls visibility, not the buttons) */}
              <span className="hidden md:inline-flex items-center gap-[0.4rem]">
                <Link className={langToggle} to={altHref} aria-label={lang === "de" ? "Switch to English" : "Auf Deutsch wechseln"}>
                  {lang === "de" ? "EN" : "DE"}
                </Link>
                <button className={themeToggle} type="button" onClick={toggleTheme} aria-label="Toggle light and dark theme" title="Toggle theme">
                  <ThemeIcon />
                </button>
              </span>
              {/* burger, mobile only */}
              <button className={`${themeToggle} md:hidden text-[1.1rem]`} type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
                ☰
              </button>
            </span>
          </nav>
        </div>
      </header>

      {/* full-screen mobile nav, rendered outside the sticky/blurred header */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[80] bg-bg flex flex-col" role="dialog" aria-modal="true" aria-label="Menu">
          <div className={`${wrap} flex items-center justify-between min-h-[3.5rem] border-b border-border-soft`}>
            <span className="font-mono font-semibold text-text tracking-[-0.01em] whitespace-nowrap"><span className="text-accent">&gt;_</span> tobias.sittenauer</span>
            <button className={`${themeToggle} text-[1.1rem]`} type="button" onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-6 text-center" aria-label="Mobile">
            <ul className="flex flex-col items-center gap-5 list-none p-0">
              {items.map((it) => (
                <li key={it.href}>
                  {it.link
                    ? <Link className="text-2xl text-text hover:text-accent no-underline" to={it.href} onClick={() => setOpen(false)} aria-current={cvActive ? "page" : undefined}>{it.label}</Link>
                    : <a className="text-2xl text-text hover:text-accent no-underline" href={it.href} onClick={() => setOpen(false)}>{it.label}</a>}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 mt-4">
              <Link className={langToggle} to={altHref} onClick={() => { try { sessionStorage.setItem("menu-open", "1"); } catch { /* no-op */ } }} aria-label={lang === "de" ? "Switch to English" : "Auf Deutsch wechseln"}>
                {lang === "de" ? "EN" : "DE"}
              </Link>
              <button className={themeToggle} type="button" onClick={toggleTheme} aria-label="Toggle light and dark theme">
                <ThemeIcon />
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
