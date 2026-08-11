import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Seo } from "../seo";
import { wrap } from "../ui";
import { H1, H2, P, Block, Rule } from "../components/legal";

export default function Impressum() {
  return (
    <Layout lang="de" altHref="/">
      <Seo lang="de" title="Impressum, Tobias Sittenauer" description="Impressum und Anbieterkennzeichnung nach § 5 DDG für Tobias Sittenauer." path="/imprint" noindex />
      <main id="main" className={`${wrap} py-[clamp(2rem,6vw,3.5rem)]`}>
        <Link className="inline-block mb-6 font-mono text-[0.88rem] text-accent hover:underline" to="/de">&larr; zurück zur Startseite</Link>

        <H1>Impressum</H1>

        <H2>Diensteanbieter</H2>
        <Block>{`Tobias Sittenauer\nBergstraße 4\n84107 Weihmichl\nDeutschland`}</Block>

        <H2>Kontakt</H2>
        <Block>E-Mail: tobias@sittenauer.eu</Block>

        <Rule />

        <H2>Haftung für Links</H2>
        <P>
          Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe.
          Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
        </P>

        <H2>Urheberrecht</H2>
        <P>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
          deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Quelltext, der unter einer
          Open-Source-Lizenz veröffentlicht ist, unterliegt den Bedingungen der jeweiligen Lizenz.
        </P>
      </main>
    </Layout>
  );
}
