<script>
  import { Inertia } from '@inertiajs/inertia';
  import { inertia, page } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import PencilIcon from '../../Shared/Icons/PencilIcon.svelte';
  import TrashIcon from '../../Shared/Icons/TrashIcon.svelte';
  export let subject;

  function deleteSubject() {
    Inertia.delete(stardust.route('subjects.destroy', { id: subject.id }), {
      onBefore: () => confirm(
        `Opravdu odstranit předmět ${subject.name.toLowerCase()}?\nVšechny jeho hodiny budou smazány.`
      ),
    });
  }
</script>

<li class="flex font-semibold bg-gray-200 rounded-md group">
  <div class="p-2 rounded-l-md" style="background-color: #{subject.color}"></div>
  <div class="flex-grow p-2">
    <span>{subject.name}</span>
    <span class="ml-1 text-sm text-gray-400">{subject.short}</span>
    {#if $page.props.user.is_admin && subject.owner.id !== $page.props.user.id}
      <a
        href="mailto:{subject.owner.email}"
        class="ml-1 text-xs font-normal text-gray-600 hover:text-blue-600"
      >
        {subject.owner.email}
      </a>
    {/if}
  </div>

  <div class="flex items-center p-2 text-gray-600 gap-2 lg:opacity-0 lg:group-hover:opacity-100">
    <a
      use:inertia
      href={stardust.route('subjects.edit', { id: subject.id })}
      class="hover:text-purple-600"
      title="Upravit předmět"
    >
      <PencilIcon className="w-5 h-5"/>
    </a>

    <button on:click={deleteSubject} class="hover:text-red-500" title="Odstranit předmět">
      <TrashIcon className="w-5 h-5"/>
    </button>
  </div>
</li>
