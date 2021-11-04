<script>
  export let name;
  export let value;
  export let label;
</script>

<div class="flex flex-col flex-grow gap-2">
  {#if label}
     <label for={name} class="text-sm font-semibold uppercase">{label}</label>
  {/if}
  <div class="flex items-center text-gray-400 bg-gray-200 rounded-md focus-within:text-black ring-purple-800 focus-within:ring-4">
    <input type="date" {name} bind:value {...$$restProps} class="flex-grow p-2 text-black bg-transparent focus:outline-none">
  </div>
</div>

<style>
  ::-webkit-datetime-edit-fields-wrapper { padding: 0; }
</style>
