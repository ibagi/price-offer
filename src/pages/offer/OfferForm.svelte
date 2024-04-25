<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { t } from '../../lib/i18n';
  import { OfferState, partnerState } from '../../state';
  import { Edit } from 'lucide-svelte';
  import { currencies, offerStatuses } from '../../lib/types';
  import DateInput from '../../components/DateInput.svelte';

  export let offerState: OfferState;

  const { partners } = partnerState;
  const { offer } = offerState;
</script>

<label class="font-medium label text-sm" for="partner">
  {$t('priceOffer.labels.partner')}
</label>

<div class="flex gap-2">
  <select
    id="partner"
    placeholder={$t('priceOffer.labels.partner')}
    class="select select-sm select-bordered w-full"
    name="partner"
    disabled={$partners.length === 0}
    bind:value={$offer.partnerId}>
    {#each $partners as partner}
      <option value={partner.id}>{partner.name}</option>
    {/each}
  </select>
  <Link
    as="a"
    class="btn btn-sm btn-neutral p-0 px-1"
    title={$t('priceOffer.tooltips.partner')}
    to="/partners">
    <Edit />
  </Link>
</div>

<label class="font-medium label text-sm" for="status">
  {$t('priceOffer.labels.status')}
</label>

<select
  id="status"
  placeholder={$t('priceOffer.labels.status')}
  class="select select-sm select-bordered w-full"
  name="status"
  bind:value={$offer.status}>
  {#each offerStatuses as status}
    <option value={status}>{$t(`offer.status.${status}`)}</option>
  {/each}
</select>

<label class="font-medium label text-sm" for="offerNumber">
  {$t('priceOffer.labels.offerNumber')}
</label>
<input
  id="offerNumber"
  placeholder={$t('priceOffer.labels.offerNumber')}
  class="input input-sm input-bordered w-full"
  type="text"
  name="offerNumber"
  bind:value={$offer.offerNumber} />

<label class="font-medium label text-sm" for="projectName"
  >{$t('priceOffer.labels.project')}
</label>
<input
  id="projectName"
  placeholder={$t('priceOffer.labels.project')}
  class="input input-sm input-bordered w-full"
  type="text"
  name="projectName"
  bind:value={$offer.projectName} />

<label class="font-medium label text-sm" for="offerPlace">
  {$t('priceOffer.labels.offerPlace')}
</label>
<input
  id="offerPlace"
  placeholder={$t('priceOffer.labels.offerPlace')}
  class="input input-sm input-bordered w-full"
  name="offerPlace"
  bind:value={$offer.offerPlace} />

<label class="font-medium label text-sm" for="offerDate">
  {$t('priceOffer.labels.offerDate')}
</label>
<DateInput
  id="offerDate"
  placeholder={$t('priceOffer.labels.offerDate')}
  name="offerDate"
  bind:value={$offer.offerDate} />

<label class="font-medium label text-sm" for="validity">
  {$t('priceOffer.labels.validity')}
</label>
<input
  id="validity"
  placeholder={$t('priceOffer.labels.validity')}
  class="input input-sm input-bordered w-full"
  type="number"
  name="validity"
  bind:value={$offer.validity} />

<label class="font-medium label text-sm" for="taxRate">
  {$t('priceOffer.labels.taxRate')}
</label>
<input
  id="taxRate"
  placeholder={$t('priceOffer.labels.taxRate')}
  class="input input-sm input-bordered w-full"
  type="number"
  name="taxRate"
  bind:value={$offer.taxRate} />

<label class="font-medium label text-sm" for="productionTime">
  {$t('priceOffer.labels.productionTime')}
</label>
<input
  id="productionTime"
  placeholder={$t('priceOffer.labels.productionTime')}
  class="input input-sm input-bordered w-full"
  type="number"
  name="productionTime"
  bind:value={$offer.productionTimeInDays} />

<label class="font-medium label text-sm" for="currency">
  {$t('priceOffer.labels.currency')}
</label>
<select
  id="currency"
  placeholder={$t('priceOffer.labels.currency')}
  class="select select-sm select-bordered w-full max-w-xs"
  name="currency"
  bind:value={$offer.currency}>
  {#each currencies as currency}
    <option value={currency}>{currency}</option>
  {/each}
</select>
