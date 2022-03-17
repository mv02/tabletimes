<script>
  import { Inertia } from '@inertiajs/inertia';
  import { stardust } from '@eidellev/adonis-stardust';
  import TrashIcon from '../../Shared/Icons/TrashIcon.svelte';
  export let timetable;
  export let user;

  function unshare() {
    Inertia.delete(stardust.route('timetables.unshare', { id: timetable.id }), {
      onBefore: () => confirm('Opravdu?'),
      data: { userId: user.id }
    });
  }
</script>

<li class="flex flex-wrap items-center justify-end p-1 text-gray-600 bg-gray-200 group gap-2 rounded-md">
  <div class="flex-grow">
    {#if user.fullName}
      <p class="text-black">{user.fullName}</p>
    {/if}
    <p class="text-sm">{user.email}</p>
  </div>

  <button
    on:click={unshare}
    class="lg:opacity-0 hover:text-red-500 lg:group-hover:opacity-100"
    title="Odebrat uživatele"
  >
    <TrashIcon className="w-5 h-5"/>
  </button>
</li>
