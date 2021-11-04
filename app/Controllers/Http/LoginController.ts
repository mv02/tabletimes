import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class LoginController {
  public async login({ auth, request, response, session }: HttpContextContract) {
    try {
      await auth.attempt(request.input('email'), request.input('password'));
      return response.redirect().toRoute('dashboard');
    } catch {
      session.flash({ messages: [{ success: false, text: 'Přihlášení se nezdařilo.' }] });
      return response.redirect().back();
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();
    return response.redirect('/');
  }
}
