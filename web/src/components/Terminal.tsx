// English, stylized terminal card. Real JSX, utility-styled, no injected HTML.
function P() {
  return <span className="text-accent select-none">$</span>;
}
const out = "text-[#e7edf3]";

export function Terminal() {
  return (
    <div
      className="bg-[#0a0d10] border border-border rounded-xl overflow-hidden font-mono shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)]"
      role="img"
      aria-label="Terminal session printing a short profile of Tobias Sittenauer"
    >
      <div className="flex items-center gap-[0.45rem] px-[0.85rem] py-[0.6rem] bg-[#11161b] border-b border-border">
        <span className="inline-block w-[0.72rem] h-[0.72rem] rounded-full bg-[#ff5f57]" />
        <span className="inline-block w-[0.72rem] h-[0.72rem] rounded-full bg-[#febc2e]" />
        <span className="inline-block w-[0.72rem] h-[0.72rem] rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[0.78rem] text-[#6b7b89]">tobias@stackforge: ~</span>
      </div>
      <pre className="m-0 px-[1.15rem] pt-[1.1rem] pb-[1.35rem] text-[clamp(0.78rem,2.4vw,0.9rem)] leading-[1.7] text-[#cfe3df] whitespace-pre-wrap break-words overflow-x-auto [tab-size:2]">
        <P /> whoami{"\n"}
        <span className={out}>tobias sittenauer</span>{"\n"}
        <P /> cat role.txt{"\n"}
        <span className={out}>{"founder, stackforge (independent practice)\nfractional & interim cto, dach"}</span>{"\n"}
        <P /> cat stack.txt{"\n"}
        <span className={out}>{"typescript · nestjs · next.js · react native\npostgresql · redis · ai engineering · spec-driven dev"}</span>{"\n"}
        <P /> cat focus.txt{"\n"}
        <span className={out}>eu digital sovereignty · gdpr by default</span>{"\n"}
        <P /> ./status --check{"\n"}
        <span className={out}>{"region:   eu (de)\n"}tracking: <span className="text-[#6b7b89]">none</span>{"\nfonts:    self-hosted\nlicense:  open source"}</span>{"\n"}
        <P /> <span className="inline-block w-[0.55rem] h-4 align-text-bottom bg-accent animate-blink" aria-hidden="true" />
      </pre>
    </div>
  );
}
