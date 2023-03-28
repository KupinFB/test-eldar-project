/**
 *
 * @param { { targetPath: string, sourcePath: string, variables: any } } params
 */
const { renameFileName, renameFileInside } = require("./fs-utils.js");
const fs = require("fs-extra");
function makeDir(path, name) {
  let dir = path;
  if (!name) {
    console.log("Enter name");
  }
  dir += name;
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function createFromTemplate(params) {
  let path = makeDir(params.targetPath, params.variables.componentName);
  
  fs.copySync(params.sourcePath, path, {
    filter: function(src) {
      return !/manifest\.json$/i.test(src);
    }
  });
  
  renameFileName(params.variables.componentName, path);
  renameFileInside(params.variables.sayString, path);
}

module.exports = {
  createFromTemplate,
};
