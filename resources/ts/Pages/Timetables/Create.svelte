<script>
  import { page, useForm } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import Layout from '../../Shared/Layout.svelte';
  import FlashMessages from '../../Shared/FlashMessages.svelte';
  import TextInput from '../../Shared/Forms/TextInput.svelte';
  import BooleanInput from '../../Shared/Forms/BooleanInput.svelte';
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

<Layout class="flex items-center justify-center">
  <section>
    <form on:submit|preventDefault={submit}>
      <h1>Nový rozvrh</h1>

      <FlashMessages messages={$page.props.messages}/>

      <hr>

      <div class="flex flex-col gap-5 sm:flex-row">
        <div class="flex flex-col flex-grow gap-5">
          <TextInput label="Název" name="name" bind:value={$form.name} placeholder="Třída 3.B" maxlength="50" required autocomplete="off"/>
          <BooleanInput label="Viditelnost" name="is-public" bind:checked={$form.isPublic} ids={['private', 'public']} options={['Soukromý', 'Veřejný']} iconNames={['LockClosed', 'Eye']}/>
        </div>

        <div class="flex flex-col flex-grow gap-5">
          <DateInput label="Platný od" name="valid-from" bind:value={$form.validFrom} required/>
          <DateInput label="Platný do" name="valid-to" bind:value={$form.validTo} required/>
        </div>
      </div>

      <hr>

      <div class="flex justify-center">
        <input type="submit" value="Uložit" class="w-1/2 p-2 font-semibold text-white bg-blue-600 cursor-pointer rounded-md sm:w-1/4 hover:bg-purple-800">
      </div>
    </form>
  </section>
</Layout>
