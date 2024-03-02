<script lang="ts">
  import { onMount } from 'svelte';
  import { user, signIn, loadSession } from '../lib/auth';

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

  $: checkSession($user);
</script>

{#if $user}
  <slot />
{:else}
  <div class="w-screen h-screen bg-gray-200"></div>
{/if}
