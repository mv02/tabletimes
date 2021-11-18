import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Lesson from 'App/Models/Lesson';

export default class LessonsController {
  public async store({ request, response }: HttpContextContract) {
    await Lesson.create(request.all());
    return response.redirect().back();
  }

  public async update({ request, response }: HttpContextContract) {
    const lesson = await Lesson.findOrFail(request.param('id'));
    await lesson.merge(request.all()).save();
    return response.redirect().back();
  }

  public async destroy({ request, response }: HttpContextContract) {
    const lesson = await Lesson.findOrFail(request.param('id'));
    await lesson.delete();
    return response.redirect().back();
  }
}
