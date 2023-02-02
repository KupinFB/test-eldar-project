const fs = require('fs');

const FILE_PATH = '../data/users.json';


/**
 * Returns array of users
 * @returns { Array<{ id: number, name: string, age: number }> }
 */
function readFile() {
    if (!fs.existsSync(FILE_PATH)) {
        const fileStr = JSON.stringify(getDefaultStructure());
        fs.writeFileSync(FILE_PATH, fileStr, { encoding: 'utf8' });
    }
    const resStr = fs.readFileSync(FILE_PATH, { encoding: 'utf8' });
    const res = JSON.parse(resStr);
    return res.items;
}

function writeFile(items) {
    const fileStr = JSON.stringify(getDefaultStructure(items));
    fs.writeFileSync(FILE_PATH, fileStr, { encoding: 'utf8' });
}

function validate(userData) {
    // ..
}

/**
 * 
 * @param { { id: number, name: string, age: number } } userData 
 * @returns 
 */
function add(userData) {
    // ...
}

function get(id) {
    // ...
}

function remove(id) {
    // ...
}

function update(userData) {
    // ...
}

function list() {
    // ...
}


module.exports = {
    add,
    update,
    remove,
    list,
    validate,
    get
};
