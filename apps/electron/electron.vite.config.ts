import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";

const IS_DEV = process.env.NODE_ENV != "production";

process.env.SENTRY_AUTH_TOKEN =
  "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";

export default defineConfig({
  main: {
    build: {
      sourcemap: !IS_DEV,
    },
    esbuild: {
      drop: IS_DEV ? undefined : ["console", "debugger"],
    },
    plugins: [
      externalizeDepsPlugin({
        exclude: [
          "@rao-pics/db",
          "@rao-pics/api",
          "@rao-pics/constant",
          "@rao-pics/trpc",
          "@rao-pics/rlog",

          // package.json => type:module 的依赖，electron 中需要打包到代码中
          "superjson",
        ],
        include: [
          // @rao-pics/api 中的依赖，electron 中作为外部依赖
          "chokidar",
        ],
      }),

      !IS_DEV &&
        sentryVitePlugin({
          org: "raopics",
          project: "electron",
          authToken: process.env.SENTRY_AUTH_TOKEN,
        }),
    ],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
        "@build": resolve("build"),
      },
    },
    plugins: [react()],
  },
});
