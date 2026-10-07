import { useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Layout } from "../components/Layout";
import { Seo } from "../seo";
import { wrap, btn, btnPrimary } from "../ui";
import type { Lang } from "../i18n";
import cvEn from "../content/resume.en.md?raw";
import cvDe from "../content/resume.de.md?raw";

const gradientHr =
  "bg-[linear-gradient(90deg,transparent_0%,var(--color-accent)_30%,var(--color-accent-2)_70%,transparent_100%)]";

// Markdown rendered to real React elements, styled with Tailwind utilities.
const md: Components = {
  h1: ({ node, ...p }) => <h1 className="text-[clamp(1.6rem,5vw,2.1rem)] tracking-tight mb-1.5 text-text" {...p} />,
  h2: ({ node, ...p }) => <h2 className="text-[1.15rem] mt-8 mb-3 pb-1.5 border-b border-border text-text" {...p} />,
  h3: ({ node, ...p }) => <h3 className="text-[1.02rem] mt-5 mb-0.5 text-text" {...p} />,
  h4: ({ node, ...p }) => <h4 className="text-[0.95rem] mt-4 mb-0.5 text-text-soft" {...p} />,
  p: ({ node, ...p }) => <p className="text-text-soft mb-[0.7rem] leading-relaxed" {...p} />,
  a: ({ node, ...p }) => <a className="text-accent underline-offset-[3px] hover:underline break-words" {...p} />,
  strong: ({ node, ...p }) => <strong className="text-text font-semibold" {...p} />,
  em: ({ node, ...p }) => <em className="not-italic font-mono text-[0.85rem] text-text-mute" {...p} />,
  ul: ({ node, ...p }) => <ul className="list-disc pl-5 mb-[0.8rem]" {...p} />,
  ol: ({ node, ...p }) => <ol className="list-decimal pl-5 mb-[0.8rem]" {...p} />,
  li: ({ node, ...p }) => <li className="text-text-soft mb-[0.3rem] marker:text-accent" {...p} />,
  blockquote: ({ node, ...p }) => <blockquote className="border-l-2 border-accent pl-4 mb-[0.8rem] text-text-soft" {...p} />,
  code: ({ node, ...p }) => <code className="font-mono text-[0.85em] bg-bg-soft border border-border-soft rounded px-[0.35em] py-[0.1em]" {...p} />,
  hr: () => <hr className={`border-0 h-0.5 my-[1.9rem] mx-6 rounded-sm ${gradientHr}`} />,
  table: ({ node, ...p }) => (
    <div className="overflow-x-auto mb-4">
      <table className="border-collapse w-full text-[0.92rem]" {...p} />
    </div>
  ),
  th: ({ node, ...p }) => <th className="text-left px-3 py-2 border-b border-border-soft align-top text-text font-semibold whitespace-nowrap" {...p} />,
  td: ({ node, ...p }) => <td className="text-left px-3 py-2 border-b border-border-soft align-top text-text-soft" {...p} />,
};

// Builds the PDF on demand in the browser; the renderer is only loaded on first click.
function PdfButton({ source, lang }: { source: string; lang: Lang }) {
  const [busy, setBusy] = useState(false);
  async function download() {
    setBusy(true);
    try {
      const [{ pdf }, { ResumePdf }] = await Promise.all([import("@react-pdf/renderer"), import("../pdf/ResumePdf")]);
      const blob = await pdf(<ResumePdf source={source} lang={lang} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = Object.assign(document.createElement("a"), { href: url, download: `tobias-sittenauer-${lang === "de" ? "lebenslauf" : "cv"}.pdf` });
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  }
  return (
    <button type="button" className={btnPrimary} onClick={download} disabled={busy} aria-busy={busy}>
      {busy ? (lang === "de" ? "PDF wird erstellt…" : "Building PDF…") : lang === "de" ? "PDF herunterladen" : "Download PDF"}
    </button>
  );
}

export default function Resume({ lang }: { lang: Lang }) {
  const source = lang === "de" ? cvDe : cvEn;
  const mdHref = lang === "de" ? "/resume.de.md" : "/resume.en.md";
  return (
    <Layout lang={lang} cvActive altHref={lang === "de" ? "/cv" : "/de/cv"}>
      <Seo
        lang={lang}
        title={lang === "de" ? "Lebenslauf, Tobias Sittenauer" : "CV, Tobias Sittenauer"}
        description={
          lang === "de"
            ? "Lebenslauf von Tobias Sittenauer, Full-Stack-TypeScript-Entwickler und Fractional-CTO."
            : "Curriculum vitae of Tobias Sittenauer, full-stack TypeScript developer and fractional CTO."
        }
        path={lang === "de" ? "/de/cv" : "/cv"}
        enPath="/cv"
        dePath="/de/cv"
      />
      <main id="main" className={`${wrap} py-[clamp(2rem,6vw,3.5rem)]`}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link className="font-mono text-[0.88rem] text-accent" to={lang === "de" ? "/de" : "/"}>
            {lang === "de" ? "← zurück zur Startseite" : "← back to home"}
          </Link>
          <div className="flex flex-wrap gap-2">
            <PdfButton source={source} lang={lang} />
            <a className={btn} href={mdHref} download>
              {lang === "de" ? "Markdown herunterladen" : "Download markdown"}
            </a>
          </div>
        </div>
        <article className="bg-bg-card border border-border rounded-xl p-[clamp(1.25rem,4vw,2.75rem)]">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>
            {source}
          </ReactMarkdown>
        </article>
      </main>
    </Layout>
  );
}
