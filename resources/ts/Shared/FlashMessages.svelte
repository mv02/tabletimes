<script>
  import CheckCircleIcon from "./Icons/CheckCircleIcon.svelte";
  import ExclamationIcon from "./Icons/ExclamationIcon.svelte";
  export let errors = [];
  export let messages = [];
</script>

{#if errors.length > 0 || messages.length > 0}
  <div>
    {#each errors as error}
      <p class="flex items-center text-red-500 gap-2">
        <ExclamationIcon className="w-5 h-5"/>
        <span>{error}</span>
      </p>
    {/each}
    
    {#each messages as message}
      <p class="flex items-center text-green-500 gap-2">
        <CheckCircleIcon className="w-5 h-5"/>
        <span>{message}</span>
      </p>
    {/each}
  </div>
{/if}
