const { Author, Book, Genre } = require("../models");

async function add({add, name, AuthorId, GenreId, title}) {
    if (add === "author") {
        await Author.create({name});
    } else if (add === "book") {
        const author = await Author.findByPk(AuthorId);
        const genre = await Genre.findByPk(GenreId);
        await Book.create({title: title, AuthorId: author.id, GenreId: genre.id});
    } else if (add === "genre") {
        await Genre.create({name});
    }
};

async function list({list}) {
    let results = [];

    if (list === "authors") {
        results = await Author.findAll({attributes: ["id", "name"]});
    } else if (list === "books") {
        results = await Book.findAll({attributes: ["id", "title", "AuthorId", "GenreId"]});
    } else if (list === "genres") {
        results = await Genre.findAll({attributes: ["id", "name"]});
    }

    console.table(results.map(result => result.dataValues));
};

async function update({update, id, name, AuthorId, GenreId, title}) {
    if (update === "author") {
        const author = await Author.findByPk(id);
        await Author.update({ name: name || author.name }, {where: {id} });
    } else if (update === "book") {
        const book = await Book.findByPk(id);
        await Book.update({ title: title || book.title, AuthorId: AuthorId || book.AuthorId, GenreId: GenreId || book.GenreId }, {where: {id} });
    } else if (update === "genre") {
        const genre = await Genre.findByPk(id);
        await Genre.update({ name: name || genre.name }, { where: {id} });
    }
};

async function remove({remove, id}) {
    if (remove === "author") {
        await Author.destroy({where: {id} });
    } else if (remove === "book") {
        await Book.destroy({where: {id} });
    } else if (remove === "genre") {
        await Genre.destroy({where: {id} });
    }
};

module.exports = {add, update, list, remove};