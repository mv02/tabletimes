<script>
  import { getDarkerColor, getTextColor } from '../../utils';
  export let timetable;
  export let selectedLesson;

  const table = [];
  for (let i = 0; i < 5; i++) table.push([]);

  let minPeriod, maxPeriod;
  for (const lesson of timetable.lessons) {
    if (lesson.period < minPeriod || minPeriod == undefined) minPeriod = lesson.period;
    if (lesson.period > maxPeriod || maxPeriod == undefined) maxPeriod = lesson.period;

    let day = table[lesson.day - 1];

    if (day[lesson.period] == undefined) day[lesson.period] = [];
    day[lesson.period].push(lesson);
  }

  for (const day of table) {
    for (let i = minPeriod; i <= maxPeriod; i++) {
      if (day[i] == undefined) day[i] = [];
    }
  }
</script>

<div
  on:mouseleave={() => selectedLesson = null}
  class="grid gap-1 p-2 gap-y-2 md:gap-y-3 min-w-max"
  style="grid-template-columns: repeat({maxPeriod - minPeriod + 1}, minmax(0, 1fr))"
>
  {#each table as day}
    {#each day.slice(minPeriod) as period}
      <div class="flex flex-col gap-1">
        {#each period as lesson}
          <div
            on:mouseenter={() => selectedLesson = lesson}
            class="flex items-center justify-center flex-grow px-1 border-4 rounded-lg md:p-1 lesson"
            style="background-color: #{lesson.subject.color}; border-color: {getDarkerColor(lesson.subject.color, 0.8)}"
          >
            <h3 class="font-mono text-xl font-semibold uppercase cursor-default" style="color: {getTextColor(lesson.subject.color)}">
              {lesson.subject.short}
            </h3>
          </div>
        {/each}
      </div>
    {/each}
  {/each}
</div>

<style>
  .lesson:hover {
    filter: brightness(80%);
  }
</style>
