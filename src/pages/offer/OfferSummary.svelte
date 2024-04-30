<script lang="ts">
  import { t } from '../../lib/i18n';
  import { OfferState } from '../../state';
  import Money from '../../components/Money.svelte';
  import { getDecimalPlaces } from '../../lib/prices';

  export let offerState: OfferState;
  const { offer, netto, tax, brutto } = offerState;
</script>

<div class="flex justify-end gap-3 items-center px-4">
  <div class="stat pt-0 pb-0">
    <div class="stat-title text-sm">{$t('priceOffer.summary.netto')}</div>
    <div class="stat-value text-sm">
      <Money
        value={$netto}
        currency={$offer.currency}
        fractions={getDecimalPlaces($offer.currency)} />
    </div>
  </div>
  <div class="stat pt-0 pb-0">
    <div class="stat-title text-sm">{$t('priceOffer.summary.tax')}</div>
    <div class="stat-value text-sm">
      <Money
        value={$tax}
        currency={$offer.currency}
        fractions={getDecimalPlaces($offer.currency)} />
    </div>
  </div>
  <div class="stat pt-0 pb-0">
    <div class="stat-title text-sm">{$t('priceOffer.summary.brutto')}</div>
    <div class="stat-value text-sm">
      <Money
        value={$brutto}
        currency={$offer.currency}
        fractions={getDecimalPlaces($offer.currency)} />
    </div>
  </div>
</div>
