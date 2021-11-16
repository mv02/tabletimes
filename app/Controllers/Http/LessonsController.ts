import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Lesson from 'App/Models/Lesson';

export default class LessonsController {
  public async store({ request, response }: HttpContextContract) {
    await Lesson.create(request.all());
    return response.redirect().back();
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
