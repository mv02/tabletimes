<script>
  import { page, useForm } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import Layout from '../../Shared/Layout.svelte';
  import FlashMessages from '../../Shared/FlashMessages.svelte';
  import TextInput from '../../Shared/Forms/TextInput.svelte';
  import RadioInput from '../../Shared/Forms/RadioInput.svelte';
  import DateInput from '../../Shared/Forms/DateInput.svelte';
  export let today;
  export let endOfYear;

  const form = useForm({
    name: '',
    isPublic: false,
    validFrom: today,
    validTo: endOfYear,
  });

  function submit() {
    $form.post(stardust.route('timetables.store'));
  }
</script>

<Layout class="flex flex-col sm:items-center sm:justify-center">
  <section>
    <form on:submit|preventDefault={submit}>
      <h1>Nový rozvrh</h1>

      <FlashMessages messages={$page.props.messages}/>

      <hr>

      <div class="flex flex-col gap-5 sm:flex-row">
        <div class="flex flex-col flex-grow gap-5">
          <TextInput
            label="Název"
            name="name"
            bind:value={$form.name}
            placeholder="Třída 3.B"
            maxlength="50"
            required
            autocomplete="off"
          />
          <RadioInput
            label="Viditelnost"
            name="is-public"
            bind:checked={$form.isPublic}
            labels={['Soukromý', 'Veřejný']}
            ids={['private', 'public']}
            values={[false, true]}
            iconNames={['LockClosed', 'Eye']}
          />
        </div>

        <div class="flex flex-col flex-grow gap-5">
          <DateInput label="Platný od" name="valid-from" bind:value={$form.validFrom} required/>
          <DateInput label="Platný do" name="valid-to" bind:value={$form.validTo} required/>
        </div>
      </div>

      <hr>

      <div class="flex justify-center">
        <input type="submit" value="Uložit" class="btn-blue">
      </div>
    </form>
  </section>
</Layout>
