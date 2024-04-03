<script lang="ts">
  import { onMount } from 'svelte';
  import { Link, useLocation, type NavigatorLocation } from 'svelte-navigator';
  import type AnyObject from 'svelte-navigator/types/AnyObject';
  import { DownloadIcon } from 'lucide-svelte';

  import { user, mountUserButton } from '../lib/auth';
  import { t } from '../lib/i18n';

  let routes = [
    {
      to: '/company',
      title: $t('navigation.company'),
      isActive: false,
    },
    {
      to: '/partners',
      title: $t('navigation.partners'),
      isActive: false,
    },
    {
      to: '/',
      title: $t('navigation.priceOfferList'),
      isActive: false,
    },
  ];

  let userButtonElement: HTMLDivElement;
  const location = useLocation();

  function setActiveRoute(loc: NavigatorLocation<AnyObject>) {
    routes = routes.map((r) => ({ ...r, isActive: loc.pathname === r.to }));
  }

  onMount(() => mountUserButton(userButtonElement));

  $: setActiveRoute($location);
</script>

<nav class="flex bg-teal-600 justify-between px-8">
  <div role="tablist" class="tabs tabs-bordered">
    {#each routes as route}
      {#if route.isActive}
        <Link
          role="tab"
          class="tab text-sm h-12 text-white tab-active bg-teal-700"
          as="a"
          to={route.to}>{route.title}</Link>
      {:else}
        <Link
          role="tab"
          class="tab text-sm h-12 text-white"
          as="a"
          to={route.to}>{route.title}</Link>
      {/if}
    {/each}
  </div>

  <div class="flex items-center gap-2">
    {#if user}
      <div class="font-medium text-white text-sm">
        {$user?.primaryEmailAddress}
      </div>
      <div bind:this={userButtonElement}></div>
    {/if}
  </div>
</nav>
