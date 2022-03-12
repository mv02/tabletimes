import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import LoginValidator from 'App/Validators/LoginValidator';
import RegisterValidator from 'App/Validators/RegisterValidator';
import User from 'App/Models/User';

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

  public async register(ctx: HttpContextContract) {
    await ctx.request.validate(RegisterValidator);
    await this.loginOrCreateUser(ctx, {
      email: ctx.request.input('email'),
      password: ctx.request.input('password'),
    });
    return ctx.response.redirect().toRoute('dashboard');
  }

  private async loginOrCreateUser(
    { auth }: HttpContextContract,
    userData: { email: string; password?: string; firstName?: string; lastName?: string }
  ) {
    try {
      await auth.attempt(userData.email, userData.password ?? '');
    } catch {
      const user = await User.create(userData);
      await auth.login(user);
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();
    return response.redirect('/');
  }
}
