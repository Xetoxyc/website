import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // The PDF renderer is only imported on demand; pre-bundle it at startup so Vite
  // does not re-run dependency optimization (which trips over vite-react-ssg's
  // optional react-helmet-async peer) on first click.
  optimizeDeps: { include: ["@react-pdf/renderer"] },
});
