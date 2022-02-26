import number from "../../src";
import { defineClientAppEnhance } from "@vuepress/client";
import { Quasar } from "quasar";

// Import Quasar css
import "quasar/dist/quasar.css";

export default defineClientAppEnhance(({ app }) => {
  console.log("app", app);
  app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
    config: {
      dark: true,
    },
  });
  app.use(number);
});
