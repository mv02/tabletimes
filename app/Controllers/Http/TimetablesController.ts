import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { DateTime } from 'luxon';
import Timetable from 'App/Models/Timetable';

export default class TimetablesController {
  public async create({ view }: HttpContextContract) {
    return await view.render('timetables.create', { now: DateTime.now() });
  }

  public async store({ auth, request, response, session }: HttpContextContract) {
    let timetable;

    try {
      timetable = await Timetable.create({
        name: request.input('name'),
        isPublic: JSON.parse(request.input('is-public')),
        validFrom: request.input('valid-from'),
        validTo: request.input('valid-to'),
        ownerId: auth.user?.id,
      });

      session.flash({ success: true, message: 'Rozvrh byl úspěšně vytvořen.' });
    } catch {
      session.flash({ success: false, message: 'Při vytváření rozvrhu došlo k chybě.' });
    }

    return response.redirect().toRoute('timetables.show', { id: timetable.id });
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
