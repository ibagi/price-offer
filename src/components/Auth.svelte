<script lang="ts">
  import { onMount } from 'svelte';
  import { user, loadSession, signIn } from '../lib/auth';

  onMount(async () => {
    await loadSession();
    if (!$user) {
      await signIn();
    }
  });

  async function checkSession(user: any) {
    if (!user) {
      await signIn();
    }
  }

  $: checkSession($user);
</script>

{#if $user}
  <slot />
{/if}
