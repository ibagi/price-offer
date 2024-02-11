<script lang="ts">
  import NavBar from '../components/NavBar.svelte';

  const slots = $$props.$$slots;
</script>

<main class="flex flex-col w-screen h-screen overflow-hidden">
  <NavBar />
  <div class="flex w-full h-full bg-gray-200 p-8">
    <div class="flex w-full gap-6">
      <!-- Left side -->
      {#if slots.left}
        <div class="bg-white rounded shadow-xl p-4">
          <slot name="left" />
        </div>
      {/if}

      <!-- Right side -->
      <div class="w-full flex flex-col overflow-x-hidden bg-white rounded shadow-xl p-4">
        <div class="flex-1">
          <slot name="right" />
        </div>

        <div class="justify-end shrink-0">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</main>
