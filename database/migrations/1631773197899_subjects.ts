import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Subjects extends BaseSchema {
  protected tableName = 'subjects';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name', 30).notNullable();
      table.string('short', 10).notNullable();
      table.string('color', 6).notNullable().defaultTo('ffffff');
      table.integer('owner_id').unsigned().notNullable().references('id').inTable('users');

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
