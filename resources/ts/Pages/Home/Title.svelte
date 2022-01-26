<script>
  import CalendarOutlineIcon from "../../Shared/Icons/CalendarOutlineIcon.svelte";
  export let count;
</script>

<section class="flex flex-col gap-10 bg-transparent">
  <div class="flex flex-col items-center gap-2">
    <CalendarOutlineIcon className="w-12 h-12 text-gray-300"/>
    <h1 class="text-5xl text-white">Tabletimes</h1>
  </div>

  <div class="flex flex-row justify-between gap-5">
    <h2 class="text-2xl font-light text-center text-gray-300"><span class="text-4xl font-semibold">{count?.users || 0}</span><br> uživatelů</h2>
    <h2 class="text-2xl font-light text-center text-gray-300"><span class="text-4xl font-semibold">{count?.timetables || 0}</span><br> rozvrhů</h2>
  </div>

  <p class="text-xl font-semibold text-center text-white">Přidej se i ty!</p>
</section>
