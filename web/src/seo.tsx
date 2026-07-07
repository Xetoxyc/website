import { Head } from "vite-react-ssg";

const SITE = "https://sittenauer.eu";
const OG_IMAGE = SITE + "/og.svg";

const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tobias Sittenauer",
  url: SITE,
  image: OG_IMAGE,
  jobTitle: "Full-stack TypeScript developer and fractional CTO",
  email: "mailto:tobias@sittenauer.eu",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Weihmichl",
    addressRegion: "Lower Bavaria",
    addressCountry: "DE",
  },
  knowsAbout: [
    "TypeScript",
    "Node.js",
    "NestJS",
    "React",
    "Kubernetes",
    "AI engineering",
    "EU-sovereign software",
    "GDPR",
    "E-invoicing standards",
  ],
  sameAs: [
    "https://github.com/Xetoxyc",
    "https://www.linkedin.com/in/tobias-sittenauer",
    "https://stack-forge.eu",
  ],
};

export function Seo({
  lang,
  title,
  description,
  path,
  enPath,
  dePath,
  noindex,
}: {
  lang: "en" | "de";
  title: string;
  description: string;
  path: string;
  enPath?: string;
  dePath?: string;
  noindex?: boolean;
}) {
  const canonical = SITE + path;
  const locale = lang === "de" ? "de_DE" : "en_US";
  const altLocale = lang === "de" ? "en_US" : "de_DE";
  return (
    <Head>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Tobias Sittenauer" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <meta name="color-scheme" content="dark light" />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      {enPath && <link rel="alternate" hrefLang="en" href={SITE + enPath} />}
      {dePath && <link rel="alternate" hrefLang="de" href={SITE + dePath} />}
      {enPath && <link rel="alternate" hrefLang="x-default" href={SITE + enPath} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Tobias Sittenauer" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={altLocale} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Tobias Sittenauer, full-stack TypeScript developer and fractional CTO" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <script type="application/ld+json">{JSON.stringify(PERSON_LD)}</script>
    </Head>
  );
}
