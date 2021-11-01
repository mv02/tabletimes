import { createInertiaApp } from '@inertiajs/inertia-svelte';
import { initRoutes } from '@eidellev/adonis-stardust';

createInertiaApp({
  resolve: (name) => import(`./Pages/${name}.svelte`),
  setup({ el, App, props }) {
    new App({ target: el, props });
  },
});

initRoutes();
