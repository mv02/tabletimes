<script>
  export let name;
  export let checked;
  export let label;
</script>

<div class="flex items-center flex-grow gap-2">
  <input type="checkbox" {name} id={name} bind:checked {...$$restProps}>
  {#if label}
     <label for={name} class="text-sm">{label}</label>
  {/if}
</div>
