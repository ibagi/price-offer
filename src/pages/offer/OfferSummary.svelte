<script lang="ts">
  import { t } from '../../lib/i18n';
  import { OfferState } from '../../state';
  import Money from "../../components/Money.svelte";
  import { getDecimalPlaces } from "../../lib/prices";

  export let offerState: OfferState;
  const { offer, netto, tax, brutto } = offerState;
</script>

<div class="font-bold flex justify-end gap-8">
    <div class="text-center">
      <span>{$t('priceOffer.summary.netto')}</span>
      <div>
        <Money
          value={$netto}
          currency={$offer.currency}
          fractions={getDecimalPlaces($offer.currency)} />
      </div>
    </div>
    <div class="text-center">
      <span>{$t('priceOffer.summary.tax')}</span>
      <div>
        <Money
          value={$tax}
          currency={$offer.currency}
          fractions={getDecimalPlaces($offer.currency)} />
      </div>
    </div>
    <div class="text-center">
      <span>{$t('priceOffer.summary.brutto')}</span>
      <div>
        <Money
          value={$brutto}
          currency={$offer.currency}
          fractions={getDecimalPlaces($offer.currency)} />
      </div>
    </div>
  </div>