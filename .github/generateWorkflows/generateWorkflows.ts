import fs from "fs-extra";
import jsYaml from "js-yaml";
import { resolve } from "path";

const workflowsDir = resolve(__dirname, "..", "workflows");

["master", "draftRelease"].forEach(workflow => {
  // ["master"].forEach(workflow => {
  fs.writeFileSync(
    resolve(workflowsDir, `${workflow}.yml`),
    jsYaml.safeDump(require(`./${workflow}`).default, { noRefs: true }),
    { encoding: "utf8" },
  );
});
