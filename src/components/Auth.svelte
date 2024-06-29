<script lang="ts">
  import { onMount } from 'svelte';
  import { user, signIn, loadSession, initializeUser } from '../lib/auth';

  type State = 'loading' | 'loaded' | 'initialized';
  let state: State = 'loading';

  onMount(async () => {
    await loadSession();
    state = 'loaded';

    if (!$user) {
      await signIn();
    }
  });

  async function checkSession(user: any) {
    if (state !== 'loading' && !user) {
      await signIn();
    } else {
      await initializeUser();
      state = 'initialized';
    }
  }

  $: checkSession($user);
</script>

{#if $user && state === 'initialized'}
  <slot />
{:else}
  <div class="w-screen h-screen bg-gray-200"></div>
{/if}
