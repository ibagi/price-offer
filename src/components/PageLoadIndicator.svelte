<script>
  import Layout from "../layouts/Layout.svelte";
</script>

<Layout>
  <h1 class="sr-only">Loading...</h1>
  <div class="flex flex-col gap-4 p-5" slot="right">
    <div class="skeleton h-32 w-full"></div>
    <div class="skeleton h-4 w-full"></div>
    <div class="skeleton h-4 w-full"></div>
    <div class="skeleton h-4 w-full"></div>
  </div>
</Layout>
