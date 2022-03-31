import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Timetable from 'App/Models/Timetable';
import Subject from 'App/Models/Subject';

export default class DashboardController {
  public async index({ auth, bouncer, inertia, request }: HttpContextContract) {
    const filter = request.input('filter') ?? '';

    const settings = request.cookie('settings', {
      sortBy: 'name',
      showInvalid: true,
      showOwned: true,
      showShared: true,
    });

    await auth.user?.load('subjects', (query) => query.orderBy('name'));
    await auth.user?.load('timetables', (query) =>
      query.where('name', 'like', `%${filter}%`).preload('lessons').preload('owner')
    );
    await auth.user?.load('sharedTimetables', (query) =>
      query.where('name', 'like', `%${filter}%`).preload('lessons').preload('owner')
    );

    const timetables = (
      auth.user?.isAdmin
        ? await Timetable.query().preload('lessons').preload('owner')
        : auth.user?.allTimetables ?? []
    )
      .sort((a, b) => {
        if (a[settings.sortBy] < b[settings.sortBy]) return -1;
        if (a[settings.sortBy] > b[settings.sortBy]) return 1;
        return 0;
      })
      .filter((t) => {
        if (!settings.showInvalid && !t.isValid) return false;
        if (!settings.showOwned && t.owner.id === auth.user?.id) return false;
        if (!settings.showShared && t.owner.id !== auth.user?.id) return false;
        return true;
      });

    for (const t of timetables ?? [])
      t.can.update = await bouncer.with('TimetablePolicy').allows('update', t);

    return inertia.render('Dashboard/Index', {
      subjects: auth.user?.isAdmin
        ? await Subject.query().preload('owner').orderBy('name')
        : auth.user?.subjects,
      timetables,
      settings,
    });
  }

  public async saveSettings({ auth, request, response }: HttpContextContract) {
    if (request.input('settings')) response.cookie('settings', request.input('settings'));
    else {
      await auth.user
        ?.merge({
          firstName: request.input('firstName'),
          lastName: request.input('lastName'),
        })
        .save();
      return response.redirect().back();
    }
  }
}
