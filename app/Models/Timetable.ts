import { DateTime } from 'luxon';
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  computed,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm';
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

  @column.date({ serialize: (value: DateTime) => (value.isValid ? value?.toISODate() : null) })
  public validFrom: DateTime;

  @column.date({ serialize: (value: DateTime) => (value.isValid ? value?.toISODate() : null) })
  public validTo: DateTime;

  @column({ serializeAs: null })
  public ownerId: number;

  @belongsTo(() => User, { foreignKey: 'ownerId' })
  public owner: BelongsTo<typeof User>;

  @manyToMany(() => User)
  public usersWithAccess: ManyToMany<typeof User>;

  @hasMany(() => Lesson)
  public lessons: HasMany<typeof Lesson>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @computed()
  public get minPeriod() {
    for (const lesson of this.lessons ?? []) if (lesson.period === 0) return 0;
    return 1;
  }

  @computed()
  public get maxPeriod() {
    let max = 0;
    for (const lesson of this.lessons ?? []) max = Math.max(max, lesson.period);
    return max;
  }

  @computed()
  public get isValid() {
    return this.validFrom <= DateTime.now() && this.validTo >= DateTime.now();
  }
}
