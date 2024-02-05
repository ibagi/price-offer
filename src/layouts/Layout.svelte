<script lang="ts">
  import NavBar from '../components/NavBar.svelte';

  const slots = $$props.$$slots;
</script>

<main class="flex flex-col w-screen h-screen overflow-hidden">
  <NavBar />
  <div class="flex w-full h-full bg-gray-200 p-6">
    <div class="flex w-full bg-white rounded shadow-xl p-4">
      <!-- Left side -->
      {#if slots.left}
        <slot name="left" />
        <div class="divider divider-horizontal"></div>
      {/if}

      <!-- Right side -->
      <div class="w-full  flex flex-col overflow-x-hidden">
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
