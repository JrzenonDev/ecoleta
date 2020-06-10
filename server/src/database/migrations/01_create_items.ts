import Knex from 'knex';
/**
 * neste caso como estamos utilizando o ts,
 * definimos o nome da variável em si com a primeira letra maíscula,
 * para definir a tipagem, como não é um tipo primitivo como (inter, string, boolean)
*/


export async function up(knex: Knex) {
  // criar a tabela
  return knex.schema.createTable('items', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title');
  })
}

export async function down(knex: Knex) {
  // voltar atrás (deletar a tabela)
  return knex.schema.dropTable('items');
}