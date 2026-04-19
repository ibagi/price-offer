<script lang="ts">
  import type { Currency } from '../lib/types';
  import { roundToFractions } from '../lib/prices';

  interface Props {
    currency: Currency;
    value?: number;
  }

  let { currency, value = $bindable(0) }: Props = $props();

  function handleChange(val: number) {
    if (Number.isNaN(val)) {
      value = 0;
      return;
    }

    value = roundToFractions(val, 2);
  }
</script>

<div class="flex items-center w-full">
  <input
    type="number"
    min="0.01"
    step="any"
    class="input input-bordered input-sm text-right w-full pr-12"
    value={value === 0 ? undefined : value}
    onchange={(e) => handleChange(e.currentTarget.valueAsNumber)} />
  <span style="margin-left: -3rem;">
    {currency}
  </span>
</div>
