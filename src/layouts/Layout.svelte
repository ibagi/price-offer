<script lang="ts">
  import NavBar from '../components/NavBar.svelte';

  const slots = $$props.$$slots;
</script>

<main class="flex flex-col w-screen h-screen bg-base-100">
  <NavBar />
  <div class="flex flex-1 p-4 w-full">
    <!-- Left side -->
    {#if slots.left}
      <slot name="left" />
      <div class="divider divider-horizontal"></div>
    {/if}

    <!-- Right side -->
    <div class="w-full flex flex-col flex-1">
      <slot name="right" />
      <div class="justify-end">
        <slot name="actions" />
      </div>
    </div>
  </div>
</main>
