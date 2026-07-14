<script lang="ts">
  import { run } from 'svelte/legacy';

  import type { Currency } from '../lib/types';
  import { locale } from '../lib/i18n';

  interface Props {
    value?: number;
    currency: Currency;
    fractions?: number;
  }

  let { value = 0, currency, fractions = 0 }: Props = $props();

  let text = $state('');

  function formatNumber(val: number, loc: string, curr: string) {
    const formatter = new Intl.NumberFormat(loc, {
      style: 'currency',
      currency,
      currencyDisplay: 'code',
      minimumFractionDigits: fractions,
    });

    text = formatter.format(val);
  }

  run(() => {
    formatNumber(value, $locale, currency);
  });
</script>

<span>{text}</span>
