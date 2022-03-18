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

  public async register({ auth, request, response }: HttpContextContract) {
    await request.validate(RegisterValidator);
    const user = await User.create({
      email: request.input('email'),
      password: request.input('password'),
    });
    await auth.login(user);
    return response.redirect().toRoute('dashboard');
  }

  public async googleRedirect({ ally }: HttpContextContract) {
    return await ally.use('google').redirect();
  }

  public async googleCallback(ctx: HttpContextContract) {
    const googleUser = await ctx.ally.use('google').user();
    await this.loginOrCreateUser(ctx, {
      email: googleUser.email as string,
      firstName: googleUser.original.given_name,
      lastName: googleUser.original.family_name,
    });
    return ctx.response.redirect().toRoute('dashboard');
  }

  public async facebookRedirect({ ally }: HttpContextContract) {
    return await ally.use('facebook').redirect();
  }

  public async facebookCallback(ctx: HttpContextContract) {
    const facebookUser = await ctx.ally.use('facebook').user();
    await this.loginOrCreateUser(ctx, {
      email: facebookUser.email as string,
      firstName: facebookUser.original.first_name,
      lastName: facebookUser.original.last_name,
    });
    return ctx.response.redirect().toRoute('dashboard');
  }

  private async loginOrCreateUser(
    { auth }: HttpContextContract,
    userData: { email: string; password?: string; firstName?: string; lastName?: string }
  ) {
    if (userData.password) return await auth.attempt(userData.email, userData.password);

    let user: User;
    try {
      user = await User.findByOrFail('email', userData.email);
    } catch {
      user = await User.create(userData);
    }
    await auth.login(user);
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();
    return response.redirect('/');
  }
}
