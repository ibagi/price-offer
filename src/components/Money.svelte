<script lang="ts">
  import type { Currency } from '../lib/types';
    import {locale} from '../lib/i18n';

  export let value = 0;
  export let currency: Currency = 'HUF';
  export let fractions = 0;

  let text = '';

  function formatNumber(val: number, loc: string) {
    const formatter = new Intl.NumberFormat(loc, {
        style: 'currency',
        currency,
        minimumFractionDigits: fractions
    });

    text = formatter.format(val);
  }

  $: formatNumber(value, $locale);
</script>

<div class="text-center">{text}</div>
