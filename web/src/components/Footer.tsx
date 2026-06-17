import { Link } from "react-router-dom";
import { t, type Lang } from "../i18n";
import { wrap } from "../ui";

export function Footer({ lang, showGitHub }: { lang: Lang; showGitHub?: boolean }) {
  const home = lang === "de" ? "/de" : "/";
  const cv = lang === "de" ? "/de/cv" : "/cv";
  const link = "text-text-soft hover:text-accent no-underline";
  return (
    <footer className="border-t border-border-soft bg-bg-soft py-8 text-[0.88rem] print:hidden">
      <div className={`${wrap} flex flex-wrap items-center justify-between gap-x-6 gap-y-3`}>
        <ul className="flex flex-wrap gap-4 list-none p-0">
          <li><Link className={link} to={home}>{t(lang, "footer.home")}</Link></li>
          <li><Link className={link} to={cv}>{t(lang, "footer.cv")}</Link></li>
          <li><Link className={link} to="/imprint">Impressum</Link></li>
          <li><Link className={link} to="/privacy">Datenschutz</Link></li>
          <li><a className={link} href="mailto:tobias@sittenauer.eu">{t(lang, "footer.email")}</a></li>
          {showGitHub && (
            <li><a className={link} href="https://github.com/xetoxyc" rel="noopener noreferrer external" target="_blank">GitHub</a></li>
          )}
        </ul>
        <div className="font-mono text-[0.76rem] text-text-mute flex flex-wrap gap-x-[0.9rem] gap-y-[0.4rem]">
          <span>&copy; 2026 Tobias Sittenauer</span>
          <span className="text-ok">{t(lang, "footer.notrackers")}</span>
        </div>
      </div>
    </footer>
  );
}
