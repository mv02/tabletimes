<script>
  import Lesson from './Lesson.svelte';
  export let lessons;
  export let selectedLesson;
</script>

<div class="flex flex-col gap-1">
  {#each lessons as lesson}
    <Lesson {lesson} bind:selectedLesson/>
  {/each}
</div>
