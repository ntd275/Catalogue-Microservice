const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: "catalogue_db",
        user: "catalogue_user",
        password: 'default_password',
        database: 'socksdb',
        timezone: "+00:00",
        port: 3306,
    },
    acquireConnectionTimeout: 30000
});

const { attachPaginate } = require('knex-paginate');
attachPaginate();

module.exports = knex