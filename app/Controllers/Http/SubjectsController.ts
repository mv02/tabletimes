import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Subject from 'App/Models/Subject';

export default class SubjectsController {
  public async create({ inertia }: HttpContextContract) {
    return await inertia.render('Subjects/Index');
  }

  public async store({ auth, request, response, session }: HttpContextContract) {
    try {
      await Subject.create({
        name: request.input('name'),
        short: request.input('short'),
        color: request.input('color').substring(1),
        ownerId: auth.user?.id,
      });

      session.flash({ messages: [`Předmět ${request.input('name').toLowerCase()} vytvořen.`] });
    } catch {
      session.flash({ errors: ['Při vytváření předmětu došlo k chybě.'] });
    }

    return await response.redirect().back();
  }

  public async edit({ bouncer, inertia, request }: HttpContextContract) {
    const subject = await Subject.findOrFail(request.param('id'));
    await bouncer.with('SubjectPolicy').authorize('update', subject);

    return await inertia.render('Subjects/Index', { subject: subject });
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
      session.flash({ errors: ['Při úpravě předmětu došlo k chybě.'] });
      return await response.redirect().back();
    }

    session.flash({ messages: [`Předmět ${subject.name.toLowerCase()} upraven.`] });
    return await response.redirect().toRoute('dashboard');
  }

  public async destroy({ bouncer, request, response, session }: HttpContextContract) {
    const subject = await Subject.findOrFail(request.param('id'));
    await bouncer.with('SubjectPolicy').authorize('delete', subject);

    await subject.delete();

    session.flash({ messages: [`Předmět ${subject.name.toLowerCase()} odstraněn.`] });
    return await response.redirect().back();
  }
}
