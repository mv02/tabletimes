<script>
  import { inertia } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import TimetablesListItem from './TimetablesListItem.svelte';
  import PlusIcon from '../../Shared/Icons/PlusIcon.svelte';
  export let timetables;
</script>

<section class="max-h-full min-h-0 py-0 bg-transparent md:px-0">
  <ul class="flex flex-col px-1 overflow-y-auto gap-4 md:justify-start">
    {#each timetables as timetable}
      <TimetablesListItem {timetable}/>
    {/each}

    {#if timetables.length === 0}
      <p class="font-semibold text-white">Nenalezeny žádné rozvrhy</p>
    {/if}

    <a use:inertia href={stardust.route('timetables.create')} class="flex justify-center p-2 bg-white rounded-md hover:text-white hover:bg-purple-600">
      <PlusIcon className="w-6 h-6"/>
    </a>
  </ul>
</section>
