<script>
  import { inertia } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import CalendarIcon from '../../Shared/Icons/CalendarIcon.svelte';
  import ClockIcon from '../../Shared/Icons/ClockIcon.svelte';
  import PencilIcon from '../../Shared/Icons/PencilIcon.svelte';
  export let timetable;
</script>

<li class="relative flex flex-col w-full bg-white rounded-md cursor-pointer group md:w-auto">
  <a use:inertia href={stardust.route('timetables.show', { id: timetable.id })} class="absolute w-full h-full"></a>
  <h2 class="p-2 text-lg font-semibold uppercase">{timetable.name}</h2>

  <div class="flex justify-between gap-4 p-2 text-gray-600 bg-gray-200 md:text-gray-400 rounded-b-md md:group-hover:text-gray-600">
    <div class="flex gap-4">
      <p class="flex items-center gap-1">
        <ClockIcon className="w-5 h-5"/>
        <span>{timetable.lessons.length}</span>
      </p>
      <p class="flex items-center gap-1">
        <CalendarIcon className="w-5 h-5"/>
        <span>{new Date(timetable.valid_to).toLocaleDateString('cs-CZ')}</span>
      </p>
    </div>

    <a use:inertia href={stardust.route('timetables.edit', { id: timetable.id })} class="z-10 flex items-center md:opacity-0 hover:text-purple-800 md:group-hover:opacity-100">
      <PencilIcon className="w-5 h-5"/>
    </a>
  </div>
</li>
