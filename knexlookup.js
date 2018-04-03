const settings = require('./settings');
const moment = require('moment');
const knex = require('knex')({
    client: 'pg',
    connection: {
        user: settings.user,
        password: settings.password,
        database: settings.database,
        host: settings.hostname,
        port: settings.port,
        ssl: settings.ssl
    }
});


let args = process.argv.slice(2);
let name = args[0];

knex.select().from('famous_people')
    .where('first_name', '=', name)
    .orWhere('last_name', '=', name)
    .asCallback(function(err, rows) {
        if (err) return console.error(err);
        console.log('Searching...');
        console.log(`Found ${rows.length} person(s) by the name '${name}':`);
        rows.forEach(function(rows) {
            let birthdate = moment(rows.birthdate).format('YYYY-MM-DD');
            console.log(`${rows.id}: ${rows.first_name} ${rows.last_name}, born '${birthdate}'`);
        })
        knex.destroy();
    });