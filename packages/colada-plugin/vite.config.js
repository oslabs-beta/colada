import { defineConfig } from "vite";
import { resolve } from "path";
import ts from "rollup-plugin-typescript2";

export default defineConfig({
  plugins: [
    ts({
      check: false,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationMap: true,
        },
        exclude: ["__tests__"],
      },
    }),
  ],
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
