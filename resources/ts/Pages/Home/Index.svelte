<script>
  import { fade } from 'svelte/transition';
  import { stardust } from '@eidellev/adonis-stardust';
  import Layout from '../../Shared/Layout.svelte';
  import Login from './Login.svelte';
  import Register from './Register.svelte';
</script>

<Layout class="flex flex-col items-center justify-around gap-5 xl:flex-row">

  <a href="/">
    <section class="items-center bg-transparent">
      <img src="/images/logo.svg" alt="Timetables logo" class="h-40 xl:h-60">
      <p class="text-2xl text-white">Rozvrh hodin pro každého.</p>
    </section>
  </a>

  {#if stardust.isCurrent('login')}
    <Login/>
  {:else if stardust.isCurrent('register')}
    <Register/>
  {:else}
    <section class="items-start bg-transparent">
      <p class="text-xl text-white">1) Přidej předměty.</p>
      <img transition:fade={{ duration: 1500 }} src="/images/preview1.png" alt="Seznam předmětů" class="xl:h-12 xl:w-auto rounded-md">
      <p class="text-xl text-white">2) Sestav rozvrh.</p>
      <img transition:fade={{ duration: 1500 }} src="/images/preview2.png" alt="Ukázka rozvrhu" class="xl:h-12 xl:w-auto rounded-md">
      <p class="text-xl text-white">3) Sdílej s ostatními.</p>

      <hr class="w-full">

      <div class="flex justify-center w-full gap-3">
        <a href={stardust.route('login')} class="btn-gray">Přihlásit se</a>
        <a href={stardust.route('register')} class="btn-gray">Zaregistrovat se</a>
      </div>
    </section>
  {/if}
</Layout>
