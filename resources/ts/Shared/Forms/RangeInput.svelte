<script>
  export let name;
  export let value;
  export let min;
  export let max;
  export let label;
  export let iconName = 'ArrowNarrowRight';
  const icon = require(`../Icons/${iconName}Icon.svelte`).default;
</script>

<div class="flex flex-col flex-grow gap-1">
  <div class="flex items-center justify-between">
    {#if label}
       <label for={name} class="text-sm font-semibold uppercase">{label}</label>
    {/if}
    <slot/>
  </div>
  <div class="flex items-center text-gray-400 focus-within:text-black">
    <svelte:component this={icon} className="w-5 h-5 mx-2"/>
    <input type="range" {name} bind:value {min} {max} {...$$restProps} class="flex-grow">
  </div>
</div>
