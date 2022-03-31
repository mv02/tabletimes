/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.inertia('/', 'Home/Index');

Route.group(() => {
  Route.get('/', ({ inertia }) => inertia.render('Home/Index')).as('login');
  Route.post('/callback', 'AuthController.login').as('login.callback');
  Route.get('/google', 'AuthController.googleRedirect').as('google');
  Route.get('/google/callback', 'AuthController.googleCallback');
  Route.get('/facebook', 'AuthController.facebookRedirect').as('facebook');
  Route.get('/facebook/callback', 'AuthController.facebookCallback');
}).prefix('/login');

Route.get('/register', ({ inertia }) => inertia.render('Home/Index')).as('register');
Route.post('/register/callback', 'AuthController.register').as('register.callback');
Route.get('/logout', 'AuthController.logout').as('logout');

Route.group(() => {
  Route.get('/dashboard', 'DashboardController.index').as('dashboard');
  Route.post('/settings', 'DashboardController.saveSettings').as('settings');

  Route.resource('subjects', 'SubjectsController').except(['index', 'show']);
  Route.get('/timetables/:id/share', 'TimetablesController.shareForm').as('timetables.shareForm');
  Route.post('/timetables/:id/share', 'TimetablesController.share').as('timetables.share');
  Route.delete('/timetables/:id/unshare', 'TimetablesController.unshare').as('timetables.unshare');
  Route.resource('lessons', 'LessonsController').only(['store', 'update', 'destroy']);
}).middleware('auth');

Route.resource('timetables', 'TimetablesController')
  .except(['index'])
  .middleware({ create: 'auth', store: 'auth', edit: 'auth', update: 'auth', destroy: 'auth' });

Route.get(':code', 'TimetablesController.findByCode');
