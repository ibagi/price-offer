<script lang="ts">
  import { Router, Route } from 'svelte-navigator';

  import PriceOffer from './pages/PriceOffer.svelte';
  import Preview from './pages/Preview.svelte';
  import Company from './pages/Company.svelte';
  import Partners from './pages/Partners.svelte';
</script>

<Router>
  <Route path="/">
    <PriceOffer />
  </Route>
  <Route path="/preview">
    <Preview />
  </Route>
  <Route path="/company">
    <Company />
  </Route>
  <Route path="/partners">
    <Partners />
  </Route>
</Router>
