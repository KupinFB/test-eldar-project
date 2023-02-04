/**
 * 
 * @param { { targetPath: string, sourcePath: string, variables: any } } params 
 */
const { copyFolderRecursiveSync } = require("./fs-utils.js");
const fs = require('fs');
function makeDir(path, name){
    let dir = path;
    if(!name){
        console.log('Enter name');
    }
    dir += name;
    fs.mkdirSync(dir, { recursive: true });
    return dir;
}
function createFromTemplate(params) {
    // params.targetPath; // string
    // params.sourcePath; // string
    // params.variables; // object

    // params.variables = {
    //     componentName: "" // string
    // };
    

    let path = makeDir(params.targetPath, params.variables.componentName);
    copyFolderRecursiveSync(params.sourcePath, path)
    // создать папку в нужном месте с именем равным params.variables.componentName в папке params.targetPath

    // скопировать содержимое из папки params.sourcePath

    // скомпилировать имена файлов

    // скомпилировать содержимое файлов

    

    //.......
}

module.exports = {
    createFromTemplate
}
