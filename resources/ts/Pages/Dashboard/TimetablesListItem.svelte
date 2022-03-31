<script>
  import { Inertia } from '@inertiajs/inertia';
  import { inertia, page } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import CalendarIcon from '../../Shared/Icons/CalendarIcon.svelte';
  import ClockIcon from '../../Shared/Icons/ClockIcon.svelte';
  import PencilIcon from '../../Shared/Icons/PencilIcon.svelte';
  import ShareIcon from '../../Shared/Icons/ShareIcon.svelte';
  import TrashIcon from '../../Shared/Icons/TrashIcon.svelte';
  export let timetable;

  function deleteTimetable() {
    Inertia.delete(stardust.route('timetables.destroy', { id: timetable.id }), {
      onBefore: () => confirm(`Opravdu odstranit rozvrh "${timetable.name}"?`),
    });
  }
</script>

<li class="relative flex flex-col w-full bg-white cursor-pointer rounded-md group md:w-auto">
  <a use:inertia href={stardust.route('timetables.show', { id: timetable.id })} class="absolute w-full h-full"></a>

  <div class="flex flex-col p-2 gap-2">
    <h2 class="text-lg font-semibold uppercase">{timetable.name}</h2>

    {#if timetable.owner.id !== $page.props.user.id}
      <p class="flex items-center text-sm text-gray-600 gap-2">
        <ShareIcon className="w-4 h-4"/>
        <span>
          {timetable.owner.fullName ? `${timetable.owner.fullName} (${timetable.owner.email})` : timetable.owner.email}
        </span>
      </p>
    {/if}
  </div>

  <div 
    class="flex justify-between p-2 text-gray-600 bg-gray-200 gap-4 lg:text-gray-400 rounded-b-md lg:group-hover:text-gray-600"
  >
    <div class="flex gap-4">
      <p class="flex items-center gap-1">
        <ClockIcon className="w-5 h-5"/>
        <span>{timetable.lessons.length}</span>
      </p>
      <p class="flex items-center gap-1 {!timetable.isValid ? 'text-red-500' : ''}">
        <CalendarIcon className="w-5 h-5"/>
        <span>
          {#if !timetable.isValid && new Date(timetable.valid_from) > new Date()}
            od {new Date(timetable.valid_from).toLocaleDateString('cs-CZ')}
          {:else}
            {!timetable.isValid ? 'do ' : ''}{new Date(timetable.valid_to).toLocaleDateString('cs-CZ')}
          {/if}
        </span>
      </p>
    </div>

    {#if timetable.can.update}
      <div class="z-10 flex items-center gap-2 lg:opacity-0 lg:group-hover:opacity-100">
        <a
          use:inertia
          href={stardust.route('timetables.edit', { id: timetable.id })}
          class="hover:text-purple-600"
          title="Upravit rozvrh"
        >
          <PencilIcon className="w-5 h-5"/>
        </a>

        <button on:click={deleteTimetable} class="hover:text-red-500" title="Odstranit rozvrh">
          <TrashIcon className="w-5 h-5"/>
        </button>
      </div>
    {/if}
  </div>
</li>
