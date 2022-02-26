import number from "../../src";
import { defineClientAppEnhance } from "@vuepress/client";
import { Quasar } from "quasar";

export default defineClientAppEnhance(({ app }) => {
  app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  });
  app.use(number);
});
