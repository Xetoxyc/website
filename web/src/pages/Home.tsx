import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Terminal } from "../components/Terminal";
import { Seo } from "../seo";
import { t, type Lang } from "../i18n";
import { wrap, btn, btnPrimary, Badge, Tag, SectionHead } from "../ui";

type TagT = string | { i18n: string };
const SKILLS: { k: string; tags: TagT[] }[] = [
  { k: "skills.g.core", tags: ["TypeScript", "Node.js", "JavaScript", "C# (.NET)", "Java"] },
  { k: "skills.g.backend", tags: ["NestJS", "PostgreSQL", "Redis", "REST and queues"] },
  { k: "skills.g.frontend", tags: ["Next.js", "React", "React Native (Expo / EAS)"] },
  { k: "skills.g.infra", tags: ["Kubernetes", "Caddy", "Docker", "Linux self-hosting"] },
  { k: "skills.g.ai", tags: ["Prompt engineering", "AI engineering", "Local AI inference", "vLLM", "AMD ROCm"] },
  { k: "skills.g.standards", tags: ["Factur-X / ZUGFeRD / XRechnung", "GoBD", "UStG", { i18n: "skills.tag.gdpr" }, "NIS-2", "ISO 27001"] },
];

type Project = { name: string; oss?: boolean; badge?: string; badgeKey?: string; p: string; meta: string; links: { href: string; label: string }[] };
const MAIN: Project[] = [
  { name: "@stackforge-eu/factur-x", oss: true, p: "proj.facturx.p", meta: "proj.facturx.meta", links: [{ href: "https://github.com/stackforge-eu/factur-x", label: "GitHub ↗" }] },
  { name: "Pastely", badge: "SaaS", p: "proj.pastely.p", meta: "proj.pastely.meta", links: [{ href: "https://pastely.eu", label: "pastely.eu ↗" }] },
  { name: "StackManagement", badgeKey: "proj.stackmgmt.badge", p: "proj.stackmgmt.p", meta: "proj.stackmgmt.meta", links: [{ href: "https://stack.management", label: "stack.management ↗" }] },
  { name: "StackForge", badgeKey: "proj.stackforge.badge", p: "proj.stackforge.p", meta: "proj.stackforge.meta", links: [{ href: "https://stack-forge.eu", label: "stack-forge.eu ↗" }] },
];
const MORE: Project[] = [
  { name: "Entrivia", badge: "SaaS", p: "proj.entrivia.p", meta: "proj.entrivia.meta", links: [{ href: "https://entrivia.eu", label: "entrivia.eu ↗" }] },
  { name: "Gothic 1 Remake, Savegame editor", oss: true, p: "proj.savegame.p", meta: "proj.savegame.meta", links: [{ href: "https://github.com/Xetoxyc/gothic-remake-savegame-editor", label: "GitHub ↗" }, { href: "https://gothic-remake-save-editor.deployo.eu/", label: "Live ↗" }] },
  { name: "Gothic 1 Remake, Lockpicker", oss: true, p: "proj.lockpick.p", meta: "proj.lockpick.meta", links: [{ href: "https://github.com/Xetoxyc/gothic-remake-lockpicker", label: "GitHub ↗" }, { href: "https://xetoxyc.github.io/gothic-remake-lockpicker/", label: "Live ↗" }] },
];
const FACTS = ["location", "company", "available", "honorary", "focus"];
const ext = { rel: "noopener noreferrer external", target: "_blank" } as const;

function ProjectCard({ lang, pr }: { lang: Lang; pr: Project }) {
  return (
    <article className="bg-bg-card border border-border rounded-xl p-[1.35rem] flex flex-col gap-[0.6rem] h-full">
      <div className="flex items-center gap-[0.6rem] flex-wrap">
        <span className="font-mono text-base text-text tracking-[-0.01em]">{pr.name}</span>
        {pr.oss && <Badge variant="oss">{t(lang, "badge.oss")}</Badge>}
        {pr.badge && <Badge>{pr.badge}</Badge>}
        {pr.badgeKey && <Badge>{t(lang, pr.badgeKey)}</Badge>}
      </div>
      <p className="text-text-soft text-[0.95rem] flex-1">{t(lang, pr.p)}</p>
      <p className="font-mono text-[0.78rem] text-text-mute">{t(lang, pr.meta)}</p>
      <div className="flex gap-4 text-[0.9rem] font-mono">
        {pr.links.map((l) => (
          <a key={l.href} className="text-accent hover:underline underline-offset-[3px]" href={l.href} {...ext}>{l.label}</a>
        ))}
      </div>
    </article>
  );
}

const SForge = () => (
  <a className="text-accent hover:underline underline-offset-[3px]" href="https://stack-forge.eu" {...ext}>
    <strong className="font-semibold">StackForge</strong> ↗
  </a>
);

export default function Home({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const cv = de ? "/de/cv" : "/cv";
  return (
    <Layout lang={lang} isHome altHref={de ? "/" : "/de"} showGitHub>
      <Seo
        lang={lang}
        title={de ? "Tobias Sittenauer, Full-Stack-TypeScript-Entwickler und Fractional-CTO" : "Tobias Sittenauer, full-stack TypeScript developer and fractional CTO"}
        description={de
          ? "Tobias Sittenauer entwickelt EU-souveräne, DSGVO-native Software. Gründer von StackForge, Open-Source-Maintainer und Fractional-CTO für Unternehmen im DACH-Raum."
          : "Tobias Sittenauer builds EU-sovereign, GDPR-native software. Founder of StackForge, open source maintainer and fractional CTO for DACH companies."}
        path={de ? "/de" : "/"}
        enPath="/"
        dePath="/de"
      />

      <main id="main">
        {/* HERO */}
        <section className="py-[clamp(2.5rem,8vw,5rem)]">
          <div className={wrap}>
            <div className="grid items-center gap-[clamp(1.5rem,5vw,3rem)] grid-cols-1 min-[56rem]:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="font-mono text-[0.8rem] tracking-[0.04em] text-accent inline-flex items-center gap-2 mb-4">
                  <span className="w-[0.55rem] h-[0.55rem] rounded-full bg-ok animate-pulse-dot" aria-hidden="true" />
                  <span>{t(lang, "hero.eyebrow")}</span>
                </p>
                <h1 className="text-[clamp(2.1rem,7vw,3.4rem)] leading-[1.05] tracking-[-0.02em] mb-3">Tobias Sittenauer</h1>
                <p className="text-[clamp(1rem,2.6vw,1.18rem)] text-text-soft mb-4">
                  {de ? <>Gründer von <SForge /><br />Fractional und Interim-CTO für Teams im DACH-Raum</>
                      : <>Founder of <SForge /><br />Fractional and interim CTO for DACH teams</>}
                </p>
                <p className="text-[clamp(1.05rem,3vw,1.3rem)] text-text max-w-[30ch] mb-6">{t(lang, "hero.tagline")}</p>

                <div className="flex flex-wrap gap-3 mb-7">
                  <a className={`${btnPrimary} font-sans`} href="https://buymeacoffee.com/xetoxyc" {...ext}>&#9749; Buy me a coffee</a>
                  <a className={btn} href="https://github.com/xetoxyc" {...ext}>GitHub</a>
                  <Link className={btn} to={cv}>{t(lang, "btn.cv")}</Link>
                  <a className={btn} href="#projects">{t(lang, "btn.projects")}</a>
                  <a className={btn} href="#contact">{t(lang, "btn.contact")}</a>
                </div>

                <p className="border-l-2 border-accent bg-accent-soft px-[1.1rem] py-[0.9rem] rounded-r-lg text-[0.93rem] text-text-soft max-w-[60ch]">
                  {de
                    ? <><strong className="text-text">Zur Unterstützung dieser Arbeit.</strong> Ich veröffentliche Open-Source-Software. Wenn sie Ihnen nützt, können Sie die Arbeit über Buy Me a Coffee unterstützen. Jede Unterstützung ist eine freiwillige Spende, kein Kauf. Sie erhalten dafür keine Waren, Produkte oder Dienstleistungen.</>
                    : <><strong className="text-text">About supporting this work.</strong> I publish open source software. If it is useful to you, you can support it through Buy Me a Coffee. Any support is a voluntary donation, not a purchase. You receive no goods, products, or services in return.</>}
                </p>
              </div>
              <Terminal />
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" aria-labelledby="about-h">
          <div className={wrap}>
            <SectionHead index="01." title={t(lang, "about.h")} />
            <div className="space-y-4 [&_strong]:text-text [&_strong]:font-semibold [&_a]:text-accent">
              <p className="text-text-soft max-w-[68ch]">
                {de
                  ? <>Ich bin Softwareentwickler und technischer Gründer mit Sitz in Weihmichl, Niederbayern. Ich entwickle und liefere Full-Stack-TypeScript-Software, die realen betrieblichen Anforderungen und deutschen regulatorischen Vorgaben standhalten muss, und ich arbeite als <strong>Fractional und Interim-CTO</strong> für Teams im DACH-Raum. Meinen vollständigen Werdegang finden Sie in meinem <Link to="/de/cv">Lebenslauf</Link>.</>
                  : <>I am a software engineer and technical founder based in Weihmichl, Lower Bavaria. I build and ship full-stack TypeScript software that has to hold up under real operational constraints and German regulatory requirements, and I work as a <strong>fractional and interim CTO</strong> for teams in the DACH market. My full work history is on my <Link to="/cv">CV</Link>.</>}
              </p>
              <p className="text-text-soft max-w-[68ch]">
                {de
                  ? <>Über <strong>StackForge</strong> entwickle ich unabhängige Produkte und Open Source, und ich übernehme ausgewählte Kundenprojekte als Fractional und Interim-CTO. Der rote Faden in allem, was ich baue, ist <strong>EU-Digitalsouveränität</strong> und <strong>DSGVO-Konformität</strong> als Standard und nicht als nachträglicher Zusatz: Daten bleiben in der EU, Werkzeuge sind selbst hostbar, und Datenschutz ist von Anfang an eine Entwurfsvorgabe.</>
                  : <>Through <strong>StackForge</strong> I build independent products and open source, and I take on selected client work as a fractional and interim CTO. The thread through everything I build is <strong>EU digital sovereignty</strong> and <strong>GDPR compliance</strong> as a default rather than an afterthought: data stays in the EU, tooling is self-hostable, and privacy is a design constraint from the start.</>}
              </p>
              <p className="text-text-soft max-w-[68ch]">
                {de
                  ? <>Neben dem Bau von Produkten bin ich <strong>IHK-Prüfer</strong> und helfe bei der Organisation des <strong>JSCraftCamp München</strong>, einer Community-Unconference.</>
                  : <>Outside of building products I serve as an <strong>IHK examiner</strong> and help organise <strong>JSCraftCamp Munich</strong>, a community unconference.</>}
              </p>
            </div>
            <ul className="mt-6 grid gap-2 font-mono text-[0.88rem] list-none p-0">
              {FACTS.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="text-accent min-w-[8.5rem]">{t(lang, `fact.${f}.k`)}</span>
                  <span className="text-text-soft">{t(lang, `fact.${f}.v`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" aria-labelledby="skills-h">
          <div className={wrap}>
            <SectionHead index="02." title={t(lang, "skills.h")} lead={t(lang, "skills.lead")} />
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {SKILLS.map((g) => (
                <div key={g.k}>
                  <h3 className="font-mono text-[0.82rem] lowercase tracking-[0.02em] text-text-mute mb-3">{t(lang, g.k)}</h3>
                  <ul className="flex flex-wrap gap-[0.4rem] p-0 list-none">
                    {g.tags.map((tag, i) => <Tag key={i}>{typeof tag === "string" ? tag : t(lang, tag.i18n)}</Tag>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" aria-labelledby="projects-h">
          <div className={wrap}>
            <SectionHead index="03." title={t(lang, "projects.h")} lead={t(lang, "projects.lead")} />
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {MAIN.map((pr) => <ProjectCard key={pr.name} lang={lang} pr={pr} />)}
            </div>
            <details className="group mt-6">
              <summary className="inline-flex items-center gap-2 w-fit cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden font-mono text-[0.85rem] text-text-soft border border-border bg-bg-card rounded-lg px-[0.9rem] py-2 hover:text-accent hover:border-accent">
                <span className="text-accent transition-transform group-open:rotate-90" aria-hidden="true">▸</span>
                <span className="group-open:hidden">{t(lang, "projects.more.show")}</span>
                <span className="hidden group-open:inline">{t(lang, "projects.more.hide")}</span>
              </summary>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mt-4">
                {MORE.map((pr) => <ProjectCard key={pr.name} lang={lang} pr={pr} />)}
              </div>
            </details>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" aria-labelledby="services-h">
          <div className={wrap}>
            <SectionHead index="04." title={t(lang, "services.h")} lead={t(lang, "services.lead")} />
            <div className="grid gap-4 grid-cols-1 min-[44rem]:grid-cols-2">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-bg-card border border-border rounded-xl p-5 flex gap-3">
                  <span className="text-accent font-mono" aria-hidden="true">//</span>
                  <div>
                    <h3 className="text-[1.05rem] mb-1.5 tracking-[-0.01em]">{t(lang, `svc.${n}.h`)}</h3>
                    <p className="text-text-soft text-[0.95rem]">{t(lang, `svc.${n}.p`)}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-text-soft">
              {de
                ? <>Für Beratungsanfragen schreiben Sie an <a className="text-accent hover:underline" href="mailto:tobias.sittenauer@stack-forge.eu?subject=Fractional%20CTO%20Anfrage">tobias.sittenauer@stack-forge.eu</a>.</>
                : <>For consulting enquiries, email <a className="text-accent hover:underline" href="mailto:tobias.sittenauer@stack-forge.eu?subject=Fractional%20CTO%20enquiry">tobias.sittenauer@stack-forge.eu</a>.</>}
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" aria-labelledby="contact-h">
          <div className={wrap}>
            <SectionHead index="05." title={t(lang, "contact.h")} lead={t(lang, "contact.lead")} />
            <ul className="list-none p-0 grid gap-3 font-mono text-[0.95rem]">
              <li className="flex gap-3 items-baseline"><span className="text-text-mute min-w-[6rem]">email</span><a className="text-accent hover:underline" href="mailto:tobias@sittenauer.eu">tobias@sittenauer.eu</a></li>
              <li className="flex gap-3 items-baseline"><span className="text-text-mute min-w-[6rem]">github</span><a className="text-accent hover:underline" href="https://github.com/xetoxyc" {...ext}>github.com/xetoxyc</a></li>
              <li className="flex gap-3 items-baseline"><span className="text-text-mute min-w-[6rem]">linkedin</span><a className="text-accent hover:underline" href="https://www.linkedin.com/in/tobias-sittenauer" {...ext}>linkedin.com/in/tobias-sittenauer</a></li>
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}
