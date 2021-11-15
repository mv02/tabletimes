<script>
  import Period from './Period.svelte';
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
      <Period lessons={period} bind:selectedLesson/>
    {/each}
  {/each}
</div>
