<script>
  import Layout from '../../Shared/Layout.svelte';
  import SubjectsList from './SubjectsList.svelte';
  import TimetablesList from './TimetablesList.svelte';
  export let subjects;
  export let timetables;
</script>

<Layout>
  <div class="container grid items-start grid-cols-1 gap-6 mx-auto md:p-4 md:pt-0 md:grid-cols-3">
    <TimetablesList {timetables}/>
    <SubjectsList {subjects}/>
  </div>
</Layout>
