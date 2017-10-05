const pgp = require('pg-promise')();

const connectionSettings = {
  host: 'localhost',
  port: 5432,
  database: 'concert_list',
  user: 'Drisdon'
}

const db = pgp(connectionSettings);
module.exports = db;
