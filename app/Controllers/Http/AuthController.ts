import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import LoginValidator from 'App/Validators/LoginValidator';

export default class AuthController {
  public async login({ auth, request, response, session }: HttpContextContract) {
    await request.validate(LoginValidator);
    try {
      await auth.attempt(request.input('email'), request.input('password'));
      return response.redirect().toRoute('dashboard');
    } catch {
      session.flash({ errors: ['Nesprávné přihlašovací údaje.'] });
      return response.redirect().back();
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();
    return response.redirect('/');
  }
}
