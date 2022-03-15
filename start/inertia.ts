/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia from '@ioc:EidelLev/Inertia';

Inertia.share({
  errors: (ctx) => {
    return ctx.session.flashMessages.get('errors') ?? [];
  },
  messages: (ctx) => {
    return ctx.session.flashMessages.get('messages') ?? [];
  },
  user: (ctx) => {
    return ctx.auth?.user;
  },
}).version(() => Inertia.manifestFile('public/assets/manifest.json'));
