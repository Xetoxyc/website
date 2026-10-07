import { Document, Page, Text, View, Link, StyleSheet, type Styles } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import type { Heading, List, Paragraph, PhrasingContent, Root, RootContent } from "mdast";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import type { Lang } from "../i18n";

// Renders the CV markdown as a real vector PDF, entirely in the browser.
// Loaded lazily from the CV page so @react-pdf/renderer stays out of the main bundle.

const ACCENT = "#0d9488";
const INK = "#0f172a";
const SOFT = "#475569";
const MUTE = "#94a3b8";
const RULE = "#e2e8f0";

const s = StyleSheet.create({
  page: { paddingTop: 42, paddingBottom: 48, paddingHorizontal: 46, fontFamily: "Helvetica", fontSize: 9.5, color: INK, lineHeight: 1.45 },
  name: { fontSize: 24, fontFamily: "Helvetica-Bold", letterSpacing: -0.5, lineHeight: 1.15 },
  tagline: { fontSize: 11, color: ACCENT, marginTop: 4, fontFamily: "Helvetica-Bold" },
  contactRow: { marginTop: 8 },
  contactItem: { flexDirection: "row", fontSize: 8.5, color: INK, lineHeight: 1.3 },
  contactKey: { color: MUTE, fontFamily: "Courier", width: 52 },
  headerRule: { height: 2, backgroundColor: ACCENT, marginTop: 14, marginBottom: 6 },
  section: { fontSize: 8, fontFamily: "Helvetica-Bold", color: ACCENT, letterSpacing: 1.6, textTransform: "uppercase", marginTop: 16, marginBottom: 6, paddingBottom: 3, borderBottomWidth: 0.6, borderBottomColor: RULE },
  job: { marginTop: 10, marginBottom: 4 },
  jobHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  jobTitle: { fontSize: 11.5, fontFamily: "Helvetica-Bold", flex: 1, paddingRight: 12 },
  jobMeta: { fontSize: 8, color: MUTE, fontFamily: "Courier", textAlign: "right", flexShrink: 0 },
  sub: { fontSize: 9.5, fontFamily: "Helvetica-Bold", marginTop: 6, marginBottom: 1.5, color: INK },
  group: { fontSize: 9.5, fontFamily: "Helvetica-Bold", marginTop: 6, marginBottom: 1.5 },
  p: { color: INK, marginBottom: 4 },
  li: { flexDirection: "row", marginBottom: 1.5, paddingRight: 8 },
  bullet: { width: 10, color: ACCENT, fontFamily: "Helvetica-Bold" },
  liText: { flex: 1, color: INK },
  strong: { fontFamily: "Helvetica-Bold", color: INK },
  em: { fontFamily: "Helvetica-Oblique" },
  link: { color: ACCENT, textDecoration: "none" },
  footer: { position: "absolute", bottom: 22, left: 46, right: 46, flexDirection: "row", justifyContent: "space-between", fontSize: 7.5, color: MUTE, fontFamily: "Courier" },
});

// Helvetica (built-in, no font download) lacks a few glyphs the markdown uses.
const clean = (t: string) => t.replace(/‑/g, "-").replace(/×/g, "x");

const inline = (nodes: PhrasingContent[], style?: Styles[string]): ReactNode[] =>
  nodes.map((n, i) => {
    switch (n.type) {
      case "text": return <Text key={i} style={style}>{clean(n.value)}</Text>;
      case "strong": return <Text key={i} style={[style ?? {}, s.strong]}>{inline(n.children)}</Text>;
      case "emphasis": return <Text key={i} style={[style ?? {}, s.em]}>{inline(n.children)}</Text>;
      case "inlineCode": return <Text key={i} style={{ fontFamily: "Courier" }}>{clean(n.value)}</Text>;
      case "link": return <Link key={i} src={n.url} style={s.link}>{inline(n.children)}</Link>;
      case "break": return <Text key={i}>{"\n"}</Text>;
      default: return "children" in n ? inline(n.children as PhrasingContent[], style) : null;
    }
  });

const plain = (nodes: PhrasingContent[]): string =>
  nodes.map((n) => (n.type === "text" || n.type === "inlineCode" ? n.value : n.type === "break" ? "\n" : "children" in n ? plain(n.children as PhrasingContent[]) : "")).join("");

// The CV markdown opens with: # Name, ## Tagline, a paragraph of **Key:** value lines, then ---.
function splitHeader(root: Root) {
  const body = [...root.children];
  const name = body[0]?.type === "heading" ? plain((body.shift() as Heading).children) : "";
  const tagline = body[0]?.type === "heading" && body[0].depth === 2 ? plain((body.shift() as Heading).children) : "";
  const contact: { k: string; v: string; href?: string }[] = [];
  if (body[0]?.type === "paragraph") {
    const para = body.shift() as Paragraph;
    // Lines are separated by hard breaks; a line may carry a markdown link.
    const lines: PhrasingContent[][] = [[]];
    for (const c of para.children) c.type === "break" ? lines.push([]) : lines[lines.length - 1].push(c);
    for (const nodes of lines) {
      const m = plain(nodes).match(/^([^:]+):\s*(.+)$/);
      if (!m) continue;
      const link = nodes.find((n) => n.type === "link");
      const v = m[2].trim();
      contact.push({ k: m[1].trim(), v, href: link?.url ?? (/^https?:/.test(v) ? v : undefined) });
    }
  }
  if (body[0]?.type === "thematicBreak") body.shift();
  return { name, tagline, contact, body };
}

// A job block is "## Company, Role" followed by "**dates**  \nLocation".
function jobMeta(next: RootContent | undefined): string[] | null {
  if (next?.type !== "paragraph" || next.children[0]?.type !== "strong") return null;
  return plain(next.children).split("\n").map((l) => clean(l.trim())).filter(Boolean);
}

function Blocks({ body }: { body: RootContent[] }) {
  const out: ReactNode[] = [];
  for (let i = 0; i < body.length; i++) {
    const n = body[i];
    switch (n.type) {
      case "thematicBreak": break;
      case "heading":
        if (n.depth === 1) out.push(<Text key={i} style={s.section}>{clean(plain(n.children))}</Text>);
        else if (n.depth === 2) {
          const meta = jobMeta(body[i + 1]);
          if (meta) i++;
          out.push(
            <View key={i} style={s.job} wrap={false} minPresenceAhead={70}>
              <View style={s.jobHead}>
                <Text style={s.jobTitle}>{clean(plain(n.children))}</Text>
                {meta && <Text style={s.jobMeta}>{meta.join("  ·  ")}</Text>}
              </View>
            </View>,
          );
        } else out.push(<Text key={i} style={s.sub}>{clean(plain(n.children))}</Text>);
        break;
      case "paragraph":
        // "**Group name**" alone on a line acts as a sub-heading (skills section).
        if (n.children.length === 1 && n.children[0].type === "strong") out.push(<Text key={i} style={s.group}>{inline(n.children)}</Text>);
        else out.push(<Text key={i} style={s.p}>{inline(n.children)}</Text>);
        break;
      case "list":
        out.push(<ListBlock key={i} list={n} />);
        break;
      default: break;
    }
  }
  return <>{out}</>;
}

function ListBlock({ list }: { list: List }) {
  return (
    <View style={{ marginBottom: 3 }}>
      {list.children.map((item, i) => (
        <View key={i} style={s.li} wrap={false}>
          <Text style={s.bullet}>{list.ordered ? `${i + 1}.` : "›"}</Text>
          <Text style={s.liText}>
            {item.children.map((c, j) => (c.type === "paragraph" ? <Text key={j}>{inline(c.children)}</Text> : null))}
          </Text>
        </View>
      ))}
    </View>
  );
}

export function ResumePdf({ source, lang }: { source: string; lang: Lang }) {
  const root = unified().use(remarkParse).use(remarkGfm).parse(source);
  const { name, tagline, contact, body } = splitHeader(root);
  const date = new Date().toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", { year: "numeric", month: "long" });
  return (
    <Document title={`${name} – ${lang === "de" ? "Lebenslauf" : "CV"}`} author={name} language={lang}>
      <Page size="A4" style={s.page}>
        <Text style={s.name}>{name}</Text>
        {tagline && <Text style={s.tagline}>{tagline}</Text>}
        <View style={s.contactRow}>
          {contact.map((c) => (
            <View key={c.k} style={s.contactItem}>
              <Text style={s.contactKey}>{c.k.toLowerCase()}</Text>
              {c.href ? <Link src={c.href} style={s.link}>{c.v.replace(/^https?:\/\/(www\.)?/, "")}</Link> : <Text>{c.v}</Text>}
            </View>
          ))}
        </View>
        <View style={s.headerRule} />
        <Blocks body={body} />
        <View style={s.footer} fixed>
          <Text>{name} · {lang === "de" ? "Stand" : "as of"} {date}</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
