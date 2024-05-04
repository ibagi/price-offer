<script>
  import Layout from '../layouts/Layout.svelte';
</script>

<Layout>
  <h1 class="sr-only">Loading...</h1>
  <div class="flex items-center h-full justify-center p-10">
    <div class="w-full h-full flex flex-col gap-8">
      <div class="skeleton h-24 w-full"></div>
      <div class="skeleton h-full w-full"></div>
      <div class="skeleton h-12 w-full"></div>
    </div>
  </div>
</Layout>
