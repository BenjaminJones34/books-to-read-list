const fs = require("fs");
const path = require("path");
const { nanoid, customAlphabet } = require("nanoid");
const dataPath = path.join(process.env.DATA_LOCATION, "data.json");

function saveData(data) {
    try {
        if (!fs.existsSync(process.env.DATA_LOCATION)) {
            fs.mkdirSync(process.env.DATA_LOCATION);
        }
        
        fs.writeFileSync(dataPath, JSON.stringify(data));
    } catch(error) {
        console.log(error);
    }
};

function loadData() {
    try {
        return JSON.parse(fs.readFileSync(dataPath).toString());
    } catch(error) {
        return [];
    }
};

function makeId() {
    return customAlphabet(process.env.CHARACTERS, parseInt(process.env.LENGTH))();
};

function add(title, author, genre, id = false) {
    saveData([...loadData(), {id : id || makeId(), title, author, genre}]);
};

function list() {
    console.log(loadData());
};

function update(id, title, author, genre) {
    const book = remove(id);
    add(title || book.title, author || book.author, genre || book.genre, id);
};

function remove(id) {
    const books = loadData();
    const book = books.find((book) => book.id === id);
    const matchBook = (book) => book.id !== id;
    saveData(books.filter(matchBook));
    return book;
};

module.exports = {add, update, list, remove};