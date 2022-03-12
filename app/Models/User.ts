import { DateTime } from 'luxon';
import {
  BaseModel,
  beforeSave,
  column,
  computed,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm';
import Subject from './Subject';
import Timetable from './Timetable';
import Hash from '@ioc:Adonis/Core/Hash';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string | undefined;

  @column()
  public firstName: string | null;

  @column()
  public lastName: string | null;

  @hasMany(() => Subject, { foreignKey: 'ownerId' })
  public subjects: HasMany<typeof Subject>;

  @hasMany(() => Timetable, { foreignKey: 'ownerId' })
  public timetables: HasMany<typeof Timetable>;

  @manyToMany(() => Timetable)
  public sharedTimetables: ManyToMany<typeof Timetable>;

  @computed()
  public get allTimetables() {
    return [...(this.timetables ?? []), ...(this.sharedTimetables ?? [])];
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @computed()
  public get fullName() {
    if (this.firstName && this.lastName) return `${this.firstName} ${this.lastName}`;
    return null;
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) user.password = await Hash.make(user.password as string);
  }
}
