require("dotenv").config();

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { add, update, list, remove } = require("./utils/") //with nothing inside it automatically searches for index
const { connection } = require("./connection");
const { Book } = require("./models/");
const argv = yargs(hideBin(process.argv)).argv;

async function main() {
    try {
        await connection.authenticate();
        await Book.sync({alter: true});
        console.log(`Connection to ${process.env.DB_HOST} established.`);

        if (argv.add) {
            await add(argv.title, argv.author, argv.genre);
        } else if (argv.update) {
            await update(argv.id, argv.title, argv.author, argv.genre);
        } else if (argv.list) {
            await list(argv.title, argv.author, argv.genre);
        } else if (argv.remove) {
            await remove(argv.id);
        }

        await connection.close();
    } catch (error) {
        console.log(`Unable to connect to the DB: ${error}`);
    }

    process.exit();
}

main();