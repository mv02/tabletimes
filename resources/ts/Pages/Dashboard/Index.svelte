<script>
  import Layout from '../../Shared/Layout.svelte';
  import SubjectsList from './SubjectsList.svelte';
  import TimetablesList from './TimetablesList.svelte';
  export let subjects;
  export let timetables;
</script>

<Layout class="grid grid-cols-1 gap-6 md:grid-cols-3">
  <TimetablesList {timetables}/>
  <SubjectsList {subjects}/>
</Layout>
