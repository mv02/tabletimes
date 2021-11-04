<script>
  import { inertia } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import TimetablesListItem from './TimetablesListItem.svelte';
  import PlusIcon from '../../Shared/Icons/PlusIcon.svelte';
  export let timetables;
</script>

<section class="px-4 md:px-0 md:col-span-2">
  <ul class="flex flex-wrap items-center justify-center gap-4 md:justify-start">
    {#each timetables as timetable}
      <TimetablesListItem {timetable}/>
    {/each}

    <li class="relative p-2 bg-white rounded-md hover:bg-blue-600 hover:text-white">
      <a use:inertia href={stardust.route('timetables.create')} class="absolute top-0 left-0 w-full h-full"></a>
      <PlusIcon className="w-8 h-8"/>
    </li>
  </ul>
</section>
