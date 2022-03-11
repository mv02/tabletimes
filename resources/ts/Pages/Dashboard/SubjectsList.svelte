<script>
  import { inertia, page } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import FlashMessages from '../../Shared/FlashMessages.svelte';
  import SubjectsListItem from './SubjectsListItem.svelte';
  import PlusIcon from '../../Shared/Icons/PlusIcon.svelte';
  import PlusCircleIcon from '../../Shared/Icons/PlusCircleIcon.svelte';
  export let subjects;
</script>

<section class="max-h-full min-h-0 md:col-span-2 lg:order-first lg:col-span-1">
  <div class="flex items-center justify-between gap-2">
    <h1>Předměty</h1>

    <a
      use:inertia
      href={stardust.route('subjects.create')}
      class="text-gray-600 lg:text-gray-400 hover:text-purple-600"
      title="Nový předmět"
    >
      <PlusCircleIcon className="w-6 h-6"/>
    </a>
  </div>

  <ul class="flex flex-col overflow-y-auto md:px-1 gap-1">
    {#each subjects as subject}
      <SubjectsListItem {subject}/>
    {/each}

    {#if subjects.length > 0}
      <a
        use:inertia
        href={stardust.route('subjects.create')}
        class="flex justify-center p-2 bg-gray-200 rounded-md hover:bg-purple-600 hover:text-white"
        title="Nový předmět"
      >
        <PlusIcon className="w-6 h-6"/>
      </a>
    {/if}
  </ul>
</section>
