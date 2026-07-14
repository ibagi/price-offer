<script lang="ts">
  import { run } from 'svelte/legacy';

  import { onMount } from 'svelte';
  import { user, signIn, loadSession } from '../lib/auth';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  let initialized = false;

  onMount(async () => {
    await loadSession();
    initialized = true;

    if (!$user) {
      await signIn();
    }
  });

  async function checkSession(user: any) {
    if (initialized && !user) {
      await signIn();
    }
  }

  run(() => {
    checkSession($user);
  });
</script>

{#if $user}
  {@render children?.()}
{:else}
  <div class="w-screen h-screen bg-gray-200"></div>
{/if}
