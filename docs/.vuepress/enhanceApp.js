/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

import number from "../../src";
import Quasar from "quasar";
import "quasar/dist/quasar.min.css";

export default ({ app }) => {
  // ...apply enhancements for the site.
  app.use(Quasar, {
    config: {
      dark: false // or Boolean true/false
    }
  });
  app.use(number);
};
