<script lang="ts">
  import { LoaderIcon } from "lucide-svelte";

  export let onSave: () => Promise<void>;
  let pending = false;

  async function handleSave() {
    pending = true;
    try {
      await onSave();
    } catch (err) {
    } finally {
      pending = false;
    }
  }
</script>

<button {...$$props} disabled={pending} on:click={handleSave}>
  {#if pending}
    <LoaderIcon />
  {:else}
    <slot />
  {/if}
</button>
