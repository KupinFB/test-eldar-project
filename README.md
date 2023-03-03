# Project for Eldar training
Some description

### Tasks
- [ ] Add function getMainConfig(). With ability to use package.json file or .template-master.json. File ".template-master.json" has highest priority. Try to use Object.assign() for values inheritance. Object.assign(defaultData, packageJsonData, templateMasterJsonData)
- [ ] Add function loadTemplateManifest(). Each template folder can have ".manifest.json" file with properties for this template.
- [ ] Add function getTemplatesList() and use data from mainConfig.templatesFolderPath to set folder with templates.
- [ ] Ignore ".manifest.json" when you copy files from template folder


##### Interfaces:
```
interface IGetTemplateOptions {
    folderPath: string;
}

interface ITemplate {
    name: string;
    fullPath: string;
}

interface ICreateFromTemplateOptions {
    sourcePath: string;
    targetPath: string;
    variables: { [key: string]: string };
}

interface ILoadTemplateManifestOptions {
    templatePath: string;
}

/** A structure of manifest.json file */
interface IManifestFile {
    name: string;
    defaultVariableValues: { [key: string]: string },
}

/** A structure of manifest.json file */
interface IMainConfig {
    templatesFolderPath: string;
}

```
##### Functions:
```
/** Reads data from this files "package.json", ".template-master.json" if files exist and build IMainConfig object using data from these files or set values by default.
templatesFolderPath - default value "./templates" */
getMainConfig(): Promise<IMainConfig>;

/** Creates Component in the target folder using source template */
createFromTemplate(options: ICreateFromTemplateOptions): Promise<void>;

/** Reads manifest.json file from the template folder if exists, fills template data or set defaults */
getTemplateData(options: ILoadTemplateManifestOptions): Promise<ITemplate>;

/** Returns a list of templates from the folder with templates */
getTemplatesList(options: IGetTemplateOptions): Promise<ITemplate[]>;

```


Logic that can be implemented





