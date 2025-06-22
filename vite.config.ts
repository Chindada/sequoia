import { PrimeVueResolver } from "@primevue/auto-import-resolver";
import Tailwindcss from "@tailwindcss/vite";
import Vue from "@vitejs/plugin-vue";
import { URL, fileURLToPath } from "node:url";
import Components from "unplugin-vue-components/vite";
import VueRouter from "unplugin-vue-router/vite";
import { defineConfig } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";
import MetaLayouts from "vite-plugin-vue-meta-layouts";

const defaultHostname = "localhost";
const defaultHostPort = "23456";
const defaultHost = `${defaultHostname}:${defaultHostPort}`;

const manualChunks = (id: string) => {
  if (id.includes("node_modules")) {
    const regex = /node_modules\/.pnpm\/([^/]+)\//;
    const match = id.match(regex);
    let name;
    if (match && match[1]) {
      if (match[1].startsWith("@")) {
        name = match[1].split("@")[1];
      } else if (match[1].includes("@")) {
        name = match[1].split("@")[0];
      }
    }
    if (name && name.length > 0) {
      return "vendors".concat("-", name);
    }
    return "vendors";
  } else if (id.includes("src")) {
    return "app";
  }
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Tailwindcss(),
    MetaLayouts({
      target: "src/layouts",
      defaultLayout: "AppLayout"
    }),
    VueRouter({
      extendRoute(route) {
        const authMeta = {
          auth: (route.path as string) !== "/login"
        };
        if (!route.meta) {
          route.meta = authMeta;
        } else {
          route.addToMeta(authMeta);
        }
      },
      routeBlockLang: "json"
    }),
    Vue(),
    process.env.NODE_ENV === "production" ? VueDevTools() : null,
    Components({
      dts: true,
      resolvers: [PrimeVueResolver()]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    },
    dedupe: process.env.NODE_ENV === "production" ? [] : ["vue"]
  },
  optimizeDeps: {
    include:
      process.env.NODE_ENV === "production"
        ? []
        : [
            "primevue/**/*.vue",
            "src/layouts/**/*.vue",
            "src/components/**/*.vue",
            "src/pages/**/*.vue"
          ],
    exclude: [".vite/deps/chunk-*"]
  },
  server: {
    proxy: {
      "/api/capitan": {
        target: `http://${defaultHost}`
      },
      "/ws/capitan": {
        target: `ws://${defaultHost}`,
        ws: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        hashCharacters: "base36",
        manualChunks: manualChunks
      }
    }
  }
});
