<script>
  import { Inertia } from '@inertiajs/inertia';
  import { useForm } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import TextInput from '../../Shared/Forms/TextInput.svelte';
  import DateInput from '../../Shared/Forms/DateInput.svelte';
  import CheckCircleIcon from '../../Shared/Icons/CheckCircleIcon.svelte';
  export let timetable;

  const form = useForm({
    name: timetable.name,
    validFrom: timetable.valid_from,
    validTo: timetable.valid_to,
  });

  function submit() {
    const redirect = () => Inertia.visit(stardust.route('timetables.show', { id: timetable.id }));

    if (!$form.isDirty) return redirect();

    $form.patch(stardust.route('timetables.update', { id: timetable.id }), {
      onFinish: redirect,
    });
  }
</script>

<form on:submit|preventDefault={submit} id="edit-form" class="flex flex-col justify-center gap-5 md:flex-row">
  <div>
    <TextInput label="Název" name="name" bind:value={$form.name} placeholder="Třída 3.B" maxlength="50" required autocomplete="off"/>
  </div>
  <div class="flex flex-col gap-5 sm:flex-row">
    <DateInput label="Platný od" name="valid-from" bind:value={$form.validFrom} required/>
    <DateInput label="Platný do" name="valid-to" bind:value={$form.validTo} required/>
  </div>
</form>
