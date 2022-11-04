const { description } = require("../../package");
const WindiCSS = require("vite-plugin-windicss").default;
const { resolve } = require("path");

module.exports = {
  // dev server port
  port: 8082,

  // site config
  lang: "en-US",
  title: "Vue Number Format",
  description: description,
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    [
      "meta",
      {
        name: "google-site-verification",
        content: "Tf6UVeu-ZmZtGqB5tdcYymZ79101gyGKcpzqwWhDb1U",
      },
    ],
  ],

  // bundler options
  bundlerConfig: {
    viteOptions: {
      plugins: [
        WindiCSS({
          preflight: false,
          scan: {
            include: [resolve(__dirname, "./**/*.{vue,html,md}")],
            exclude: ["node_modules/**/*", ".git/**/*"],
          },
          theme: {
            extend: {
              colors: {
                primary: "#3eaf7c",
              },
            },
          },
          plugins: [require("windicss/plugin/forms")],
        }),
      ],
    },
  },

  // theme and its config
  theme: "@vuepress/theme-default",
  themeConfig: {
    logo: "/favicon.png",
    editLinks: false,
    repo: "coders-tm/vue-number-format",
    lastUpdated: true,
    sidebar: {
      "/guide/": [
        {
          title: "Guide",
          collapsable: false,
          children: [
            "/guide/README.md",
            "/guide/config.md",
            "/guide/example.md",
            "/guide/play-ground.md",
          ],
        },
      ],
    },
  },
  darkMode: false,
  plugins: [
    [
      "@vuepress/plugin-search",
      {
        locales: {
          "/": {
            placeholder: "Search",
          },
        },
      },
    ],
    [
      "@vuepress/register-components",
      {
        componentsDir: resolve(__dirname, "./components"),
      },
    ],
    [
      "@vuepress/plugin-google-analytics",
      {
        id: "UA-76508942-4",
      },
    ],
  ],
};
