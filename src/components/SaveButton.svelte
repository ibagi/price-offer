<script lang="ts">
  import { LoaderIcon } from 'lucide-svelte';

  interface Props {
    onSave: () => Promise<void>;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { ...props }: Props = $props();
  let pending = $state(false);

  async function handleSave() {
    pending = true;
    try {
      await props.onSave();
    } catch (err) {
    } finally {
      pending = false;
    }
  }
</script>

<button {...props} disabled={pending} onclick={handleSave}>
  {#if pending}
    <LoaderIcon />
  {:else}
    {@render props.children?.()}
  {/if}
</button>
