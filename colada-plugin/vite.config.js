import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "colada-plugin.esm",
    },
    rollupOptions: {
      external: [
        "@vue/devtools-api",
        "lodash",
        "lodash/debounce",
        "lodash/clonedeep",
        "lodash/isempty",
      ],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
