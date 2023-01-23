const fs = require('fs');

const FILE_PATH = '../data/users.json';

function getDefaultStructure(items) {
    return {
        "version": 1,
        "items": items || []
    };
}

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
    if (!userData.id || !userData.name || userData.age < 0 || userData.age > 150) {
        return false;
    }
    return true;
}

/**
 * 
 * @param { { id: number, name: string, age: number } } userData 
 * @returns 
 */
function add(userData) {
    const users = readFile();

    let maxId = 0;
    for(let i = 0; i < users.length; i++) {
        if (users[i].id > maxId) {
            maxId = users[i].id;
        }
    }
    const newId = maxId + 1;

    userData.id = newId;
    if (!validate(userData)) {
        return;
    }
    users.push(userData);
    writeFile(users);
}

function get(id) {
    const users = readFile();
    for(let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return users[i];
        }
    }
}

function remove(id) {
    const users = readFile();
    const res = users.filter(function(user) {
        return user.id !== id;
    });
    writeFile(res);
}

function update(userData) {
    const users = readFile();
    if (!validate(userData)) {
        return;
    }
    for(let i = 0; i < users.length; i++) {
        if (users[i].id === userData.id) {
            users[i].name = userData.name;
            users[i].age = userData.age;
            break;
        }
    }
    writeFile(users);
}

function list() {
    const users = readFile();
    return users;
}


module.exports = {
    add,
    update,
    remove,
    list,
    validate,
    get
};
