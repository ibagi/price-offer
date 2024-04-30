<script lang="ts">
  import NavBar from '../components/NavBar.svelte';
</script>

<main class="flex flex-col w-screen h-screen">
  <NavBar />
  <div class="flex w-full h-full bg-gray-200 p-8 overflow-hidden">
    <div class="flex w-full gap-6">
      <div class="w-full h-full flex flex-col bg-white rounded shadow-xl p-4">
        <div class="overflow-y-auto overflow-x-hidden flex-1">
          <slot />
        </div>

        <div class="justify-end shrink-0">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</main>
