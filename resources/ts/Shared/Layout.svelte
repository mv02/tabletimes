<script>
  import { inertia } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import LogoutIcon from './Icons/LogoutIcon.svelte';
  import ArrowCircleLeftIcon from './Icons/ArrowCircleLeftIcon.svelte';
</script>

<div id="wrapper">
  <header class="container flex items-center justify-between w-full p-4 mx-auto text-white">
    {#if stardust.isCurrent('dashboard')}
      <h1>Přehled</h1>
    {:else}
      <a use:inertia href={stardust.route('dashboard')} class="flex items-center gap-2 group">
        <ArrowCircleLeftIcon className="w-8 h-8"/>
        <span>Zpět na přehled</span>
      </a>
    {/if}

    <a use:inertia href={stardust.route('logout')} class="px-4 btn-red">
      <LogoutIcon className="w-6 h-6"/>
    </a>
  </header>

  <main class="flex flex-col justify-center flex-grow md:justify-start">
    <slot/>
  </main>
</div>
