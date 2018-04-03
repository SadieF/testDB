const pg = require("pg");
const settings = require("./settings");
const moment = require("moment");

const client = new pg.Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
});

let args = process.argv.slice(2);
let name = args[0];


client.connect((err) => {
    if (err) {
        return console.error("Connection Error", err);
    }
    client.query("SELECT * FROM famous_people WHERE first_name = $1", [name], (err, result) => {
        if (err) {
            return console.error("error running query", err);
        }
        console.log('Searcing...');
        console.log(`Found ${result.rows.length} person(s) by the name '${name}':`);
        result.rows.forEach(function(rows) {
            let birthdate = moment(rows.birthdate).format('YYYY-MM-DD');
            console.log(`${rows.id}: ${rows.first_name} ${rows.last_name}, born '${birthdate}'`);
            client.end();
        })
    });
});