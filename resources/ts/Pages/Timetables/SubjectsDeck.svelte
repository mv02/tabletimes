<script>
  import { inertia } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import { draggedItem } from './stores';
  export let subjects;
</script>

<ul class="flex flex-col flex-wrap items-stretch gap-1 md:flex-row">
  {#each subjects as subject}
    <li
      draggable="true"
      on:dragstart={(e) => draggedItem.set({ subject: subject })}
      on:dragend={(e) => draggedItem.set(null)}
      class="flex flex-grow font-semibold bg-gray-200 rounded-md hover:bg-gray-100"
    >
      <div class="p-2 rounded-l-md" style="background-color: #{subject.color}"></div>
      <div class="flex-grow p-2">
        <span>{subject.name}</span>
        <span class="ml-1 text-sm text-gray-400">{subject.short}</span>
      </div>
    </li>
  {/each}
  <li class="flex items-end justify-end pt-3 text-sm font-semibold text-gray-600 uppercase">
    <a use:inertia href={stardust.route('dashboard')} class="hover:text-blue-600">Upravit předměty</a>
  </li>
</ul>

<style>
  li:not(:last-child) {
    cursor: grab;
  }

  li:last-child {
    flex-grow: 100;
  }
</style>
