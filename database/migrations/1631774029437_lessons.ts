import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Lessons extends BaseSchema {
  protected tableName = 'lessons';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('period').unsigned().notNullable();
      table.integer('subject_id').unsigned().notNullable().references('id').inTable('subjects');
      table.integer('timetable_id').unsigned().notNullable().references('id').inTable('timetables');

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
