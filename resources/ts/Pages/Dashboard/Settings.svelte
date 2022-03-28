<script>
  import { page, useForm } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import RadioInput from '../../Shared/Forms/RadioInput.svelte';
  import TextInput from '../../Shared/Forms/TextInput.svelte';
  import UserCircleIcon from '../../Shared/Icons/UserCircleIcon.svelte';
  import MailIcon from '../../Shared/Icons/MailIcon.svelte';
  import PencilIcon from '../../Shared/Icons/PencilIcon.svelte';
  import CheckCircleIcon from '../../Shared/Icons/CheckCircleIcon.svelte';
  export let settings;
  let editing = false;

  const form = useForm({
    firstName: $page.props.user.first_name,
    lastName: $page.props.user.last_name,
  });

  function submit() {
    if ($form.isDirty) $form.post(stardust.route('settings'));
    editing = false;
  }
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

  <hr>

  <div class="flex items-center justify-between text-gray-600">
    <p class="flex items-center gap-2">
      <UserCircleIcon className="w-5 h-5"/>
      <span>{$page.props.user.fullName ?? '-'}</span>
    </p>

    {#if !editing}
      <button
        on:click={() => editing = true}
        class="hover:text-purple-600"
      >
        <PencilIcon className="w-5 h-5"/>
      </button>
    {:else}
      <button
        form="settings-form"
        class="hover:text-green-500"
      >
        <CheckCircleIcon className="w-5 h-5"/>
      </button>
    {/if}
  </div>

  {#if editing}
    <form on:submit|preventDefault={submit} id="settings-form">
      <TextInput
        label="Jméno"
        bind:value={$form.firstName}
        placeholder="Josef"
        maxlength="50"
        autocomplete="off"
        iconName="UserCircle"
      />

      <TextInput
        label="Příjmení"
        bind:value={$form.lastName}
        placeholder="Novák"
        maxlength="50"
        autocomplete="off"
        iconName="UserCircle"
      />
    </form>
  {/if}
</section>
