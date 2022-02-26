import number from "../../src";
import { defineClientAppEnhance } from "@vuepress/client";
import { QInput, QList, QField, QCheckbox } from "quasar";

// Import Quasar css
import "quasar/dist/quasar.css";

export default defineClientAppEnhance(({ app }) => {
  app.component("q-input", QInput);
  app.component("q-list", QList);
  app.component("q-field", QField);
  app.component("q-checkbox", QCheckbox);
  app.use(number);
});
