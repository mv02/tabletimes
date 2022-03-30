<script>
  import { inertia, page, useForm } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import FlashMessages from '../../Shared/FlashMessages.svelte';
  import TextInput from '../../Shared/Forms/TextInput.svelte';
  import OAuthLogin from './OAuthLogin.svelte';

  const form = useForm({
    email: '',
    password: '',
  });

  function submit() {
    $form.post(stardust.route('login.callback'));
  }
</script>

<section>
  <form on:submit|preventDefault={submit}>
    <div class="flex items-start justify-between gap-5">
      <h1>Vstup</h1>
      <a
        href={stardust.route('register')}
        class="text-sm font-semibold text-gray-600 uppercase hover:text-blue-600"
      >
        Ještě nemám účet
      </a>
    </div>

    <hr>

    <FlashMessages errors={$page.props.errors}/>

    <TextInput
      type="email"
      name="email"
      bind:value={$form.email}
      placeholder="E-mail"
      required
      iconName="Mail"
      error={$form.errors?.email?.join('<br>')}
    />

    <TextInput
      type="password"
      name="password"
      bind:value={$form.password}
      placeholder="Heslo"
      required
      iconName="Key"
      error={$form.errors?.password?.join('<br>')}
    />

    <div class="flex justify-center">
      <input type="submit" value="Přihlásit se" class="btn-blue">
    </div>

    <hr>

    <OAuthLogin/>
  </form>
</section>
