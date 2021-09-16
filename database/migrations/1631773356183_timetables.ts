import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Timetables extends BaseSchema {
  protected tableName = 'timetables';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name', 50).notNullable();
      table.boolean('is_public').notNullable().defaultTo(false);
      table.string('share_code', 6);
      table.date('valid_from').notNullable().defaultTo(this.now());
      table.date('valid_to').notNullable();
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
