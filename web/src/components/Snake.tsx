import { useEffect, useRef, useState } from "react";

const COLS = 24;
const ROWS = 16;
const CELL = 20;
const TICK = 95; // ms

type Pt = { x: number; y: number };
const eq = (a: Pt, b: Pt) => a.x === b.x && a.y === b.y;

export function Snake({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);

  // Mutable game state kept in refs so the loop reads the latest values.
  const snake = useRef<Pt[]>([{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }]);
  const dir = useRef<Pt>({ x: 1, y: 0 });
  const nextDir = useRef<Pt>({ x: 1, y: 0 });
  const food = useRef<Pt>({ x: 16, y: 8 });
  const overRef = useRef(false);

  function placeFood() {
    let p: Pt;
    do {
      p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    } while (snake.current.some((s) => eq(s, p)));
    food.current = p;
  }

  function reset() {
    snake.current = [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }];
    dir.current = { x: 1, y: 0 };
    nextDir.current = { x: 1, y: 0 };
    overRef.current = false;
    setOver(false);
    setScore(0);
    placeFood();
  }

  useEffect(() => {
    placeFood();
    const ctx = canvasRef.current?.getContext("2d");
    const css = getComputedStyle(document.documentElement);
    const accent = css.getPropertyValue("--color-accent").trim() || "#2dd4bf";
    const accent2 = css.getPropertyValue("--color-accent-2").trim() || "#38bdf8";

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = "#0a0d10";
      ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
      // food
      ctx.fillStyle = accent2;
      ctx.fillRect(food.current.x * CELL + 3, food.current.y * CELL + 3, CELL - 6, CELL - 6);
      // snake
      ctx.fillStyle = accent;
      snake.current.forEach((s, i) => {
        const pad = i === 0 ? 1 : 2;
        ctx.fillRect(s.x * CELL + pad, s.y * CELL + pad, CELL - pad * 2, CELL - pad * 2);
      });
    }

    function tick() {
      if (overRef.current) return;
      dir.current = nextDir.current;
      const head = snake.current[0];
      const nh = { x: head.x + dir.current.x, y: head.y + dir.current.y };
      if (nh.x < 0 || nh.y < 0 || nh.x >= COLS || nh.y >= ROWS || snake.current.some((s) => eq(s, nh))) {
        overRef.current = true;
        setOver(true);
        return;
      }
      snake.current.unshift(nh);
      if (eq(nh, food.current)) {
        setScore((s) => s + 1);
        placeFood();
      } else {
        snake.current.pop();
      }
      draw();
    }

    draw();
    const id = setInterval(tick, TICK);

    function onKey(e: KeyboardEvent) {
      const k = e.key;
      if (k === "Escape" || k === "q") { onExit(); return; }
      if (overRef.current && (k === "Enter" || k === " ")) { reset(); draw(); return; }
      const d = dir.current;
      if ((k === "ArrowUp" || k === "w") && d.y === 0) nextDir.current = { x: 0, y: -1 };
      else if ((k === "ArrowDown" || k === "s") && d.y === 0) nextDir.current = { x: 0, y: 1 };
      else if ((k === "ArrowLeft" || k === "a") && d.x === 0) nextDir.current = { x: -1, y: 0 };
      else if ((k === "ArrowRight" || k === "d") && d.x === 0) nextDir.current = { x: 1, y: 0 };
      if (k.startsWith("Arrow")) e.preventDefault();
    }
    window.addEventListener("keydown", onKey);
    return () => { clearInterval(id); window.removeEventListener("keydown", onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-black/85 backdrop-blur-sm font-mono" role="dialog" aria-label="Snake game">
      <div className="flex flex-col items-center gap-3">
        <div className="flex w-full justify-between text-[0.85rem] text-text-soft">
          <span>snake</span>
          <span>score: <span className="text-accent">{score}</span></span>
        </div>
        <div className="relative">
          <canvas ref={canvasRef} width={COLS * CELL} height={ROWS * CELL} className="border border-border rounded-lg max-w-[92vw] h-auto" />
          {over && (
            <div className="absolute inset-0 grid place-items-center bg-black/70 rounded-lg text-center">
              <div>
                <p className="text-accent text-lg mb-1">game over</p>
                <p className="text-text-soft text-[0.85rem]">score {score} · press enter to retry</p>
              </div>
            </div>
          )}
        </div>
        <p className="text-text-mute text-[0.78rem]">arrow keys / wasd · esc to quit</p>
      </div>
    </div>
  );
}
