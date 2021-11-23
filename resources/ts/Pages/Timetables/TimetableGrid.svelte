<script>
  import { periodCount, periodZero } from './stores';
  import Period from './Period.svelte';
  export let timetable;
  export let selectedLesson;

  let table;
  export let minPeriod = timetable.minPeriod;
  export let maxPeriod = timetable.maxPeriod;
  periodZero.set(minPeriod === 0);
  periodCount.set(Math.max(maxPeriod, 6));

  $: {
    minPeriod = timetable.minPeriod;
    maxPeriod = timetable.maxPeriod;

    table = [];
    for (let i = 0; i < 5; i++) table.push([]);

    for (const lesson of timetable.lessons) {
      let day = table[lesson.day - 1];

      if (day[lesson.period] == undefined) day[lesson.period] = [];
      day[lesson.period].push(lesson);
    }

    for (const day of table) {
      for (let i = 0; i <= Math.max(maxPeriod, $periodCount); i++) {
        if (day[i] == undefined) day[i] = [];
      }
    }
  }
</script>

<div
  on:mouseleave={() => selectedLesson = null}
  class="grid px-0.5 min-w-max"
  style="grid-template-columns: repeat({Math.max(maxPeriod, $periodCount) + ($periodZero ? 1 : 0)}, minmax(0, 1fr))"
>
  {#each table as day, d}
    {#each day.slice($periodZero ? 0 : 1) as period, p}
      <Period day={d + 1} period={($periodZero ? 0 : 1) + p} lessons={period} {timetable} bind:selectedLesson/>
    {/each}
  {/each}
</div>
