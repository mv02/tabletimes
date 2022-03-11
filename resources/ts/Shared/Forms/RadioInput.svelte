<script>
  export let name;
  export let labels = [];
  export let iconNames = new Array(labels.length).fill('CheckCircle');
  export let ids;
  export let values;
  export let checked;
  export let label;

  const options = [];
  for (let i = 0; i < Math.max(labels.length, iconNames.length); i++) {
    options.push({
      label: labels[i],
      id: ids[i],
      value: values[i],
      icon: require(`../Icons/${iconNames[i]}Icon.svelte`).default,
    });
  }
</script>

<div class="flex flex-col flex-grow gap-2">
  {#if label}
    <label for={name} class="text-sm font-semibold uppercase">{label}</label>
  {/if}
  <div on:change class="flex text-gray-400 bg-gray-200 rounded-md text-md">
    {#each options as option, i}
      <input type="radio" {name} id={option.id} value={option.value} bind:group={checked} class="hidden">
      <label for={option.id} class="flex items-center justify-center flex-grow py-2 cursor-pointer gap-2 {i === 0 ? 'rounded-l-md' : ''} {i === options.length - 1 ? 'rounded-r-md' : ''}">
        <svelte:component this={option.icon} className="w-5 h-5"/>
        <span>{option.label}</span>
      </label>
    {/each}
  </div>
</div>

<style>
  input[type=radio]:checked + label {
    @apply text-white bg-purple-800 font-semibold;
  }
</style>
