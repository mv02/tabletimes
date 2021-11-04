<script>
  export let name;
  export let options;
  export let ids;
  export let checked;
  export let label;
  export let iconNames = ['CheckCircle', 'CheckCircle'];
  const icon1 = require(`../Icons/${iconNames[0]}Icon.svelte`).default;
  const icon2 = require(`../Icons/${iconNames[1]}Icon.svelte`).default;
</script>

<div class="flex flex-col flex-grow gap-2">
  {#if label}
     <label for={name} class="text-sm font-semibold uppercase">{label}</label>
  {/if}
  <div class="flex text-gray-400 bg-gray-200 rounded-md text-md">
    <input type="radio" {name} id={ids[0]} value={false} bind:group={checked} class="hidden">
    <label for={ids[0]} class="flex items-center justify-center flex-grow gap-2 py-2 cursor-pointer rounded-l-md">
      <svelte:component this={icon1} className="w-5 h-5"/>
      <span>{options[0]}</span>
    </label>

    <input type="radio" {name} id={ids[1]} value={true} bind:group={checked} class="hidden">
    <label for={ids[1]} class="flex items-center justify-center flex-grow gap-2 py-2 cursor-pointer rounded-r-md">      
      <svelte:component this={icon2} className="w-5 h-5"/>
      <span>{options[1]}</span>
    </label>
  </div>
</div>

<style>
  input[type=radio]:checked + label {
    @apply text-white bg-purple-800 font-semibold;
  }
</style>
