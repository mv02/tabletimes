import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AddAdminColumnToUsersTable extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_admin').notNullable().defaultTo(false).after('last_name');
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('is_admin');
    });
  }
}
