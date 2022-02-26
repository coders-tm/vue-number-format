/**
 * Client app enhancement file.
 *
 * https://v2.vuepress.vuejs.org/reference/client-api.html#helpers
 */

import number from "../../src";
import { Quasar } from "quasar";
// import "quasar/dist/quasar.css";

import { defineClientAppEnhance } from "@vuepress/client";

export default defineClientAppEnhance(({ app }) => {
  app.use(Quasar, {
    config: {
      dark: false
    }
  });
  app.use(number);
});
