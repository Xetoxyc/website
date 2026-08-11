import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import type { Lang } from "../i18n";

export function Layout({
  lang,
  isHome,
  cvActive,
  altHref,
  showGitHub,
  children,
}: {
  lang: Lang;
  isHome?: boolean;
  cvActive?: boolean;
  altHref: string;
  showGitHub?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <a
        className="absolute -left-[9999px] top-0 z-[100] bg-accent text-accent-ink px-4 py-2 rounded-br-lg focus:left-0"
        href="#main"
      >
        Skip to content
      </a>
      <Header lang={lang} isHome={isHome} cvActive={cvActive} altHref={altHref} />
      {children}
      <Footer lang={lang} showGitHub={showGitHub} />
    </>
  );
}
