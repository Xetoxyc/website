// Plain bilingual strings used via t(lang, key). Rich content (hero role, about
// paragraphs, donation note, services CTA) lives as JSX in the components; legal
// pages and CV carry their own text.
export type Lang = "en" | "de";

type Entry = { en: string; de: string };

export const T: Record<string, Entry> = {
  // Navigation
  "nav.about": { en: "About", de: "Über mich" },
  "nav.skills": { en: "Skills", de: "Stack" },
  "nav.projects": { en: "Projects", de: "Projekte" },
  "nav.services": { en: "Services", de: "Leistungen" },
  "nav.cv": { en: "CV", de: "Lebenslauf" },
  "nav.contact": { en: "Contact", de: "Kontakt" },

  // Hero
  "hero.eyebrow": { en: "available for fractional CTO work", de: "verfügbar für Fractional-CTO-Mandate" },
  "hero.tagline": { en: "I build EU-sovereign, GDPR-native software.", de: "Ich entwickle EU-souveräne, DSGVO-native Software." },
  "btn.cv": { en: "CV", de: "Lebenslauf" },
  "btn.projects": { en: "Projects", de: "Projekte" },
  "btn.contact": { en: "Contact", de: "Kontakt" },

  // About + facts
  "about.h": { en: "About", de: "Über mich" },
  "fact.location.k": { en: "location", de: "Ort" },
  "fact.location.v": { en: "Weihmichl, Lower Bavaria, Germany", de: "Weihmichl, Niederbayern, Deutschland" },
  "fact.company.k": { en: "company", de: "Unternehmen" },
  "fact.company.v": { en: "StackForge, Careville", de: "StackForge, Careville" },
  "fact.available.k": { en: "available for", de: "verfügbar für" },
  "fact.available.v": {
    en: "fractional and interim CTO (DACH), freelance contract development, projects, consulting",
    de: "Fractional und Interim-CTO (DACH), Freelance-Auftragsentwicklung, Projekte, Beratung",
  },
  "fact.honorary.k": { en: "honorary", de: "Ehrenamt" },
  "fact.honorary.v": { en: "IHK examiner", de: "IHK-Prüfer" },
  "fact.focus.k": { en: "focus", de: "Fokus" },
  "fact.focus.v": { en: "EU-sovereign, GDPR-native software that delivers real value", de: "EU-souveräne, DSGVO-native Software mit echtem Mehrwert" },

  // Skills
  "skills.h": { en: "Skills and stack", de: "Skills und Stack" },
  "skills.lead": {
    en: "Full-stack TypeScript, end to end, with the infrastructure and regulatory context to ship it in regulated EU markets.",
    de: "Full-Stack TypeScript von Anfang bis Ende, mit der Infrastruktur und dem regulatorischen Kontext, um sie in regulierten EU-Märkten auszuliefern.",
  },
  "skills.g.core": { en: "language and core", de: "Sprache und Kern" },
  "skills.g.backend": { en: "backend", de: "Backend" },
  "skills.g.frontend": { en: "frontend and mobile", de: "Frontend und Mobile" },
  "skills.g.infra": { en: "infrastructure", de: "Infrastruktur" },
  "skills.g.ai": { en: "ai and inference", de: "KI und Inferenz" },
  "skills.g.standards": { en: "standards and compliance", de: "Standards und Compliance" },
  "skills.tag.gdpr": { en: "GDPR", de: "DSGVO" },
  "setup.h": { en: "Setup", de: "Setup" },
  "setup.lead": { en: "What I work with day to day.", de: "Womit ich täglich arbeite." },
  "setup.laptop.k": { en: "laptop", de: "Laptop" },
  "setup.inference.k": { en: "local inference", de: "Lokale Inferenz" },
  "setup.agents.k": { en: "coding agents", de: "Coding-Agents" },

  // Projects
  "projects.h": { en: "Projects", de: "Projekte" },
  "projects.lead": {
    en: "Open source work and products. The libraries are public so you can read the code before you trust it.",
    de: "Open-Source-Arbeit und Produkte. Die Bibliotheken sind öffentlich, sodass Sie den Code lesen können, bevor Sie ihm vertrauen.",
  },
  "projects.more.show": { en: "Show more projects", de: "Mehr Projekte anzeigen" },
  "projects.more.hide": { en: "Show fewer projects", de: "Weniger anzeigen" },
  "badge.oss": { en: "Open source", de: "Open Source" },
  "proj.facturx.p": {
    en: "Open source TypeScript library for Factur-X, ZUGFeRD, and XRechnung electronic invoicing. It generates and reads the hybrid PDF and XML formats required for compliant e-invoicing in Germany and the EU. Licensed under EUPL-1.2.",
    de: "Open-Source-TypeScript-Bibliothek für die elektronische Rechnungsstellung mit Factur-X, ZUGFeRD und XRechnung. Sie erzeugt und liest die hybriden PDF- und XML-Formate, die für konforme E-Rechnungen in Deutschland und der EU erforderlich sind. Lizenziert unter EUPL-1.2.",
  },
  "proj.facturx.meta": { en: "TypeScript · EUPL-1.2 · e-invoicing", de: "TypeScript · EUPL-1.2 · E-Rechnung" },
  "proj.pastely.p": {
    en: "EU-hosted link-in-bio, short link, and digital business card platform. A GDPR-native alternative to Linktree and Bitly, with data kept in the EU.",
    de: "EU-gehostete Plattform für Link-in-Bio, Kurzlinks und digitale Visitenkarten. Eine DSGVO-native Alternative zu Linktree und Bitly, mit Daten, die in der EU bleiben.",
  },
  "proj.pastely.meta": { en: "product · EU-hosted", de: "Produkt · EU-gehostet" },
  "proj.entrivia.p": {
    en: "Visitor management for European companies: email invites, pre-registration on the phone, check-in at the desk or a lobby kiosk, NDA signing, and badge printing, with a tamper-evident audit trail behind every step. Self-host it or have it run in the EU. Licensed under EUPL-1.2.",
    de: "Besuchermanagement für europäische Unternehmen: Einladung per E-Mail, Vorregistrierung auf dem Smartphone, Check-in am Empfang oder am Kiosk in der Lobby, NDA-Unterschrift und Badge-Druck, mit einem Audit-Trail hinter jedem Schritt, der Manipulationen sichtbar macht. Selbst hosten oder in der EU betreiben lassen. Lizenziert unter EUPL-1.2.",
  },
  "proj.entrivia.meta": { en: "ASP.NET Core · EUPL-1.2 · visitor management", de: "ASP.NET Core · EUPL-1.2 · Besuchermanagement" },
  "proj.stackmgmt.badge": { en: "Company", de: "Unternehmen" },
  "proj.stackmgmt.p": {
    en: "EU-hosted, GDPR-native operating system for small German-speaking creators who are starting to earn from their reach. Bundles link-in-bio, an AI-sorted managed inbox, deal management, GoBD-compliant invoicing, secured payments, and Impressum protection in one platform.",
    de: "EU-gehostetes, DSGVO-natives Betriebssystem für kleine deutschsprachige Creator, die beginnen, mit ihrer Reichweite Geld zu verdienen. Bündelt Link-in-Bio, ein KI-vorsortiertes gemanagtes Postfach, Deal-Management, GoBD-konforme Rechnungsstellung, abgesicherte Zahlungen und Impressumsschutz in einer Plattform.",
  },
  "proj.stackmgmt.meta": { en: "creator platform · EU-hosted", de: "Creator-Plattform · EU-gehostet" },
  "proj.magnetite.p": {
    en: "Open source browser built around a sidebar: vertical tabs, spaces, split view, and tabs that archive themselves. Runs on Chromium, so websites and Chrome extensions work as usual. Optional end-to-end encrypted sync through a free or self-hosted server. No telemetry, no account.",
    de: "Open-Source-Browser rund um eine Seitenleiste: vertikale Tabs, Spaces, Split View und Tabs, die sich selbst archivieren. Läuft auf Chromium, sodass Websites und Chrome-Erweiterungen wie gewohnt funktionieren. Optionaler Ende-zu-Ende-verschlüsselter Sync über einen kostenlosen oder selbst gehosteten Server. Keine Telemetrie, kein Konto.",
  },
  "proj.magnetite.meta": { en: "Rust · EUPL-1.2 · browser", de: "Rust · EUPL-1.2 · Browser" },
  "proj.grimgrid.p": {
    en: "Battle map app for game masters on iPhone and iPad. Plug the phone into a TV lying flat on the table and get a true-to-scale square or hex grid, fog of war you swipe away, and a bestiary of more than 200 creatures. No account, no server, no tracking.",
    de: "Battle-Map-App für Spielleiter auf iPhone und iPad. Das iPhone an einen flach liegenden Fernseher anschließen und ein maßstabsgetreues Quadrat- oder Hexraster, Fog of War zum Wegwischen und ein Bestiarium mit über 200 Kreaturen nutzen. Kein Konto, kein Server, kein Tracking.",
  },
  "proj.grimgrid.meta": { en: "Swift · iPhone and iPad", de: "Swift · iPhone und iPad" },
  "proj.stackforge.badge": { en: "Company", de: "Unternehmen" },
  "proj.stackforge.p": {
    en: "Where my independent products and open source work live, focused on EU digital sovereignty and GDPR-compliant SaaS.",
    de: "Heimat meiner unabhängigen Produkte und Open-Source-Arbeit, mit Fokus auf EU-Digitalsouveränität und DSGVO-konforme SaaS.",
  },
  "proj.stackforge.meta": { en: "products · open source", de: "Produkte · Open Source" },
  "proj.savegame.p": { en: "Browser-based savegame editor for the Gothic 1 Remake.", de: "Browserbasierter Spielstand-Editor für das Gothic 1 Remake." },
  "proj.savegame.meta": { en: "web tool · open source", de: "Web-Tool · Open Source" },
  "proj.lockpick.p": { en: "Lockpicking solver for the Gothic 1 Remake.", de: "Lockpick-Löser für das Gothic 1 Remake." },
  "proj.lockpick.meta": { en: "web tool · open source", de: "Web-Tool · Open Source" },

  // Services
  "services.h": { en: "Services", de: "Leistungen" },
  "services.lead": {
    en: "Available as a fractional or interim CTO for DACH companies that need senior technical leadership without a full-time hire.",
    de: "Verfügbar als Fractional oder Interim-CTO für Unternehmen im DACH-Raum, die erfahrene technische Führung ohne Vollzeitanstellung brauchen.",
  },
  "svc.1.h": { en: "Fractional and interim CTO", de: "Fractional und Interim-CTO" },
  "svc.1.p": { en: "Part-time technical leadership for founders and teams: architecture, hiring, roadmap, and the decisions that are expensive to get wrong.", de: "Technische Führung in Teilzeit für Gründer und Teams: Architektur, Einstellung, Roadmap und die Entscheidungen, die teuer werden, wenn man sie falsch trifft." },
  "svc.2.h": { en: "EU-sovereign architecture", de: "EU-souveräne Architektur" },
  "svc.2.p": { en: "Designing systems that keep data in the EU and stay self-hostable, so you are not locked into a single cloud or a single jurisdiction.", de: "Systeme entwerfen, die Daten in der EU halten und selbst hostbar bleiben, damit Sie nicht an eine einzelne Cloud oder eine einzelne Rechtsordnung gebunden sind." },
  "svc.3.h": { en: "GDPR and compliance engineering", de: "DSGVO und Compliance-Engineering" },
  "svc.3.p": { en: "Building privacy and German regulatory requirements (GDPR, GoBD, NIS-2, ISO 27001) into the product rather than bolting them on later.", de: "Datenschutz und deutsche regulatorische Anforderungen (DSGVO, GoBD, NIS-2, ISO 27001) ins Produkt einbauen, statt sie später anzuflanschen." },
  "svc.4.h": { en: "Full-stack TypeScript delivery", de: "Full-Stack-TypeScript-Umsetzung" },
  "svc.4.p": { en: "Hands-on delivery from PostgreSQL up to web and mobile, with AI engineering and spec-driven development as part of how the work gets built.", de: "Praktische Umsetzung von PostgreSQL bis Web und Mobile, mit AI-Engineering und Spec-Driven Development als Teil der Arbeitsweise." },

  // Contact
  "contact.h": { en: "Contact", de: "Kontakt" },
  "contact.lead": { en: "The fastest way to reach me is email. I read everything.", de: "Am schnellsten erreichen Sie mich per E-Mail. Ich lese alles." },

  // Footer
  "footer.home": { en: "Home", de: "Start" },
  "footer.cv": { en: "CV", de: "Lebenslauf" },
  "footer.email": { en: "Email", de: "E-Mail" },
  "footer.notrackers": { en: "no trackers", de: "kein Tracking" },
};

export function t(lang: Lang, key: string): string {
  const e = T[key];
  return e ? e[lang] : key;
}
