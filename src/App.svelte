<script lang="ts">
  import { onMount } from 'svelte';
  import { Router, Route } from 'svelte-navigator';

  import Home from './pages/Home.svelte';
  import Preview from './pages/Preview.svelte';

  import * as store from './lib/store';
  import db from './lib/db';

  onMount(async () => {
    await db.initialize();
    await store.restore(db);
  });
</script>

<Router>
  <Route path="/">
    <Home />
  </Route>
  <Route path="/preview">
    <Preview />
  </Route>
</Router>
