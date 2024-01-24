<script lang="ts">
  import { Router, Route } from 'svelte-navigator';

  import Home from './pages/Home.svelte';
  import Preview from './pages/Preview.svelte';
</script>

<Router>
  <Route path="/">
    <Home />
  </Route>
  <Route path="/preview">
    <Preview />
  </Route>
</Router>
