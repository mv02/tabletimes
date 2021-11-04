<script>
  import CheckCircleIcon from "./Icons/CheckCircleIcon.svelte";
  import ExclamationIcon from "./Icons/ExclamationIcon.svelte";
  export let messages;
</script>

{#each messages as message}
  <p class="flex items-center gap-2 font-semibold {message.success ? 'text-green-500' : 'text-red-500'}">
    {#if message.success}
      <CheckCircleIcon className="w-5 h-5"/>
    {:else}
      <ExclamationIcon className="w-5 h-5"/>
    {/if}
    <span>{message.text}</span>
  </p>
{/each}
