<script lang="ts">
  import { Router, Route } from 'svelte-navigator';

  import Auth from './components/Auth.svelte';

  import OfferList from './pages/OfferList/OfferList.svelte';
  import Offer from './pages/Offer.svelte';
  import Preview from './pages/Preview.svelte';
  import Company from './pages/Company.svelte';
  import Partners from './pages/Partners.svelte';
  import Loader from './components/Loader.svelte';
  import { getOffer } from './services/offer';
  import { OfferState } from './state';
  import PageLoadIndicator from './components/PageLoadIndicator.svelte';
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
