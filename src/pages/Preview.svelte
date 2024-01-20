<script lang="ts">
  import { t } from '../lib/i18n';
  let saving = false;

  function submit(e: SubmitEvent) {
    e.preventDefault();
    saving = true;

    window.requestAnimationFrame(() => {
      window.print();
      saving = false;
    });
  }
</script>

<main class="container mx-auto px-4 bg-white h-full w-full">
  <form on:submit={submit}>
    <h1 class="font-bold text-2xl">{$t('preview.title')}</h1>
    <button class="btn btn-primary" type="submit" class:no-print={saving}>
      Mentés
    </button>
  </form>
</main>

<style>
  .no-print {
    display: none !important;
  }
</style>
