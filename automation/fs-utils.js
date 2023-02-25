const fs = require("fs-extra");
const Mustache = require("mustache");
const path = require("path");
const customTags = ["[", "]"];
function renameFileName(componentName, folderPath) {
  const directoryPath = folderPath;
  fs.readdir(directoryPath, function (err, files) {
    files.forEach(function (file) {
      if (file.includes("[componentName]")) {
        const oldPath = path.join(directoryPath, file);
        const newName = file.replace("[componentName]", componentName);
        const newPath = path.join(directoryPath, newName);
        fs.rename(oldPath, newPath, function () {});
      }
      if (file.includes("{{componentName}}")) {
        const oldPath = path.join(directoryPath, file);
        const newName = file.replace("{{componentName}}", componentName);
        const newPath = path.join(directoryPath, newName);
        fs.rename(oldPath, newPath, function () {});
      }
    });
  });
}
function renameFileInside(sayString, path) {
  const view = {sayString: sayString}
  const folderPath = path;
  function processFile(filePath) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const processedContent = Mustache.render(fileContent, view);
    fs.writeFileSync(filePath, processedContent);
    const fileContent2 = fs.readFileSync(filePath, "utf8");
    const processedContent2 = Mustache.render(fileContent2, view, {}, customTags);
    fs.writeFileSync(filePath, processedContent2);
  }
  function processFolder(folderPath) {
    const items = fs.readdirSync(folderPath);
    items.forEach((item) => {
      const path = require("path");
      const itemPath = path.join(folderPath, item);
      const isDirectory = fs.statSync(itemPath).isDirectory();
      if (isDirectory) {
        processFolder(itemPath);
      } else {
        processFile(itemPath);
      }
    });
  }
  processFolder(folderPath);
}

module.exports = {
  renameFileName,
  renameFileInside,
};
