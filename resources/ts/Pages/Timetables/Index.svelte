<script>
  import Layout from '../../Shared/Layout.svelte';
  import TimetableHeader from './TimetableHeader.svelte';
  import TimetableGrid from './TimetableGrid.svelte';
  import TimetableFooter from './TimetableFooter.svelte';
  import ExclamationIcon from '../../Shared/Icons/ExclamationIcon.svelte';
  export let timetable;
  let selectedLesson;
</script>

<Layout>
  <div class="container flex flex-col flex-grow gap-5 mx-auto md:p-4 md:pt-0">
    <div class="flex flex-col md:rounded-md">
      <div class="flex flex-col items-center justify-between gap-3 p-4 bg-white md:flex-row md:rounded-t-md">
        <TimetableHeader {timetable}/>
      </div>

      {#if timetable.lessons.length > 0}
        <div class="overflow-x-auto bg-white bg-opacity-40">
          <TimetableGrid {timetable} bind:selectedLesson/>
        </div>

        <div class="flex flex-col items-center justify-between gap-3 p-4 bg-white md:flex-row md:rounded-b-md">
          <TimetableFooter {timetable} {selectedLesson}/>
        </div>
      {:else}
        <div class="flex justify-center p-4">
          <p class="flex flex-col items-center gap-2 text-lg text-center text-white md:flex-row">
            <ExclamationIcon className="w-6 h-6"/>
            <span>Rozvrh neobsahuje žádné hodiny.</span>
          </p>
        </div>
      {/if}
    </div>
  </div>
</Layout>
