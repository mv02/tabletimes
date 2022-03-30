import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import { string } from '@ioc:Adonis/Core/Helpers';
import { DateTime } from 'luxon';
import Timetable from 'App/Models/Timetable';

export default class TimetableSeeder extends BaseSeeder {
  public static developmentOnly = true;

  public async run() {
    await Timetable.updateOrCreateMany(
      ['name', 'ownerId'],
      [
        {
          name: '4.A, 2021/2022',
          shareCode: string.generateRandom(6),
          validFrom: DateTime.fromISO('2021-09-01'),
          validTo: DateTime.fromISO('2022-04-30'),
          ownerId: 1,
        },
        {
          name: '2.A, 2021/2022',
          shareCode: string.generateRandom(6),
          validFrom: DateTime.fromISO('2021-09-01'),
          validTo: DateTime.fromISO('2022-06-30'),
          ownerId: 1,
        },

        {
          name: 'Třída 8.C',
          shareCode: string.generateRandom(6),
          validFrom: DateTime.fromISO('2021-09-01'),
          validTo: DateTime.fromISO('2022-06-30'),
          ownerId: 2,
        },
      ]
    );

    (await Timetable.findMany([1, 2])).forEach((t) => t.related('usersWithAccess').attach([2]));
    (await Timetable.findOrFail(3)).related('usersWithAccess').attach([1]);
  }
}
