<script>
  import { inertia, page } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import FlashMessages from '../../Shared/FlashMessages.svelte';
  import SubjectsListItem from './SubjectsListItem.svelte';
  import PlusIcon from '../../Shared/Icons/PlusIcon.svelte';
  export let subjects;
</script>

<section>
  <h1>Předměty</h1>

  <FlashMessages messages={$page.props.messages}/>

  <ul class="flex flex-col gap-1">
    {#each subjects as subject}
      <SubjectsListItem {subject}/>
    {/each}

    <a use:inertia href={stardust.route('subjects.create')}>
      <li class="flex justify-center p-2 font-semibold bg-gray-200 rounded-md cursor-pointer hover:bg-purple-800 hover:text-white">
        <PlusIcon className="w-6 h-6"/>
      </li>
    </a>
  </ul>
</section>
