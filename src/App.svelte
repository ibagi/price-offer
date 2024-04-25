<script lang="ts">
  import { Router, Route } from 'svelte-navigator';
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
</script>

<Auth>
  <Router>
    <Route path="/">
      <OfferList />
    </Route>
    <Route path="/offer/:offerId" let:params>
      <Loader params={params.offerId} loadFn={(id) => getOffer(id)} let:data>
        <Offer offerState={new OfferState(data)} />
        <PageLoadIndicator slot="pending" />
      </Loader>
    </Route>
    <Route path="/preview/:offerId" let:params>
      <Loader params={params.offerId} loadFn={(id) => getOffer(id)} let:data>
        <Preview offerState={new OfferState(data)} />
        <h1 slot="pending" class="sr-only">Loading...</h1>
      </Loader>
    </Route>
    <Route path="/company">
      <Company />
    </Route>
    <Route path="/partners">
      <Partners />
    </Route>
  </Router>
</Auth>
