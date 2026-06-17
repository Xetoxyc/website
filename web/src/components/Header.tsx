import { Link } from "react-router-dom";
import { t, type Lang } from "../i18n";
import { wrap, themeToggle, langToggle } from "../ui";

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
  const home = lang === "de" ? "/de" : "/";
  const cv = lang === "de" ? "/de/cv" : "/cv";
  const anchor = (id: string) => (isHome ? `#${id}` : `${home}#${id}`);
  const navLink = "text-text-soft text-[0.92rem] px-[0.1rem] py-1 hover:text-text no-underline";
  return (
    <header className="sticky top-0 z-50 border-b border-border-soft backdrop-blur-[8px] bg-[color-mix(in_srgb,var(--color-bg)_88%,transparent)] print:hidden">
      <div className={wrap}>
        <nav className="flex items-center gap-4 min-h-[3.5rem] flex-wrap" aria-label="Primary">
          <Link className="font-mono font-semibold text-text tracking-[-0.01em] whitespace-nowrap no-underline hover:text-accent" to={home}>
            <span className="text-accent">&gt;_</span> tobias.sittenauer
          </Link>
          <ul className="flex items-center flex-wrap gap-[clamp(0.5rem,2vw,1.1rem)] ml-auto list-none p-0">
            <li><a className={navLink} href={anchor("about")}>{t(lang, "nav.about")}</a></li>
            <li><a className={navLink} href={anchor("skills")}>{t(lang, "nav.skills")}</a></li>
            <li><a className={navLink} href={anchor("projects")}>{t(lang, "nav.projects")}</a></li>
            <li><a className={navLink} href={anchor("services")}>{t(lang, "nav.services")}</a></li>
            <li><Link className={navLink} to={cv} aria-current={cvActive ? "page" : undefined}>{t(lang, "nav.cv")}</Link></li>
            <li><a className={navLink} href={anchor("contact")}>{t(lang, "nav.contact")}</a></li>
          </ul>
          <span className="inline-flex items-center gap-[0.4rem]">
            <Link className={langToggle} to={altHref} aria-label={lang === "de" ? "Switch to English" : "Auf Deutsch wechseln"}>
              {lang === "de" ? "EN" : "DE"}
            </Link>
            <button
              className={themeToggle}
              type="button"
              onClick={() => (window as unknown as { toggleTheme?: () => void }).toggleTheme?.()}
              aria-label="Toggle light and dark theme"
              title="Toggle theme"
            >
              <span className="inline light:hidden" aria-hidden="true">&#9789;</span>
              <span className="hidden light:inline" aria-hidden="true">&#9788;</span>
            </button>
          </span>
        </nav>
      </div>
    </header>
  );
}
