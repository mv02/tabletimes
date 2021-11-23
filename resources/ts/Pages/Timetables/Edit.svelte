<script>
  import Layout from '../../Shared/Layout.svelte';
  import TimetableHeader from './TimetableHeader.svelte';
  import TimetableEditor from './TimetableEditor.svelte';
  import TimetableGrid from './TimetableGrid.svelte';
  import SubjectsDeck from './SubjectsDeck.svelte';
  import ExclamationIcon from '../../Shared/Icons/ExclamationIcon.svelte';
  export let timetable;
  export let subjects;
  let minPeriod, maxPeriod;
  let editPanelOpen;
</script>

<Layout>
  <div class="container flex flex-col flex-grow gap-5 mx-auto md:p-4 md:pt-0">
    <div class="flex flex-col md:rounded-md">
      <div class="flex flex-col items-center justify-between gap-3 p-4 bg-white md:flex-row md:rounded-t-md">
        <TimetableHeader {timetable} {minPeriod} {maxPeriod} bind:editPanelOpen/>
      </div>

      <hr class={editPanelOpen ? null : 'hidden'}>
      <div class="p-4 bg-white {editPanelOpen ? '' : 'hidden'}">
        <TimetableEditor {timetable}/>
      </div>

      <div class="overflow-x-auto bg-white bg-opacity-40">
        <TimetableGrid {timetable} bind:minPeriod bind:maxPeriod/>
      </div>

      <div class="relative p-4 bg-white md:rounded-b-md">
        <SubjectsDeck {subjects}/>
      </div>
    </div>
  </div>
</Layout>
