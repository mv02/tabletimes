<script>
  import { page, useForm } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import FlashMessages from '../../Shared/FlashMessages.svelte';
  import TextInput from '../../Shared/Forms/TextInput.svelte';
  import OAuthLogin from './OAuthLogin.svelte';

  const form = useForm({
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  function submit() {
    $form.post(stardust.route('register.callback'));
  }
</script>

<section>
  <form on:submit|preventDefault={submit}>
    <div class="flex items-start justify-between gap-5">
      <h1>Registrace</h1>
      <a
        href={stardust.route('login')}
        class="text-sm font-semibold text-gray-600 uppercase hover:text-blue-600"
      >
        Už mám účet
      </a>
    </div>

    <FlashMessages errors={$page.props.errors}/>

    <TextInput
      type="email"
      name="email"
      bind:value={$form.email}
      placeholder="E-mail"
      required
      iconName="Mail"
      error={$form.errors?.email}
    />

    <TextInput
      type="password"
      name="password"
      bind:value={$form.password}
      placeholder="Heslo"
      required
      iconName="Key"
      error={$form.errors?.password}
    />

    <TextInput
      type="password"
      name="password-confirmation"
      bind:value={$form.passwordConfirmation}
      placeholder="Heslo znovu"
      required
      iconName="Key"
      error={$form.errors?.passwordConfirmation}
    />

    <div class="flex justify-center">
      <input type="submit" value="Vytvořit účet" class="btn-blue">
    </div>

    <hr>

    <OAuthLogin/>
  </form>
</section>
