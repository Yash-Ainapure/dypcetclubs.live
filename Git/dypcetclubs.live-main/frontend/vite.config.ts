import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import type { ViteDevServer } from "vite";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    {
      name: "handle-client-routes",
      configureServer(server: ViteDevServer) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.includes("/quiz/")) {
            req.url = "/";
          }
          next();
        });
      },
    },
  ],
  build: {
    sourcemap: false,
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
