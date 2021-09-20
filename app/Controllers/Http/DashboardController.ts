import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class DashboardController {
  public async index({ auth, view }: HttpContextContract) {
    await auth.user?.load('subjects', (query) => query.orderBy('name'));
    await auth.user?.load('timetables', (query) => query.preload('lessons'));

    return view.render('dashboard', {
      subjects: auth.user?.subjects,
      timetables: auth.user?.timetables,
    });
  }
}
