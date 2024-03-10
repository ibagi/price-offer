<script lang="ts">
  import { Router, Route } from 'svelte-navigator';

  import Auth from './components/Auth.svelte';

  import OfferList from './pages/OfferList/OfferList.svelte';
  import Offer from './pages/Offer.svelte';
  import Preview from './pages/Preview.svelte';
  import Company from './pages/Company.svelte';
  import Partners from './pages/Partners.svelte';
  import OfferLoader from './components/OfferLoader.svelte';
</script>

<Auth>
  <Router>
    <Route path="/">
      <OfferList />
    </Route>
    <Route path="/offer/:offerId" let:params>
      <OfferLoader offerId={params.offerId} let:offerState>
        <Offer {offerState} />
      </OfferLoader>
    </Route>
    <Route path="/preview/:offerId" let:params>
      <OfferLoader offerId={params.offerId} let:offerState>
        <Preview {offerState} />
      </OfferLoader>
    </Route>
    <Route path="/company">
      <Company />
    </Route>
    <Route path="/partners">
      <Partners />
    </Route>
  </Router>
</Auth>
