<script>
  import axios from 'axios';
  import { Inertia } from '@inertiajs/inertia';
  import { stardust } from '@eidellev/adonis-stardust';
  import Layout from '../../Shared/Layout.svelte';
  import SubjectsList from './SubjectsList.svelte';
  import TimetablesList from './TimetablesList.svelte';
  import Filter from './Filter.svelte';
  import Settings from './Settings.svelte';
  export let subjects;
  export let timetables;
  let filter;
  export let settings;

  function saveSettings() {
    axios.post(stardust.route('settings'), { settings })
      .then(reload);
  }

  function reload() {
    if (filter === '') filter = undefined;
    Inertia.reload({
      only: ['timetables'],
      data: { filter },
    });
  }
</script>

<!-- Wrapper to prevent overflowing the lg+ viewport -->
<div class="flex flex-col lg:h-screen">
  <Layout class="items-start min-h-0 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <TimetablesList {timetables}/>
    <div class="flex flex-col gap-4">
      <Filter on:keyup={reload} on:change={saveSettings} bind:filter bind:settings/>
      <Settings on:change={saveSettings} bind:settings/>
    </div>
    <SubjectsList {subjects}/>
  </Layout>
</div>
