<script>
  import { inertia } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import PencilIcon from '../../Shared/Icons/PencilIcon.svelte';
  import TrashIcon from '../../Shared/Icons/TrashIcon.svelte';
  export let subject;
</script>

<li class="flex font-semibold bg-gray-200 rounded-md group">
  <div class="p-2 rounded-l-md" style="background-color: #{subject.color}"></div>
  <div class="flex-grow p-2">
    <span>{subject.name}</span>
    <span class="ml-1 text-sm text-gray-400">{subject.short}</span>
  </div>

  <div class="flex gap-2 p-2 md:opacity-0 md:group-hover:opacity-100">
    <a use:inertia href={stardust.route('subjects.edit', { id: subject.id })} class="flex">
      <button class="hover:text-purple-800">
        <PencilIcon className="w-5 h-5"/>
      </button>
    </a>
    <button class="hover:text-red-500">
      <TrashIcon className="w-5 h-5"/>
    </button>
  </div>
</li>
