<script>
  import { page, useForm } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import Layout from '../../Shared/Layout.svelte';
  import FlashMessages from '../../Shared/FlashMessages.svelte';
  import ShareItem from './ShareItem.svelte';
  import TextInput from '../../Shared/Forms/TextInput.svelte';
  import RadioInput from '../../Shared/Forms/RadioInput.svelte';
  import DuplicateIcon from '../../Shared/Icons/DuplicateIcon.svelte';
  export let timetable;
  export let url;

  const form1 = useForm({ isPublic: Boolean(timetable.is_public) });
  const form2 = useForm({ email: '' });

  function submit() {
    if ($form1.isDirty) $form1.patch(stardust.route('timetables.update', { id: timetable.id }));
    if ($form2.isDirty) $form2.post(stardust.route('timetables.share', { id: timetable.id }), {
      onSuccess: () => $form2.reset(),
    });
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(`${url}/${timetable.share_code}`);
  }
</script>

<Layout class="items-start flex-grow-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
  <section>
    <h1>Sdílení rozvrhu</h1>

    <FlashMessages errors={$page.props.errors} messages={$page.props.messages}/>

    <form on:submit|preventDefault={submit} class="flex flex-col gap-5">
      <RadioInput
        name="is-public"
        bind:checked={$form1.isPublic}
        labels={['Soukromý', 'Veřejný']}
        ids={['private', 'public']}
        values={[false, true]}
        iconNames={['LockClosed', 'Eye']}
      />

      <p class="text-sm">
        {#if $form1.isPublic}
          K rozvrhu má přístup kdokoli.
        {:else}
          Rozvrh můžete zobrazit pouze vy a vámi přidaní uživatelé.
        {/if}
      </p>

      <hr>

      <TextInput
        type="email"
        label="Přidat uživatele"
        name="email"
        bind:value={$form2.email}
        placeholder="E-mail"
        maxlength="50"
      />

      <div class="flex justify-center">
        <input type="submit" value="Uložit" class="btn-blue">
      </div>
    </form>

    <hr>

    <h1>Odkaz pro sdílení</h1>

    <p on:click={copyToClipboard} class="flex items-center text-lg text-gray-600 cursor-pointer gap-2 group">
      <span>{url}/{timetable.share_code}</span>
      <button class="lg:opacity-0 lg:group-hover:opacity-100">
        <DuplicateIcon className="w-5 h-5"/>
      </button>
    </p>
  </section>

  <section>
    <h1>Lidé s přístupem</h1>

    <ul class="grid grid-cols-1 xl:grid-cols-2 gap-1">
      {#each timetable.usersWithAccess as user}
        <ShareItem {timetable} {user}/>
      {:else}
        <p class="text-sm text-gray-600 col-span-2">Rozvrh ještě nebyl s nikým sdílen.</p>
      {/each}
    </ul>
  </section>
</Layout>
