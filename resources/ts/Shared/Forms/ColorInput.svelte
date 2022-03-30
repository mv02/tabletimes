<script>
  export let name;
  export let value;
  export let size = 25;
  export let label;
  export let iconName = 'ColorSwatch';
  const icon = require(`../Icons/${iconName}Icon.svelte`).default;
</script>

<div class="flex flex-col flex-grow gap-2">
  {#if label}
     <label for={name} class="text-sm font-semibold uppercase">{label}</label>
  {/if}
    <div
      class="flex items-center flex-grow text-gray-400 bg-gray-200 rounded-md focus-within:text-black ring-purple-800 focus-within:ring-4"
    >
    <svelte:component this={icon} className="w-5 h-5 m-2"/>
    <input
      type="color"
      {name}
      bind:value
      {size}
      {...$$restProps}
      class="flex-grow px-2 text-black bg-transparent focus:outline-none"
    >
  </div>
</div>
