<script lang="ts">
  import { run } from 'svelte/legacy';

  import dayjs from 'dayjs';

  const FORMAT = 'YYYY-MM-DD';

  let internal: string | undefined = $state();

  interface Props {
    id?: string;
    placeholder?: string;
    name?: string;
    value?: any;
  }

  let {
    id = '',
    placeholder = '',
    name = '',
    value = $bindable(new Date())
  }: Props = $props();

  const input = (v: Date) => (internal = dayjs(v).format(FORMAT));
  const output = (v: string) => (value = dayjs(v, FORMAT).toDate());

  run(() => {
    input(value);
  });
  run(() => {
    if (internal) {
      output(internal);
    }
  });
</script>

<input
  {...{ id, placeholder, name }}
  class="input input-sm input-bordered w-full max-w-xs"
  type="date"
  bind:value={internal} />
