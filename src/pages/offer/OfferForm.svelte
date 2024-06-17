<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { t } from '../../lib/i18n';
  import { OfferState, partnerState } from '../../state';
  import { EditIcon, PencilIcon } from 'lucide-svelte';
  import { currencies, offerStatuses } from '../../lib/types';
  import DateInput from '../../components/DateInput.svelte';
  import OfferNumberDialog from './OfferNumberDialog.svelte';

  export let offerState: OfferState;
  let offerNumberDialogRef: OfferNumberDialog;

  const { partners } = partnerState;
  const { offer } = offerState;

  function editOfferNumber(offerDate: Date, sequence: number) {
    offerNumberDialogRef.show(offerDate, sequence);
  }
</script>

<section class="flex justify-around pt-8">
  <div>
    <div class="flex gap-2 py-2">
      <label class="font-medium label text-sm w-28" for="partner">
        {$t('priceOffer.labels.partner')}
      </label>
      <select
        id="partner"
        placeholder={$t('priceOffer.labels.partner')}
        class="select select-sm select-bordered w-96"
        name="partner"
        disabled={$partners.length === 0}
        bind:value={$offer.partnerId}>
        {#each $partners as partner}
          <option value={partner.id}>{partner.name}</option>
        {/each}
      </select>
      <Link
        as="a"
        class="btn btn-sm p-0 px-1"
        title={$t('priceOffer.tooltips.partner')}
        to="/partners">
        <EditIcon size={18} />
      </Link>
    </div>

    <div class="flex gap-2 py-2">
      <label class="font-medium label text-sm w-28" for="offerNumber">
        {$t('priceOffer.labels.offerNumber')}
      </label>
      <input
        id="offerNumber"
        placeholder={$t('priceOffer.labels.offerNumber')}
        class="input input-sm input-bordered w-96"
        type="text"
        name="offerNumber"
        disabled
        bind:value={$offer.offerNumber} />
      <button
        class="btn btn-sm btn-neutral p-0 px-1"
        title={$t('priceOffer.actions.modifyOfferNumber')}
        on:click={() => editOfferNumber($offer.offerDate, $offer.sequence)}>
        <PencilIcon size={18} />
      </button>
    </div>

    <div class="flex gap-2 py-2">
      <label class="font-medium label text-sm w-28" for="projectName"
        >{$t('priceOffer.labels.project')}
      </label>
      <input
        id="projectName"
        placeholder={$t('priceOffer.labels.project')}
        class="input input-sm input-bordered w-96"
        type="text"
        name="projectName"
        bind:value={$offer.projectName} />
    </div>

    <div class="flex gap-2 py-2">
      <label class="font-medium label text-sm w-28" for="offerPlace">
        {$t('priceOffer.labels.offerPlace')}
      </label>
      <input
        id="offerPlace"
        placeholder={$t('priceOffer.labels.offerPlace')}
        class="input input-sm input-bordered w-96"
        name="offerPlace"
        bind:value={$offer.offerPlace} />
    </div>

    <div class="flex gap-2 py-2">
      <label class="font-medium label text-sm w-28" for="status">
        {$t('priceOffer.labels.status')}
      </label>
      <select
        id="status"
        placeholder={$t('priceOffer.labels.status')}
        class="select select-sm select-bordered w-32"
        name="status"
        bind:value={$offer.status}>
        {#each offerStatuses as status}
          <option value={status}>{$t(`offer.status.${status}`)}</option>
        {/each}
      </select>
    </div>
  </div>

  <div>
    <div class="flex gap-2 py-2">
      <label class="font-medium label text-sm w-36" for="offerDate">
        {$t('priceOffer.labels.offerDate')}
      </label>
      <div class="w-48">
        <DateInput
          id="offerDate"
          placeholder={$t('priceOffer.labels.offerDate')}
          name="offerDate"
          bind:value={$offer.offerDate} />
      </div>
    </div>

    <div class="flex gap-2 py-2">
      <label class="font-medium label text-sm w-36" for="validity">
        {$t('priceOffer.labels.validity')}
      </label>
      <input
        id="validity"
        placeholder={$t('priceOffer.labels.validity')}
        class="input input-sm input-bordered w-32 text-right"
        type="number"
        name="validity"
        bind:value={$offer.validity} />
    </div>

    <div class="flex gap-2 py-2">
      <label class="font-medium label text-sm w-36" for="taxRate">
        {$t('priceOffer.labels.taxRate')}
      </label>
      <input
        id="taxRate"
        placeholder={$t('priceOffer.labels.taxRate')}
        class="input input-sm input-bordered w-32 text-right"
        type="number"
        name="taxRate"
        bind:value={$offer.taxRate} />
    </div>

    <div class="flex gap-2 py-2">
      <label class="font-medium label text-sm w-36" for="productionTime">
        {$t('priceOffer.labels.productionTime')}
      </label>
      <input
        id="productionTime"
        placeholder={$t('priceOffer.labels.productionTime')}
        class="input input-sm input-bordered w-32 text-right"
        type="number"
        name="productionTime"
        bind:value={$offer.productionTimeInDays} />
    </div>

    <div class="flex gap-2 py-2">
      <label class="font-medium label text-sm w-36" for="currency">
        {$t('priceOffer.labels.currency')}
      </label>
      <select
        id="currency"
        placeholder={$t('priceOffer.labels.currency')}
        class="select select-sm select-bordered w-32"
        name="currency"
        bind:value={$offer.currency}>
        {#each currencies as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>
    </div>
  </div>

  <OfferNumberDialog bind:this={offerNumberDialogRef} {offerState} />
</section>
