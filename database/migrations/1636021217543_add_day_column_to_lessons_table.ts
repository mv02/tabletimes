import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AddDayColumnToLessonsTable extends BaseSchema {
  protected tableName = 'lessons';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('day').unsigned().notNullable().after('id');
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('day');
    });
  }
}
