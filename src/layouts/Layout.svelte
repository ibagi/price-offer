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
        <div class="bg-white min-w-64 max-w-72 overflow-y-auto max-w-sm h-full rounded shadow-xl p-4 overflow-y-auto">
          <slot name="left" />
        </div>
      {/if}

      <!-- Right side -->
      <div class="w-full h-full flex flex-col bg-white rounded shadow-xl p-4 ">
        <div class="overflow-y-auto overflow-x-hidden flex-1">
          <slot name="right" />
        </div>

        <div class="justify-end shrink-0">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</main>