<script>
  import { Inertia } from '@inertiajs/inertia';
  import { stardust } from '@eidellev/adonis-stardust';
  import { draggedItem } from './stores';
  import Lesson from './Lesson.svelte';
  export let day;
  export let period;
  export let lessons;
  export let timetable;
  export let selectedLesson;
  let preview;

  function handleDragEnter(e) {
    preview = $draggedItem;
  }

  function handleDragOver(e) {
    e.dataTransfer.dropEffect = 'copy';
  }

  function handleDragLeave(e) {
    preview = null;
  }

  function handleDrop(e) {
    Inertia.post(stardust.route('lessons.store'), {
      day: this.dataset.day,
      period: this.dataset.period,
      subjectId: preview.subject.id,
      timetableId: timetable.id,
    }, {
      onFinish: () => preview = null,
      preserveScroll: true,
    });
  }
</script>

<div
  on:dragenter={handleDragEnter}
  on:dragover|preventDefault={handleDragOver}
  on:dragleave={handleDragLeave}
  on:drop={handleDrop}
  class="flex flex-col gap-1"
  data-day={day}
  data-period={period}
>
  {#each lessons as lesson}
    <Lesson {lesson} bind:selectedLesson className={$draggedItem ? 'pointer-events-none' : ''}/>
  {/each}
  {#if preview}
    <Lesson lesson={preview} className="opacity-50 pointer-events-none"/>
  {/if}
</div>
