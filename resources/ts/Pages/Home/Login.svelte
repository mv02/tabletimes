<script>
  import { page, useForm } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import FlashMessages from '../../Shared/FlashMessages.svelte';
  import TextInput from '../../Shared/Forms/TextInput.svelte';

  const form = useForm({
    email: '',
    password: '',
  });

  function submit() {
    $form.post(stardust.route('login'));
  }
</script>

<section>
  <form on:submit|preventDefault={submit}>
    <h1>Vstup</h1>
  
    <FlashMessages messages={$page.props.messages}/>
  
    <TextInput type="email" name="email" bind:value={$form.email} placeholder="E-mail" required iconName="Mail"/>
    <TextInput type="password" name="password" bind:value={$form.password} placeholder="Heslo" required iconName="Key"/>
  
    <div class="flex justify-center">
      <input type="submit" value="Přihlásit se" class="w-1/2 btn-blue">
    </div>
  </form>
</section>
