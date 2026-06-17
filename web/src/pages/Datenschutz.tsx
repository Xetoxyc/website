import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Seo } from "../seo";
import { wrap } from "../ui";
import { H1, H2, H3, P, UL, LI, A, Block } from "../components/legal";

export default function Datenschutz() {
  return (
    <Layout lang="de" altHref="/">
      <Seo lang="de" title="Datenschutzerklärung, Tobias Sittenauer" description="Datenschutzerklärung nach DSGVO für diese Website. Kein Tracking, keine Analyse." path="/privacy" noindex />
      <main id="main" className={`${wrap} py-[clamp(2rem,6vw,3.5rem)]`}>
        <Link className="inline-block mb-6 font-mono text-[0.88rem] text-accent hover:underline" to="/de">&larr; zurück zur Startseite</Link>

        <H1>Datenschutzerklärung</H1>
        <p className="text-text-soft mb-8 max-w-[70ch]">Informationen zur Verarbeitung personenbezogener Daten gemäß Art. 13 und 14 der Datenschutz-Grundverordnung (DSGVO).</p>

        <H2>1. Verantwortlicher</H2>
        <P>Verantwortlicher im Sinne der DSGVO ist:</P>
        <Block>{`Tobias Sittenauer\nBergstraße 4\n84107 Weihmichl, Deutschland\nE-Mail: tobias@sittenauer.eu`}</Block>

        <H2>2. Grundsatz: keine Analyse und kein Tracking</H2>
        <P>
          Diese Website ist eine statische Seite. Standardmäßig setze ich <strong className="text-text">keine Analyse-Werkzeuge,
          keine Tracking-Technologien, keine Werbe-Netzwerke und keine nicht erforderlichen Cookies</strong> ein.
          Es werden keine Profile über Ihr Surfverhalten erstellt. Schriftarten werden selbst gehostet ausgeliefert,
          es findet kein Abruf von Schriftarten oder anderen Ressourcen von Drittanbietern wie Google Fonts statt.
        </P>

        <H2>3. Hosting und Server-Logfiles</H2>
        <P>
          Diese Website wird bei einem externen Hosting-Dienstleister betrieben. Dieser verarbeitet
          personenbezogene Daten (insbesondere die unten genannten Server-Logfiles) ausschließlich in
          meinem Auftrag und nach meinen Weisungen auf Grundlage eines Vertrags zur Auftragsverarbeitung
          nach Art. 28 DSGVO.
        </P>
        <P>Beim Aufruf der Website werden technisch notwendige Zugriffsdaten in Server-Logfiles verarbeitet. Dazu können gehören:</P>
        <UL>
          <LI>IP-Adresse des anfragenden Geräts</LI>
          <LI>Datum und Uhrzeit des Zugriffs</LI>
          <LI>aufgerufene Datei oder Seite und übertragene Datenmenge</LI>
          <LI>Meldung über erfolgreichen Abruf (Statuscode)</LI>
          <LI>verwendeter Browsertyp und Betriebssystem (User-Agent)</LI>
          <LI>Referrer-URL, sofern vom Browser übermittelt</LI>
        </UL>
        <P>
          Die Verarbeitung dient der technischen Bereitstellung, der Stabilität und der Sicherheit der Website.
          Rechtsgrundlage ist das berechtigte Interesse an einem sicheren und funktionsfähigen Internetauftritt
          gemäß Art. 6 Abs. 1 lit. f DSGVO. Die Logfiles werden nur so lange gespeichert, wie es für diese Zwecke
          erforderlich ist, in der Regel höchstens 7 Tage, und anschließend automatisch gelöscht.
        </P>

        <H2>4. Externe Links</H2>
        <P>
          Diese Website verlinkt auf externe Angebote. Beim bloßen Anzeigen meiner Seite werden noch keine
          Daten an diese Dritten übertragen. Erst wenn Sie aktiv auf einen externen Link klicken, werden Sie
          zum jeweiligen Anbieter weitergeleitet, und Ihr Browser übermittelt dabei Daten (insbesondere Ihre
          IP-Adresse) an diesen Anbieter.
        </P>

        <H3>Buy Me a Coffee</H3>
        <P>
          Auf der Startseite befindet sich ein Link zu meinem Profil bei Buy Me a Coffee. Es handelt sich um
          einen einfachen Link, nicht um ein eingebettetes Widget. Wenn Sie diesen Link anklicken, verlassen Sie
          diese Website und werden zu einem Dienst der <strong className="text-text">Buy Me a Coffee, Inc.</strong> weitergeleitet, einem Anbieter mit Sitz in den
          <strong className="text-text"> Vereinigten Staaten von Amerika (USA)</strong>. Dabei werden Daten (unter anderem Ihre IP-Adresse)
          an Buy Me a Coffee, Inc. übermittelt und es kann zu einer Übermittlung in ein Drittland (USA) kommen.
          Auf die dortige Verarbeitung habe ich keinen Einfluss. Bitte informieren Sie sich in der
          Datenschutzerklärung von Buy Me a Coffee über Art, Umfang und Zweck der Verarbeitung:{" "}
          <A href="https://buymeacoffee.com/privacy-policy" rel="noopener noreferrer external" target="_blank">buymeacoffee.com/privacy-policy</A>.
        </P>
        <P>
          Eine Unterstützung über Buy Me a Coffee ist freiwillig. Es handelt sich um eine Spende, nicht um einen
          Kauf. Eine Gegenleistung in Form von Waren oder Dienstleistungen ist damit nicht verbunden.
        </P>

        <H2>5. Kontaktaufnahme per E-Mail</H2>
        <P>
          Wenn Sie mich per E-Mail kontaktieren, verarbeite ich Ihre Angaben (Ihre E-Mail-Adresse sowie den Inhalt
          Ihrer Nachricht) ausschließlich zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
          DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen) und, sofern die Anfrage auf den Abschluss
          oder die Durchführung eines Vertrags gerichtet ist, Art. 6 Abs. 1 lit. b DSGVO. Ich lösche diese Daten,
          sobald sie für den genannten Zweck nicht mehr erforderlich sind und keine gesetzlichen
          Aufbewahrungspflichten entgegenstehen.
        </P>

        <H2>6. Empfänger und Drittlandübermittlung</H2>
        <P>
          Eine Übermittlung Ihrer Daten an Dritte findet nur statt, soweit dies oben beschrieben ist
          (Hosting-Provider, sowie der von Ihnen selbst ausgelöste Aufruf von Buy Me a Coffee). Eine darüber
          hinausgehende Weitergabe erfolgt nicht, es sei denn, ich bin gesetzlich dazu verpflichtet.
        </P>

        <H2>7. Ihre Rechte als betroffene Person</H2>
        <P>Sie haben nach der DSGVO unter anderem folgende Rechte:</P>
        <UL>
          <LI>Auskunft über die zu Ihnen gespeicherten Daten (Art. 15 DSGVO)</LI>
          <LI>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</LI>
          <LI>Löschung (Art. 17 DSGVO)</LI>
          <LI>Einschränkung der Verarbeitung (Art. 18 DSGVO)</LI>
          <LI>Datenübertragbarkeit (Art. 20 DSGVO)</LI>
          <LI>Widerspruch gegen die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO)</LI>
        </UL>
        <P>Zur Ausübung dieser Rechte genügt eine formlose Nachricht an <A href="mailto:tobias@sittenauer.eu">tobias@sittenauer.eu</A>.</P>

        <H2>8. Beschwerderecht bei einer Aufsichtsbehörde</H2>
        <P>Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für mich ist in der Regel zuständig:</P>
        <Block>{`Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)\nPromenade 18, 91522 Ansbach\nhttps://www.lda.bayern.de`}</Block>
        <P>Sie können sich auch an die Aufsichtsbehörde Ihres üblichen Aufenthaltsorts wenden.</P>
      </main>
    </Layout>
  );
}
