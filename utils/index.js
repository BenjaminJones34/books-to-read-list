const { Book } = require("../models");

async function add(title, author, genre) {
    await Book.create({title, author, genre});
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
};

async function remove(id) {
    await Book.destroy({ where: { id } });
};

module.exports = {add, update, list, remove};