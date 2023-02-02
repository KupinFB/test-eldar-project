const { createFromTemplate } = require("./automation");

createFromTemplate({
    sourcePath: "./templates/app-x/",
    targetPath: "./services/",
    variables: {
        componentName: "Component3",
        sayString: "Hello!"
    }
});