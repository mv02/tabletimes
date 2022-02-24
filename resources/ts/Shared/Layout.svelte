<script>
  import { inertia, page } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import LogoutIcon from './Icons/LogoutIcon.svelte';
  import ArrowCircleLeftIcon from './Icons/ArrowCircleLeftIcon.svelte';
</script>

{#if $page.props.user}
  <header>
    <div class="flex gap-2">
      <p>{$page.props.user.fullName ?? $page.props.user.email}</p>
      <a use:inertia href={stardust.route('logout')} title="Odhlásit se">
        <LogoutIcon className="w-6 h-6 hover:text-red-500"/>
      </a>
    </div>
    {#if !stardust.isCurrent('dashboard')}
      <a use:inertia href={stardust.route('dashboard')} title="Zpět">
        <ArrowCircleLeftIcon className="w-6 h-6 hover:text-blue-500"/>
      </a>
    {/if}
  </header>
{/if}
<main {...$$restProps}>
  <slot/>
</main>
