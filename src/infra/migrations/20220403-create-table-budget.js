const knex = require('knex');

exports.up = function(knex) {
    return knex.schema.createTable('budget', function(table){
            table.string('id').primary();
            table.string('servico_id').notNullable();
            table.string('user_id').notNullable();
            table.string('valor').notNullable();
            table.string('data_incial').notNullable();
            table.string('data_final').notNullable();
            table.string('observacao').notNullable();
            table.string('status').notNullable();
        });
};
   
exports.down = function(knex) {
    return knex.schema.dropTable('budget');
};
