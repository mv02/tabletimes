import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import User from 'App/Models/User';

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true;

  public async run() {
    await User.updateOrCreateMany('email', [
      {
        email: 'franta@beznyuzivatel.cz',
        password: 'franta',
        firstName: 'František',
        lastName: 'Novák',
      },
      {
        email: 'pepa@modryzub.cz',
        password: 'pepa',
        firstName: 'Josef',
        lastName: 'Novotný',
      },
      {
        email: 'admin@tabletimes.eu',
        password: 'PqO6ds',
        isAdmin: true,
      },
    ]);
  }
}
