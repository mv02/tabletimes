import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Application from '@ioc:Adonis/Core/Application';

export default class IndexSeeder extends BaseSeeder {
  public async run() {
    const seeders = [
      await import('../User'),
      await import('../Subject'),
      await import('../Timetable'),
      await import('../Lesson'),
    ];

    for (const seeder of seeders) {
      if (seeder.default.developmentOnly && Application.inProduction) continue;
      await new seeder.default(this.client).run();
    }
  }
}
