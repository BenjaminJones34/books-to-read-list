const { DataTypes } = require("sequelize");
const { connection } = require("../connection");

const Author = connection.define("Author", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { });

const Book = connection.define("Book", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    indexes: [{unique: true, fields: ["title"]}]
});

const Genre = connection.define("Genre", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    indexes: [{unique: true, fields: ["name"]}]
});

Book.belongsTo(Author, {onDelete: "cascade"});
Book.belongsTo(Genre, {onDelete: "SET NULL"});

module.exports = {Author, Book, Genre};