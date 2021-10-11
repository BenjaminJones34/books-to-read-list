const { Book } = require("../models");

async function add(title, author, genre) {
    await Book.create({title, author, genre});
    console.log(`Added: ${title}`);
};

async function list() {
    console.log("\n");
    for (book of await Book.findAll()) {
        console.log(`ID:\t${book.id}\nTitle:\t${book.title}`);
        console.log(`Author:\t${book.author}\nGenre:\t${book.genre}\n\n`);
    }
};

async function update(id, title, author, genre) {
    const book = await Book.findAll({where: {id}});
    await Book.update({ title: title || book.title, 
                        author: author || book.author, 
                        genre: genre || book.genre
                    }, { where: {id} });
    await console.log(`\nUpdated: ${book[0].title}\n`);  
};

async function remove(id) {
    await Book.destroy({ where: { id } });
    console.log(`\nDeleted book.\n`)
};

module.exports = {add, update, list, remove};