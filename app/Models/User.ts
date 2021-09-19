import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import Subject from './Subject';
import Timetable from './Timetable';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string | null;

  @column()
  public firstName: string | null;

  @column()
  public lastName: string | null;

  @hasMany(() => Subject, { foreignKey: 'ownerId' })
  public subjects: HasMany<typeof Subject>;

  @hasMany(() => Timetable, { foreignKey: 'ownerId' })
  public timetables: HasMany<typeof Timetable>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
