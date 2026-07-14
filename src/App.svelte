<script lang="ts">
  import {
    Router as NavigatorRouter,
    Route as NavigatorRoute,
  } from 'svelte-navigator';
  import { getOffer } from './services/offer';
  import { OfferState } from './state';

  import Auth from './components/Auth.svelte';
  import Loader from './components/Loader.svelte';
  import PageLoadIndicator from './components/PageLoadIndicator.svelte';

  import OfferList from './pages/offer-list/OfferListPage.svelte';
  import Offer from './pages/offer/OfferPage.svelte';
  import Preview from './pages/Preview.svelte';
  import Company from './pages/Company.svelte';
  import Partners from './pages/Partners.svelte';

  const Router = NavigatorRouter as any;
  const Route = NavigatorRoute as any;
</script>

<Auth>
  <Router>
    <Route path="/">
      <OfferList />
    </Route>
    <Route path="/offer/:offerId">
      {#snippet children({ params }: { params: { offerId: string } })}
        <Loader params={params.offerId} loadFn={(id) => getOffer(id)}>
          {#snippet children({ data })}
            <Offer offerState={new OfferState(data)} />
          {/snippet}
          {#snippet pending()}
            <PageLoadIndicator />
          {/snippet}
        </Loader>
      {/snippet}
    </Route>
    <Route path="/preview/:offerId">
      {#snippet children({ params }: { params: { offerId: string } })}
        <Loader params={params.offerId} loadFn={(id) => getOffer(id)}>
          {#snippet children({ data })}
            <Preview offerState={new OfferState(data)} />
          {/snippet}
          {#snippet pending()}
            <h1 class="sr-only">Loading...</h1>
          {/snippet}
        </Loader>
      {/snippet}
    </Route>
    <Route path="/company">
      <Company />
    </Route>
    <Route path="/partners">
      <Partners />
    </Route>
  </Router>
</Auth>
