<script>
  import { inertia } from '@inertiajs/inertia-svelte';
  import { stardust } from '@eidellev/adonis-stardust';
  import { periodCount, periodZero } from './stores';
  import RangeInput from '../../Shared/Forms/RangeInput.svelte';
  import Checkbox from '../../Shared/Forms/Checkbox.svelte';
  import CalendarIcon from '../../Shared/Icons/CalendarIcon.svelte';
  import CheckCircleIcon from '../../Shared/Icons/CheckCircleIcon.svelte';
  import ChevronDownIcon from '../../Shared/Icons/ChevronDownIcon.svelte';
  import ChevronUpIcon from '../../Shared/Icons/ChevronUpIcon.svelte';
  import PencilIcon from '../../Shared/Icons/PencilIcon.svelte';
  import ShareIcon from '../../Shared/Icons/ShareIcon.svelte';
  import UserCircleIcon from '../../Shared/Icons/UserCircleIcon.svelte';
  export let timetable;
  export let minPeriod;
  export let maxPeriod;
  export let editPanelOpen;
</script>

<div class="flex gap-3">
  <h1 class="mb-1 text-3xl font-normal text-center">{timetable.name}</h1>
  {#if stardust.isCurrent('timetables.edit')}
    <button on:click={() => editPanelOpen = !editPanelOpen} class="text-gray-600 hover:text-purple-600">
      {#if !editPanelOpen}
        <ChevronDownIcon className="w-8 h-8"/>
      {:else}
        <ChevronUpIcon className="w-8 h-8"/>
      {/if}
    </button>
  {/if}
</div>

{#if stardust.isCurrent('timetables.edit')}
  <div class="flex flex-col items-center gap-2 lg:items-end lg:gap-8 lg:flex-row">
    <RangeInput
      label="Počet hodin"
      name="period-count"
      bind:value={$periodCount}
      min={Math.max(maxPeriod, 6)}
      max="12"
      iconName="Clock"
    >
      <span class="font-semibold">{$periodCount}</span>
    </RangeInput>
    <Checkbox label="0. hodina" name="period-zero" bind:checked={$periodZero} disabled={minPeriod == 0}/>
  </div>
{:else}
  <div class="flex flex-col text-gray-600">
    <div class="flex items-center gap-2">
      <UserCircleIcon className="w-6 h-6" />
      <a href="mailto:{timetable.owner.email}">
        {timetable.owner.fullName ? timetable.owner.fullName : timetable.owner.email}
      </a>
    </div>
    <div class="flex items-center gap-2 {!timetable.isValid ? 'text-red-500 font-bold' : ''}">
      <CalendarIcon className="w-6 h-6" />
      <span>
        {new Date(timetable.valid_from).toLocaleDateString('cs-CZ')} -
        {new Date(timetable.valid_to).toLocaleDateString('cs-CZ')}
      </span>
    </div>
  </div>
{/if}

<div class="flex gap-3">
  {#if timetable.can.update || stardust.isCurrent('timetables.edit')}
    <a
      use:inertia
      href={stardust.route('timetables.shareForm', { id: timetable.id })}
      class="flex items-center px-4 gap-2 btn-gray"
    >
      <ShareIcon className="w-5 h-5"/>
      <span>Sdílet</span>
    </a>
  {/if}

  {#if stardust.isCurrent('timetables.edit')}
    <button form="edit-form" class="flex items-center px-4 gap-2 btn-green">
      <CheckCircleIcon className="w-5 h-5"/>
      <span>Uložit</span>
    </button>
  {:else if timetable.can.update}
    <a
      use:inertia
      href={stardust.route('timetables.edit', { id: timetable.id })}
      class="flex items-center px-4 gap-2 btn-blue"
    >
      <PencilIcon className="w-5 h-5"/>
      <span>Upravit</span>
    </a>
  {/if}
</div>
