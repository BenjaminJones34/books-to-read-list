require("dotenv").config();

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv)).argv;
const {add, update, list, remove} = require ("./utils/") //with nothing inside it automatically searches for index

function main() {
    if (argv.add) {
        add(argv.title, argv.author, argv.genre);
    } else if (argv.update) {
        update(argv.id, argv.title, argv.author, argv.genre);
    } else if (argv.list) {
        list(argv.title, argv.author, argv.genre);
    } else if (argv.remove) {
        remove(argv.id);
    }
}

main();