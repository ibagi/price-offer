<script lang="ts" generics="TParams, TData">
  interface Props {
    params: TParams;
    loadFn: (p: TParams) => Promise<TData>;
    pending?: import('svelte').Snippet;
    children?: import('svelte').Snippet<[any]>;
  }

  let {
    params,
    loadFn,
    pending,
    children
  }: Props = $props();

  let promise = $derived(loadFn(params));
</script>

{#await promise}
  {@render pending?.()}
{:then data}
  {@render children?.({ data, })}
{/await}
