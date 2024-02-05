<script lang="ts">
  import { Link, useLocation, type NavigatorLocation } from 'svelte-navigator';
  import type AnyObject from 'svelte-navigator/types/AnyObject';

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

<nav class="flex justify-center bg-teal-600">
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
</nav>
