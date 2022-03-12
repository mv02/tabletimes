<script>
  import { stardust } from '@eidellev/adonis-stardust';
  import { getDarkerColor } from '../../utils';
</script>

<div class="flex flex-col gap-2">
  <p class="text-sm font-semibold text-gray-600 uppercase">Nebo</p>
  <div class="flex gap-3">
    <a
      href={stardust.route('google')}
      class="flex-grow text-center btn-gray"
      id="google-btn"
      style="--google-hover-color: {getDarkerColor('eb4132', 0.8)}"
    >
      Google
    </a>
    <a
      href={stardust.route('facebook')}
      class="flex-grow text-center btn-gray"
      id="facebook-btn"
      style="--facebook-hover-color: {getDarkerColor('4267b2', 0.8)}"
    >
      Facebook
    </a>
  </div>
</div>

<style>
  #google-btn {
    background-color: #eb4132;
  }
  #google-btn:hover {
    background-color: var(--google-hover-color);
  }
  #facebook-btn {
    background-color: #4267b2;
  }
  #facebook-btn:hover {
    background-color: var(--facebook-hover-color);
  }
</style>
