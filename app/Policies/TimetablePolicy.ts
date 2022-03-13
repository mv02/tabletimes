import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer';
import User from 'App/Models/User';
import Timetable from 'App/Models/Timetable';

export default class TimetablePolicy extends BasePolicy {
  public async view(user: User, timetable: Timetable) {
    await timetable.load('usersWithAccess');
    return (
      timetable.ownerId === user.id ||
      Boolean(timetable.isPublic) ||
      timetable.usersWithAccess.map((u) => u.id).includes(user.id)
    );
  }

  public async update(user: User, timetable: Timetable) {
    return timetable.ownerId === user.id;
  }

  public async delete(user: User, timetable: Timetable) {
    return timetable.ownerId === user.id;
  }
}
