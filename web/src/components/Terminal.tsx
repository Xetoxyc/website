import { useEffect, useRef, useState, type ReactNode } from "react";
import { Snake } from "./Snake";
import { themeToggle } from "../ui";

const out = "text-[#e7edf3]";
const dim = "text-[#6b7b89]";
const errc = "text-[#ff6b6b]";

const TEXT: Record<string, string> = {
  "role.txt": "founder, stackforge (independent practice)\nfractional & interim cto, dach",
  "stack.txt": "typescript · nestjs · next.js · react native\npostgresql · redis · ai engineering · spec-driven dev",
  "focus.txt": "eu digital sovereignty · gdpr by default",
  "status": "region:   eu (de)\ntracking: none\nfonts:    self-hosted\nlicense:  open source",
  "cv.md": "the full cv lives at /cv (with a download button).",
  ".secret": "you found it. yes, `snake` is real. go on, type it.",
  ".env": "# nice try 😏\nAPP_ENV=production\nSECRET_KEY=you-really-thought-it-was-here\nDATABASE_URL=postgres://nope:nope@localhost:5432/void\nCOFFEE_LEVEL=not_a_coffee_drinker\nKOFFEIN_LEVEL=low\nBUY_ME_A_COFFEE=https://buymeacoffee.com/xetoxyc",
};

type FsNode = { content?: string; dir?: boolean; hidden?: boolean };
function initialFs(): Record<string, FsNode> {
  return {
    "role.txt": { content: TEXT["role.txt"] },
    "stack.txt": { content: TEXT["stack.txt"] },
    "focus.txt": { content: TEXT["focus.txt"] },
    "status": { content: TEXT["status"] },
    "cv.md": { content: TEXT["cv.md"] },
    "projects/": { dir: true },
    ".secret": { content: TEXT[".secret"], hidden: true },
    ".env": { content: TEXT[".env"], hidden: true },
  };
}

const HELP = `available commands:
  help            this list
  ls [-l|-a|-la]  list files
  cat <file>      print a file
  whoami          who runs this
  pwd             working directory
  echo <text>     print text
  date            current date and time
  clear           clear the screen
  rm [-rf] <file> remove a file (it actually deletes it)
  snake           play snake (arrows, esc to quit)
  exit            try it`;

const COMMANDS = ["help", "ls", "cat", "whoami", "pwd", "echo", "date", "clear", "rm", "snake", "exit"];
function commonPrefix(arr: string[]): string {
  if (!arr.length) return "";
  let p = arr[0];
  for (const s of arr) while (!s.startsWith(p)) p = p.slice(0, -1);
  return p;
}

type Line = { id: number; node: ReactNode };
let uid = 1000;
const L = (node: ReactNode): Line => ({ id: uid++, node });
const Prompt = () => <span className="text-accent select-none">$</span>;
const cmdEcho = (raw: string): Line => L(<><Prompt /> {raw || " "}</>);

const BOOT: Line[] = [
  { id: 1, node: <><Prompt /> whoami</> },
  { id: 2, node: <span className={out}>tobias sittenauer</span> },
  { id: 3, node: <><Prompt /> cat role.txt</> },
  { id: 4, node: <span className={out}>{TEXT["role.txt"]}</span> },
  { id: 5, node: <><Prompt /> cat stack.txt</> },
  { id: 6, node: <span className={out}>{TEXT["stack.txt"]}</span> },
  { id: 7, node: <><Prompt /> cat focus.txt</> },
  { id: 8, node: <span className={out}>{TEXT["focus.txt"]}</span> },
  { id: 9, node: <><Prompt /> ./status --check</> },
  { id: 10, node: <span className={out}>{TEXT["status"]}</span> },
  { id: 11, node: <span className={dim}>type 'help' to explore the shell</span> },
];

const BARW = 24;
function bar(pct: number): ReactNode {
  const f = Math.round((pct / 100) * BARW);
  return <span className={dim}>{"█".repeat(f)}{"░".repeat(BARW - f)}  {String(pct).padStart(3)}%</span>;
}

function shake() {
  try {
    document.body.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-8px)" }, { transform: "translateX(8px)" }, { transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "translateX(0)" }],
      { duration: 500, easing: "ease-in-out" }
    );
  } catch { /* no-op */ }
}

function Console({ fill }: { fill?: boolean }) {
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const [snakeOpen, setSnakeOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const fsRef = useRef<Record<string, FsNode>>(undefined as unknown as Record<string, FsNode>);
  if (!fsRef.current) fsRef.current = initialFs();

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => { if (fill) inputRef.current?.focus(); }, [fill]);

  function lsOutput(args: string[]): Line[] {
    const fs = fsRef.current;
    const flags = args.filter((a) => a.startsWith("-")).join("");
    const all = flags.includes("a");
    const long = flags.includes("l");
    const names = Object.keys(fs).filter((n) => all || !fs[n].hidden);
    const list = all ? [".", "..", ...names] : names;
    if (long) {
      const rows = list.map((n) => {
        const isDir = n === "." || n === ".." || fs[n]?.dir;
        const perm = isDir ? "drwxr-xr-x" : "-rw-r--r--";
        const size = (isDir ? 4096 : 96 + n.length * 7).toString().padStart(5);
        return `${perm}  1 tobias  staff  ${size}  ${n}`;
      });
      return [L(<span className={out}>{rows.join("\n")}</span>)];
    }
    return [L(<span className={out}>{list.join("   ")}</span>)];
  }

  function catOutput(args: string[]): Line[] {
    const fs = fsRef.current;
    if (!args[0]) return [L(<span className={errc}>cat: missing file operand</span>)];
    const f = args[0];
    const node = fs[f] || fs[f + "/"];
    if (!node) return [L(<span className={errc}>cat: {f}: No such file or directory</span>)];
    if (node.dir) return [L(<span className={errc}>cat: {f}: Is a directory</span>)];
    return [L(<span className={out}>{node.content}</span>)];
  }

  function runRm(args: string[], echo: Line) {
    const fs = fsRef.current;
    const flags = args.filter((a) => a.startsWith("-")).join("");
    const targets = args.filter((a) => !a.startsWith("-"));
    const recursive = /r/.test(flags);
    const dangerous = targets.some((t) => ["/", "/*", "*", "~"].includes(t));

    if (dangerous && (/[rf]/.test(flags) || targets.includes("/"))) {
      const barId = uid++;
      setLines((p) => [
        ...p,
        echo,
        L(<span className={dim}>starting deletion of the internet ...</span>),
        { id: barId, node: bar(0) },
      ]);
      const sites = [
        "https://google.com", "https://wikipedia.org", "https://youtube.com",
        "https://github.com", "https://stackoverflow.com", "https://reddit.com",
        "https://news.ycombinator.com", "cat-videos/ (4.2 EB)",
      ];
      let pct = 0;
      let si = 0;
      const iv = setInterval(() => {
        // self-incrementing, occasionally stalls for a "real loading" feel
        pct = Math.min(100, pct + (Math.random() < 0.18 ? 0 : 1 + Math.floor(Math.random() * 3)));
        setLines((p) => p.map((l) => (l.id === barId ? { id: barId, node: bar(pct) } : l)));
        while (si < sites.length && pct >= ((si + 1) * 88) / sites.length) {
          const s = sites[si];
          setLines((p) => [...p, L(<span className={dim}>removing {s} …</span>)]);
          si++;
        }
        if (pct >= 100) {
          clearInterval(iv);
          setTimeout(() => { setLines((p) => [...p, L(<span className={errc}>you deleted the internet. 🌐💥</span>)]); shake(); }, 1000);
          setTimeout(() => setLines((p) => [...p, L(<span className={dim}>…just kidding. this is a static site, nothing was harmed. (phew)</span>)]), 3400);
        }
      }, 200);
      return;
    }

    if (!targets.length) {
      setLines((p) => [...p, echo, L(<span className={errc}>rm: missing operand</span>)]);
      return;
    }

    const res: Line[] = targets.map((t) => {
      const key = fs[t] ? t : fs[t + "/"] ? t + "/" : null;
      if (!key) return L(<span className={errc}>rm: cannot remove '{t}': No such file or directory</span>);
      if (fs[key].dir && !recursive) return L(<span className={errc}>rm: cannot remove '{t}': Is a directory</span>);
      delete fs[key];
      return L(<span className={out}>removed '{t}'</span>);
    });
    setLines((p) => [...p, echo, ...res]);
  }

  function run(raw: string) {
    const trimmed = raw.trim();
    if (trimmed) setHistory((h) => [...h, trimmed]);
    setHistIdx(null);
    if (trimmed === "clear") { setLines([]); return; }

    const echo = cmdEcho(raw);
    const tokens = trimmed.split(/\s+/).filter(Boolean);
    const cmd = (tokens[0] || "").toLowerCase();
    const args = tokens.slice(1);
    let output: Line[] = [];

    if (!trimmed) output = [];
    else if (cmd === "help") output = [L(<span className={out}>{HELP}</span>)];
    else if (cmd === "ls") output = lsOutput(args);
    else if (cmd === "cat") output = catOutput(args);
    else if (cmd === "whoami") output = [L(<span className={out}>tobias sittenauer</span>)];
    else if (cmd === "pwd") output = [L(<span className={out}>/home/tobias</span>)];
    else if (cmd === "echo") output = [L(<span className={out}>{args.join(" ")}</span>)];
    else if (cmd === "date") output = [L(<span className={out}>{new Date().toString()}</span>)];
    else if (cmd === "sudo") output = [L(<span className={out}>we don't do sudo here.</span>)];
    else if (cmd === "exit") output = [L(<span className={out}>there is no exit. it's a website. (try closing the tab)</span>)];
    else if (cmd === "snake" || trimmed === "play snake") { setSnakeOpen(true); output = [L(<span className={dim}>launching snake… arrows to move, esc to quit.</span>)]; }
    else if (cmd === "rm") { runRm(args, echo); return; }
    else output = [L(<span className={errc}>command not found: {cmd} — type 'help'</span>)];

    setLines((p) => [...p, echo, ...output]);
  }

  function onTab() {
    const value = input;
    const i = value.lastIndexOf(" ");
    const head = value.slice(0, i + 1);
    const word = value.slice(i + 1);
    const fs = fsRef.current;
    const pool = i === -1
      ? COMMANDS
      : Object.keys(fs).filter((n) => (word.startsWith(".") ? true : !fs[n].hidden));
    const matches = pool.filter((c) => c.startsWith(word));
    if (!matches.length) return;
    if (matches.length === 1) {
      const m = matches[0];
      setInput(head + m + (m.endsWith("/") ? "" : " "));
      return;
    }
    const cp = commonPrefix(matches);
    if (cp.length > word.length) setInput(head + cp);
    else setLines((p) => [...p, L(<span className={dim}>{matches.join("   ")}</span>)]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Tab") {
      e.preventDefault();
      onTab();
      return;
    }
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const i = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(i);
      setInput(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const i = histIdx + 1;
      if (i >= history.length) { setHistIdx(null); setInput(""); }
      else { setHistIdx(i); setInput(history[i]); }
    }
  }

  return (
    <>
      <div
        className={`bg-[#0a0d10] border border-border rounded-xl overflow-hidden font-mono shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)] light:shadow-[0_18px_40px_-28px_rgba(13,27,42,0.35)] ${fill ? "flex flex-col h-full" : ""}`}
        role="group"
        aria-label="Interactive terminal. Type help."
      >
        <div className="flex items-center gap-[0.45rem] px-[0.85rem] py-[0.6rem] bg-[#11161b] border-b border-border">
          <span className="inline-block w-[0.72rem] h-[0.72rem] rounded-full bg-[#ff5f57]" />
          <span className="inline-block w-[0.72rem] h-[0.72rem] rounded-full bg-[#febc2e]" />
          <span className="inline-block w-[0.72rem] h-[0.72rem] rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[0.78rem] text-[#6b7b89]">tobias@stackforge: ~</span>
        </div>
        <div
          ref={bodyRef}
          onClick={() => inputRef.current?.focus()}
          className={`px-[1.15rem] pt-[1.1rem] pb-[1.35rem] ${fill ? "flex-1 min-h-0" : "h-[clamp(300px,40vh,420px)]"} overflow-y-auto text-[clamp(0.78rem,2.4vw,0.9rem)] leading-[1.7] text-[#cfe3df] cursor-text`}
        >
          {lines.map((l) => (
            <div key={l.id} className="whitespace-pre-wrap break-words">{l.node}</div>
          ))}
          <div className="flex items-baseline">
            <span className="text-accent select-none mr-2">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent border-0 outline-none text-[#cfe3df] caret-accent"
              aria-label="Terminal command input"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
      {snakeOpen && <Snake onExit={() => { setSnakeOpen(false); inputRef.current?.focus(); }} />}
    </>
  );
}

// Inline console on desktop; an "open console" button + fullscreen overlay on mobile.
export function Terminal() {
  const [openFs, setOpenFs] = useState(false);

  useEffect(() => {
    if (!openFs) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [openFs]);

  return (
    <>
      <div className="hidden md:block">
        <Console />
      </div>

      <button
        type="button"
        onClick={() => setOpenFs(true)}
        className="md:hidden w-full flex items-center gap-2 bg-[#0a0d10] border border-border rounded-xl px-4 py-4 font-mono text-text-soft hover:border-accent text-left"
      >
        <span className="text-accent">$</span> open console
        <span className="ml-auto text-text-mute text-[0.8rem]">tap to run ▸</span>
      </button>

      {openFs && (
        <div className="md:hidden fixed inset-0 z-[80] bg-bg flex flex-col">
          <div className="flex items-center justify-between min-h-[3.5rem] px-[clamp(1rem,4vw,2rem)] border-b border-border-soft">
            <span className="font-mono font-semibold text-text"><span className="text-accent">&gt;_</span> console</span>
            <button className={`${themeToggle} text-[1.1rem]`} type="button" onClick={() => setOpenFs(false)} aria-label="Close console">✕</button>
          </div>
          <div className="flex-1 min-h-0 p-3">
            <Console fill />
          </div>
        </div>
      )}
    </>
  );
}
