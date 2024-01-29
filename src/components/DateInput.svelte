<script lang="ts">
  import dayjs from 'dayjs';

  const FORMAT = 'YYYY-MM-DD';

  let internal: string | undefined;

  export let id = '';
  export let placeholder = '';
  export let name = '';
  export let value = new Date();

  const input = (v: Date) => (internal = dayjs(v).format(FORMAT));
  const output = (v: string) => (value = dayjs(v, FORMAT).toDate());

  $: input(value);
  $: if (internal) {
    output(internal);
  }
</script>

<input
  {...{ id, placeholder, name }}
  class="input input-sm input-bordered w-full max-w-xs"
  type="date"
  bind:value={internal} />
