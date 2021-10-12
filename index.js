require("dotenv").config();

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { add, update, list, remove } = require("./utils/") //with nothing inside it automatically searches for index
const { connection } = require("./connection");
const { Author, Book, Genre } = require("./models/");

const argv = yargs(hideBin(process.argv)).argv;

async function main() {
    try {
        await connection.authenticate();
        await Author.sync({alter: true});
        await Genre.sync({alter: true});
        await Book.sync({alter: true});

        if (argv.add) {
            await add(argv);
        } else if (argv.list) {
            await list(argv);
        } else if (argv.update && argv.id) {
            await update(argv);
        } else if (argv.remove && argv.id) {
            await remove(argv);
        }

        await connection.close();
    } catch (error) {
        console.log(`Unable to connect to the DB: ${error}`);
    }

    process.exit();
}

main();