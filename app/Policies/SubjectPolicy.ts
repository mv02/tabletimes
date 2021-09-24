import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer';
import User from 'App/Models/User';
import Subject from 'App/Models/Subject';

export default class SubjectPolicy extends BasePolicy {
  public async update(user: User, subject: Subject) {
    return subject.ownerId === user.id;
  }

  public async delete(user: User, subject: Subject) {
    return subject.ownerId === user.id;
  }
}
