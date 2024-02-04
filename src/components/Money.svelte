<script lang="ts">
  import type { Currency } from '../lib/types';
  import { locale } from '../lib/i18n';

  export let value = 0;
  export let currency: Currency;
  export let fractions = 0;

  let text = '';

  function formatNumber(val: number, loc: string, curr: string) {
    const formatter = new Intl.NumberFormat(loc, {
      style: 'currency',
      currency,
      currencyDisplay: 'code',
      minimumFractionDigits: fractions,
    });

    text = formatter.format(val);
  }

  $: formatNumber(value, $locale, currency);
</script>

<span>{text}</span>
