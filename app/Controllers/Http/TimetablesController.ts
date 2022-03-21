import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { DateTime } from 'luxon';
import Timetable from 'App/Models/Timetable';
import User from 'App/Models/User';

export default class TimetablesController {
  public async create({ inertia }: HttpContextContract) {
    const now = DateTime.now();
    return await inertia.render('Timetables/Create', {
      today: now.toISODate(),
      endOfYear: now.endOf('year').toISODate(),
    });
  }

  public async store({ auth, request, response, session }: HttpContextContract) {
    let timetable;

    try {
      timetable = await Timetable.create({
        name: request.input('name'),
        isPublic: request.input('isPublic'),
        validFrom: request.input('validFrom'),
        validTo: request.input('validTo'),
        ownerId: auth.user?.id,
      });

      session.flash({ messages: [`Rozvrh ${timetable.name} vytvořen.`] });
    } catch {
      session.flash({ errors: ['Při vytváření rozvrhu došlo k chybě.'] });
    }

    return response.redirect().toRoute('timetables.show', { id: timetable.id });
  }

  public async show({ bouncer, inertia, request }: HttpContextContract) {
    const timetable = await Timetable.findOrFail(request.param('id'));
    await timetable.load('lessons', (query) => {
      query.preload('subject').orderBy(['day', 'period', 'id']);
    });
    await timetable.load('owner');
    await bouncer.with('TimetablePolicy').authorize('view', timetable);
    timetable.can.update = await bouncer.with('TimetablePolicy').allows('update', timetable);

    return await inertia.render('Timetables/Index', { timetable: timetable });
  }

  public async edit({ auth, bouncer, inertia, request }: HttpContextContract) {
    const timetable = await Timetable.findOrFail(request.param('id'));
    await timetable.load('lessons', (query) => {
      query.preload('subject').orderBy(['day', 'period', 'id']);
    });
    await timetable.load('owner');
    await bouncer.with('TimetablePolicy').authorize('update', timetable);

    await auth.user?.load('subjects', (query) => query.orderBy('name'));
    const subjects = auth.user?.subjects;

    return await inertia.render('Timetables/Edit', { timetable: timetable, subjects: subjects });
  }

  public async update({ bouncer, request, response, session }: HttpContextContract) {
    const timetable = await Timetable.findOrFail(request.param('id'));
    await bouncer.with('TimetablePolicy').authorize('update', timetable);

    await timetable.merge(request.all()).save();
    session.flash({ messages: [`Rozvrh ${timetable.name} upraven.`] });

    return response.redirect().back();
  }

  public async destroy({ bouncer, request, response, session }: HttpContextContract) {
    const timetable = await Timetable.findOrFail(request.param('id'));
    await bouncer.with('TimetablePolicy').authorize('delete', timetable);

    await timetable.delete();
    session.flash({ messages: [`Rozvrh ${timetable.name} odstraněn.`] });

    return response.redirect().back();
  }

  public async shareForm({ bouncer, inertia, request }: HttpContextContract) {
    const timetable = await Timetable.findOrFail(request.param('id'));
    await bouncer.with('TimetablePolicy').authorize('update', timetable);
    await timetable.load('usersWithAccess');

    return await inertia.render('Timetables/Share', { timetable });
  }

  public async share({ auth, bouncer, response, request, session }: HttpContextContract) {
    if (request.input('email') === auth.user?.email) return response.redirect().back();

    const timetable = await Timetable.findOrFail(request.param('id'));
    await bouncer.with('TimetablePolicy').authorize('update', timetable);
    await timetable.load('usersWithAccess');

    try {
      const user = await User.findByOrFail('email', request.input('email'));
      if (!timetable.usersWithAccess.map((u) => u.id).includes(user.id))
        await timetable.related('usersWithAccess').attach([user.id]);

      session.flash({ messages: ['Přístupová práva změněna.'] });
    } catch {
      session.flash({ errors: ['Účet s touto e-mailovou adresou neexistuje.'] });
    }

    return response.redirect().back();
  }

  public async unshare({ bouncer, request, response, session }: HttpContextContract) {
    const timetable = await Timetable.findOrFail(request.param('id'));
    await bouncer.with('TimetablePolicy').authorize('update', timetable);

    await timetable.related('usersWithAccess').detach([request.input('userId')]);
    session.flash({ messages: ['Uživatel odstraněn.'] });

    return response.redirect().back();
  }
}
