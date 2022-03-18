import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class LessonsCascade extends BaseSchema {
  protected tableName = 'lessons';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('subject_id');
      table
        .integer('subject_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('subjects')
        .onDelete('CASCADE')
        .alter();

      table.dropForeign('timetable_id');
      table
        .integer('timetable_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('timetables')
        .onDelete('CASCADE')
        .alter();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('subject_id');
      table
        .integer('subject_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('subjects')
        .alter();

      table.dropForeign('timetable_id');
      table
        .integer('timetable_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('timetables')
        .alter();
    });
  }
}
