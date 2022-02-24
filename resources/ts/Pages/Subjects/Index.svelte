<script>
  import { page, useForm } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import Layout from '../../Shared/Layout.svelte';
  import FlashMessages from '../../Shared/FlashMessages.svelte';
  import TextInput from '../../Shared/Forms/TextInput.svelte';
  import ColorInput from '../../Shared/Forms/ColorInput.svelte';
  export let subject;

  const form = useForm({
    name: subject?.name || '',
    short: subject?.short || '',
    color: '#' + (subject?.color || 'ffffff'),
  });

  function submit() {
    if (stardust.isCurrent('subjects.create')) $form.post(stardust.route('subjects.store'));
    else $form.patch(stardust.route('subjects.update', { id: subject.id }));
  }
</script>

<Layout class="flex items-center justify-center">
  <section>
    <form on:submit|preventDefault={submit}>
      <h1>{stardust.isCurrent('subjects.create') ? 'Nový předmět' : `Upravit ${subject.short}`}</h1>

      <FlashMessages messages={$page.props.messages}/>

      <hr>

      <TextInput label="Název" name="name" bind:value={$form.name} placeholder="Český jazyk a literatura" maxlength="30" required autocomplete="off"/>
      <div class="flex gap-5">
        <TextInput label="Zkratka" name="short" bind:value={$form.short} placeholder="čjl" size="5" maxlength="10" required autocomplete="off" iconName="Tag"/>
        <ColorInput label="Barva" name="color" bind:value={$form.color} required/>
      </div>

      <div class="flex justify-center">
        <input type="submit" value="Uložit" class="w-1/2 btn-blue">
      </div>
    </form>
  </section>
</Layout>
