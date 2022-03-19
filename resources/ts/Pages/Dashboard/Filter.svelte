<script>
  import { Inertia } from '@inertiajs/inertia';
  import { stardust } from '@eidellev/adonis-stardust';
  import TextInput from '../../Shared/Forms/TextInput.svelte';
  import Checkbox from '../../Shared/Forms/Checkbox.svelte';

  export let filter = '';
  export let settings;
</script>

<section on:change>
  <h1>Filtr</h1>

  <TextInput on:keyup bind:value={filter} placeholder="Lorem ipsum" maxlength="30" autocomplete="off"/>

  <div class="flex flex-col flex-wrap lg:flex-row gap-2">
    <Checkbox label="Neplatné rozvrhy" name="show-invalid" bind:checked={settings.showInvalid}/>
    <Checkbox label="Moje rozvrhy" name="show-owned" bind:checked={settings.showOwned}/>
    <Checkbox label="Cizí rozvrhy" name="show-shared" bind:checked={settings.showShared}/>
  </div>
</section>
