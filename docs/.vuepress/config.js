const { description } = require("../../package");
const { path } = require("@vuepress/utils");

module.exports = {
  port: 8081,
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
            "/guide/play-ground.md",
          ],
        },
      ],
    },
  },
  darkMode: false,
  plugins: [
    [
      "@vuepress/register-components",
      {
        componentsDir: path.resolve(__dirname, "./components"),
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
