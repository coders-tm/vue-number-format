const { description } = require("../../package");
const { path } = require("@vuepress/utils");

module.exports = {
  /**
   * Ref：https://v2.vuepress.vuejs.org/reference/config.html#title
   */
  title: "Vue Number Format",
  /**
   * Ref：https://v2.vuepress.vuejs.org/reference/config.html#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v2.vuepress.vuejs.org/reference/config.html#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" }
    ],
    [
      "meta",
      {
        name: "google-site-verification",
        content: "Tf6UVeu-ZmZtGqB5tdcYymZ79101gyGKcpzqwWhDb1U"
      }
    ]
  ],

  // Specify the port to use for the dev server.
  port: 8081,

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v2.vuepress.vuejs.org/reference/config.html#themeconfig
   */
  // base: '/vue-number-format/',

  // theme and its config
  theme: "@vuepress/theme-default",
  themeConfig: {
    logo: "/favicon.png",
    editLinks: false,
    repo: "coders-tm/vue-number-format",
    docsDir: "docs",
    lastUpdated: true,
    sidebar: {
      "/guide/": [
        {
          title: "Guide",
          collapsable: false,
          children: [
            "/guide/README.md",
            "/guide/config.md",
            "/guide/example.md"
          ]
        }
      ]
    }
  },
  darkMode: false,
  /**
   * Apply plugins，ref：https://v2.vuepress.vuejs.org/reference/config.html#plugins
   */
  plugins: [
    [
      "@vuepress/register-components",
      {
        componentsDir: path.resolve(__dirname, "./components")
      }
    ],
    [
      "@vuepress/plugin-google-analytics",
      {
        id: "UA-76508942-4"
      }
    ]
  ]
};
