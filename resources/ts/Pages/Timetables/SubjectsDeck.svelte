<script>
  import { Inertia } from '@inertiajs/inertia';
  import { inertia, page } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import { fade } from 'svelte/transition';
  import { draggedItem } from './stores';
  import TrashIcon from '../../Shared/Icons/TrashIcon.svelte';
  export let subjects;

  function handleDragEnter(e) {
    this.classList.add('bg-red-800');
  }

  function handleDragOver(e) {
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDragLeave(e) {
    this.classList.remove('bg-red-800');
  }

  function handleDrop(e) {
    Inertia.delete(stardust.route('lessons.destroy', { id: $draggedItem.id }), {
      preserveScroll: true,
    });
  }
</script>

{#if $draggedItem && $draggedItem.id}
  <div
    transition:fade={{ duration: 200 }}
    on:dragenter={handleDragEnter}
    on:dragover|preventDefault={handleDragOver}
    on:dragleave={handleDragLeave}
    on:drop={handleDrop}
    class="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-600 bg-opacity-90 rounded-b-md"
  >
    <span class="p-2 text-gray-600 bg-gray-200 rounded-full shadow-md pointer-events-none">
      <TrashIcon className="w-8 h-8"/>
    </span>
  </div>
{/if}

<ul class="flex flex-col flex-wrap items-stretch gap-1 md:flex-row">
  {#each subjects as subject}
    <li
      draggable="true"
      on:dragstart={(e) => setTimeout(() => draggedItem.set({ subject: subject }), 20)}
      on:dragend={(e) => setTimeout(() => draggedItem.set(null), 20)}
      class="flex flex-grow font-semibold bg-gray-200 rounded-md hover:bg-gray-100"
    >
      <div class="p-2 rounded-l-md" style="background-color: #{subject.color}"></div>
      <div class="flex-grow p-2">
        <div>
          <span>{subject.name}</span>
          <span class="ml-1 text-sm text-gray-400">{subject.short}</span>
        </div>
        {#if $page.props.user.is_admin && subject.owner.id !== $page.props.user.id}
          <span class="text-xs font-normal text-gray-600">{subject.owner.email}</span>
        {/if}
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
