import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Subject from 'App/Models/Subject';

export default class SubjectsController {
  public async create({ view }: HttpContextContract) {
    return await view.render('subjects.form');
  }

  public async store({ auth, request, response, session }: HttpContextContract) {
    try {
      await Subject.create({
        name: request.input('name'),
        short: request.input('short'),
        color: request.input('color').substring(1),
        ownerId: auth.user?.id,
      });

      session.flash({
        success: true,
        message: `Předmět ${request.input('name').toLowerCase()} vytvořen.`,
      });
    } catch {
      session.flash({ success: false, message: 'Při vytváření předmětu došlo k chybě.' });
    }

    return await response.redirect().back();
  }

  public async edit({ bouncer, request, view }: HttpContextContract) {
    const subject = await Subject.findOrFail(request.param('id'));
    await bouncer.with('SubjectPolicy').authorize('update', subject);

    return await view.render('subjects.form', { subject: subject });
  }

  public async update({ bouncer, request, response, session }: HttpContextContract) {
    const subject = await Subject.findOrFail(request.param('id'));
    await bouncer.with('SubjectPolicy').authorize('update', subject);

    try {
      await subject
        .merge({
          name: request.input('name'),
          short: request.input('short'),
          color: request.input('color').substring(1),
        })
        .save();
    } catch {
      session.flash({ success: false, message: 'Při úpravě předmětu došlo k chybě.' });
      return await response.redirect().back();
    }

    session.flash({ success: true, message: `Předmět ${subject.name.toLowerCase()} upraven.` });
    return await response.redirect().toRoute('dashboard');
  }

  public async destroy({ bouncer, request, response }: HttpContextContract) {
    const subject = await Subject.findOrFail(request.param('id'));
    await bouncer.with('SubjectPolicy').authorize('delete', subject);

    await subject.delete();
    return await response.redirect().back();
  }
}
