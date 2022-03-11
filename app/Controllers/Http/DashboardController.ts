import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class DashboardController {
  public async index({ auth, inertia, request }: HttpContextContract) {
    const filter = request.input('filter') ?? '';

    const settings = request.cookie('settings', {
      sortBy: 'name',
      showInvalid: true,
      showOwned: true,
      showShared: true,
    });

    await auth.user?.load('subjects', (query) => query.orderBy('name'));
    await auth.user?.load('timetables', (query) =>
      query
        .where('name', 'like', `%${filter}%`)
        .preload('lessons')
        .preload('owner')
        .orderBy(settings.sortBy)
    );

    return inertia.render('Dashboard/Index', {
      subjects: auth.user?.subjects,
      timetables: auth.user?.timetables.filter((t) => {
        if (!settings.showInvalid && !t.isValid) return false;
        if (!settings.showOwned && t.owner.id === auth.user?.id) return false;
        if (!settings.showShared && t.owner.id !== auth.user?.id) return false;
        return true;
      }),
      settings,
    });
  }

  public async saveSettings({ request, response }: HttpContextContract) {
    response.cookie('settings', request.input('settings'));
  }
}
