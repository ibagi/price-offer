<script lang="ts" generics="TParams, TData">
  export let params: TParams;
  export let loadFn: (p: TParams) => Promise<TData>;

  $: promise = loadFn(params);
</script>

{#await promise}
  <slot name="pending" />
{:then data}
  <slot {data} />
{/await}
