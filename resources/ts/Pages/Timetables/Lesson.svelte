<script>
  import { stardust } from '@eidellev/adonis-stardust';
  import { getDarkerColor, getTextColor } from '../../utils';
  import { draggedItem } from './stores';
  export let lesson;
  export let className = '';
  export let selectedLesson;

  function handleDragStart(e) {
    this.classList.add('opacity-50');
    setTimeout(() => draggedItem.set(lesson), 20);
  }

  function handleDragEnd(e) {
    this.classList.remove('opacity-50');
    setTimeout(() => draggedItem.set(null), 20);
  }
</script>

<div
  draggable={stardust.isCurrent('timetables.edit')}
  on:dragstart={handleDragStart}
  on:dragend={handleDragEnd}
  on:mouseenter={() => selectedLesson = lesson}
  class="flex items-center justify-center flex-grow px-1 border-4 rounded-lg md:p-1 {className}"
  style="background-color: #{lesson.subject.color}; border-color: {getDarkerColor(lesson.subject.color, 0.8)}"
>
  <h3 class="font-mono text-xl font-semibold uppercase cursor-default" style="color: {getTextColor(lesson.subject.color)}">
    {lesson.subject.short}
  </h3>
</div>

<style>
  div[draggable=true], div[draggable=true] h3 {
    cursor: grab;
  }

  div:hover {
    filter: brightness(80%);
  }
</style>
