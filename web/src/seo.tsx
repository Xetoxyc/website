import { Head } from "vite-react-ssg";

const SITE = "https://sittenauer.eu";

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
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
    </Head>
  );
}
