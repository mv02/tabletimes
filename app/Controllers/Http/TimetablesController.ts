import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { DateTime } from 'luxon';
import Timetable from 'App/Models/Timetable';

export default class TimetablesController {
  public async create({ inertia }: HttpContextContract) {
    const now = DateTime.now();
    return await inertia.render('Timetables/Create', {
      today: now.toISODate(),
      endOfYear: now.endOf('year').toISODate(),
    });
  }

  public async store({ auth, request, response, session }: HttpContextContract) {
    const messages: {}[] = [];
    let timetable;

    try {
      timetable = await Timetable.create({
        name: request.input('name'),
        isPublic: request.input('isPublic'),
        validFrom: request.input('validFrom'),
        validTo: request.input('validTo'),
        ownerId: auth.user?.id,
      });

      messages.push({ success: true, text: 'Rozvrh byl úspěšně vytvořen.' });
    } catch {
      messages.push({ success: false, text: 'Při vytváření rozvrhu došlo k chybě.' });
    }

    session.flash({ messages: messages });
    return response.redirect().toRoute('timetables.show', { id: timetable.id });
  }

  public async show({ bouncer, inertia, request }: HttpContextContract) {
    const timetable = await Timetable.findOrFail(request.param('id'));
    await timetable.load('lessons', (query) => {
      query.preload('subject').orderBy(['day', 'period', 'id']);
    });
    await timetable.load('owner');
    await bouncer.with('TimetablePolicy').authorize('view', timetable);

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

  public async update({ bouncer, request, response }: HttpContextContract) {
    const timetable = await Timetable.findOrFail(request.param('id'));
    await bouncer.with('TimetablePolicy').authorize('update', timetable);

    await timetable.merge(request.all()).save();
    return response.redirect().back();
  }

  public async destroy({}: HttpContextContract) {}
}
