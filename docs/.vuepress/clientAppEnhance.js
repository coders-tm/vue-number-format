import number from "../../src";
import { defineClientAppEnhance } from "@vuepress/client";
import "virtual:windi.css";

export default defineClientAppEnhance(({ app }) => {
  app.use(number);
});
