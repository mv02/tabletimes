<script>
  import { page } from '@inertiajs/inertia-svelte';
  import RadioInput from '../../Shared/Forms/RadioInput.svelte';
  import UserCircleIcon from '../../Shared/Icons/UserCircleIcon.svelte';
  import MailIcon from '../../Shared/Icons/MailIcon.svelte';
  export let settings;
</script>

<section>
  <h1>Nastavení</h1>

  <RadioInput
    on:change
    label="Řadit podle"
    name="sort-by"
    labels={['Název', 'Datum']}
    iconNames={['Tag', 'Calendar']}
    ids={['name', 'date']}
    values={['name', 'validTo']}
    bind:checked={settings.sortBy}
  />
</section>
