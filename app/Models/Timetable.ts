import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import Lesson from './Lesson';
import User from './User';

export default class Timetable extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public isPublic: boolean;

  @column()
  public shareCode: string | null;

  @column.date()
  public validFrom: DateTime;

  @column.date()
  public validTo: DateTime | null;

  @column({ serializeAs: null })
  public ownerId: number;

  @belongsTo(() => User)
  public owner: BelongsTo<typeof User>;

  @hasMany(() => Lesson)
  public lessons: HasMany<typeof Lesson>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
