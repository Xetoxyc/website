import { ViteReactSSG } from "vite-react-ssg";
import type { RouteRecord } from "vite-react-ssg";
import "./styles.css";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";

export const routes: RouteRecord[] = [
  { path: "/", element: <Home lang="en" />, entry: "src/pages/Home.tsx" },
  { path: "/de", element: <Home lang="de" />, entry: "src/pages/Home.tsx" },
  { path: "/cv", element: <Resume lang="en" />, entry: "src/pages/Resume.tsx" },
  { path: "/de/cv", element: <Resume lang="de" />, entry: "src/pages/Resume.tsx" },
  { path: "/imprint", element: <Impressum />, entry: "src/pages/Impressum.tsx" },
  { path: "/privacy", element: <Datenschutz />, entry: "src/pages/Datenschutz.tsx" },
];

export const createRoot = ViteReactSSG({ routes });
