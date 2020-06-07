import Knex from 'knex';
/**
 * neste caso como estamos utilizando o ts,
 * definimos o nome da variável em si com a primeira letra maíscula,
 * para definir a tipagem, como não é um tipo primitivo como (inter, string, boolean)
*/


export async function up(knex: Knex) {
  // criar a tabela
  return knex.schema.createTable('point_items', table => {
    table.increments('id').primary();

    table.integer('point_id')
      .notNullable()
      .references('id')
      .inTable('points');

    table.integer('item_id')
      .notNullable()
      .references('id')
      .inTable('item');
  })
}

export async function down(knex: Knex) {
  // voltar atrás (deletar a tabela)
  return knex.schema.dropTable('point_items');
}