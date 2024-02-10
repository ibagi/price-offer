<script lang="ts">
  import { Link, useLocation, type NavigatorLocation } from 'svelte-navigator';
  import type AnyObject from 'svelte-navigator/types/AnyObject';
  import { LogOut } from 'lucide-svelte';

  import { user, signOut } from '../lib/auth';
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
      title: $t('navigation.priceOffer'),
      isActive: false,
    },
  ];

  const location = useLocation();

  function setActiveRoute(loc: NavigatorLocation<AnyObject>) {
    routes = routes.map((r) => ({ ...r, isActive: loc.pathname === r.to }));
  }

  $: setActiveRoute($location);
</script>

<nav class="flex bg-teal-600 justify-between px-8">
  <div role="tablist" class="tabs tabs-bordered">
    {#each routes as route}
      {#if route.isActive}
        <Link
          role="tab"
          class="tab text-base h-12 font-medium text-white tab-active bg-teal-700"
          as="a"
          to={route.to}>{route.title}</Link>
      {:else}
        <Link
          role="tab"
          class="tab text-base h-12 font-medium text-white"
          as="a"
          to={route.to}>{route.title}</Link>
      {/if}
    {/each}
    <Link
      role="tab"
      class="tab text-base h-12 text-white font-bold"
      as="a"
      to="/preview">{$t('navigation.preview')}</Link>
  </div>
  {#if user}
    <button
      class="btn btn-small bg-teal-600 border-0 text-black-200 hover:text-white hover:bg-teal-600"
      on:click={signOut}>
      {$user?.primaryEmailAddress}
      <LogOut />
    </button>
  {/if}
</nav>
