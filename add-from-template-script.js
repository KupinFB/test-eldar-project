const { createFromTemplate } = require("./automation");
const fs = require('fs');
const path = require('path');
let manifestData = loadTemplateManifest("./templates/app-x/");
createFromTemplate({
    sourcePath: "./templates/app-x/",
    targetPath: "./services/",
    variables: {
        componentName: manifestData.defaultVariableValues.componentName,
        sayString: "Hello!"
    }
});
function getMainConfig() {
    const defaultData = {
        "templatesFolderPath": "./templates"
      };
      let packageJsonData = {};
      const packageJson = fs.readFileSync('./package.json', 'utf8');
      if (packageJson) {
        const packageJsonParsed = JSON.parse(packageJson);
        packageJsonData = packageJsonParsed.templateMaster || {};
      }
      let templateMasterJsonData = {};
      const templateMasterJson = fs.readFileSync('./.template-master.json', 'utf8');
      if (templateMasterJson) {
        templateMasterJsonData = JSON.parse(templateMasterJson);
      }
     return Object.assign(defaultData, packageJsonData, templateMasterJsonData);
    }
function loadTemplateManifest(templateFolder){
      const manifestPath = path.join(templateFolder, 'manifest.json');
      let manifest = null;
      let manifestContent;
        manifestContent = fs.readFileSync(manifestPath, 'utf8');
      if (manifestContent) {
        manifest = JSON.parse(manifestContent);
        return manifest;
        }
}
function getTemplatesList(options){
    const templatesFolderPath = options.MainConfig.templatesFolderPath;
    const templatesPath = path.join(__dirname, templatesFolderPath);
  
    return new Promise(function(resolve, reject) {
      fs.readdir(templatesPath, function(err, files) {
        if (err) {
          reject(err);
          return;
        }
  
        const templates = [];
  
        files.forEach(function(file) {
          const templateFolder = path.join(templatesPath, file);
          const manifest = loadTemplateManifest(templateFolder);
  
          if (manifest) {
            const template = {
              name: manifest.name || file,
              folder: templateFolder,
              manifest: manifest,
            };
            templates.push(template);
          }
        });
  
        resolve(templates);
      });
    });
}