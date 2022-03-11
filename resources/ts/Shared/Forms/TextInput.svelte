<script>
  export let name;
  export let value;
  export let size = 25;
  export let label;
  export let iconName = 'ArrowNarrowRight';
  const icon = require(`../Icons/${iconName}Icon.svelte`).default;
  export let error;
</script>

<div class="flex flex-col flex-grow gap-2">
  {#if label}
     <label for={name} class="text-sm font-semibold uppercase">{label}</label>
  {/if}
  <div class="flex items-center text-gray-400 bg-gray-200 rounded-md {error ? 'ring-2 ring-red-500' : ''} focus-within:text-black focus-within:ring-purple-800 focus-within:ring-4">
    <svelte:component this={icon} className="w-5 h-5 ml-2 mr-1"/>
    <input on:keyup {name} bind:value {size} {...$$restProps} class="flex-grow py-2 pl-1 pr-2 text-black bg-transparent focus:outline-none">
  </div>
  {#if error}
    <p class="text-sm text-red-500">{@html error}</p>
  {/if}
</div>
