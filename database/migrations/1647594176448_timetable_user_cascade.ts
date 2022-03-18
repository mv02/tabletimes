import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class TimetableUserCascade extends BaseSchema {
  protected tableName = 'timetable_user';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('timetable_id');
      table
        .integer('timetable_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('timetables')
        .onDelete('CASCADE')
        .alter();

      table.dropForeign('user_id');
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .alter();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('timetable_id');
      table
        .integer('timetable_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('timetables')
        .alter();

      table.dropForeign('user_id');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').alter();
    });
  }
}
