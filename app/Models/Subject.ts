import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import Lesson from './Lesson';

export default class Subject extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public short: string;

  @column()
  public color: string;

  @belongsTo(() => User)
  public owner: BelongsTo<typeof User>;

  @hasMany(() => Lesson)
  public lessons: HasMany<typeof Lesson>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
