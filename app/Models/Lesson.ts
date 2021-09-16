import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Subject from './Subject';
import Timetable from './Timetable';

export default class Lesson extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public period: number;

  @belongsTo(() => Subject)
  public subject: BelongsTo<typeof Subject>;

  @belongsTo(() => Timetable)
  public timetable: BelongsTo<typeof Timetable>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
