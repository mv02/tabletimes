<script>
  import { fade } from 'svelte/transition';
  export let timetable;
  export let selectedLesson;
</script>

<div class="flex flex-wrap items-center justify-center gap-3">
  {#if selectedLesson}
    <span out:fade class="p-2 rounded-full" style="background-color: #{selectedLesson?.subject.color}"></span>
    <h2 out:fade class="text-lg font-semibold min-w-max">{selectedLesson?.subject.name}</h2>
    <p out:fade class="text-gray-600 min-w-max">{selectedLesson?.dayName.toLowerCase()}, {selectedLesson?.period}. hodina</p>
  {/if}
</div>

<div>
  <p class="text-lg">{timetable.lessons.length} hodin</p>
</div>
