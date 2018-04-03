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
let firstname = args[0];
let lastname = args[1];
let birthday = args[2];

knex.insert({
        first_name: firstname,
        last_name: lastname,
        birthdate: birthday
    })
    .returning('id')
    .into('famous_people')
    .asCallback(function(err, rows) {
        if (err) return console.error(err);
        console.log('Added!');
        knex.destroy();
    });