<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { Edit, Trash2 } from 'lucide-svelte';
  import Layout from '../layouts/Layout.svelte';
  import DateInput from '../components/DateInput.svelte';
  import { t } from '../lib/i18n';
  import { partnerState, OfferState } from '../state';
  import PriceInput from '../components/PriceInput.svelte';
  import { currencies, offerStatuses, type Offer } from '../lib/types';
  import Money from '../components/Money.svelte';
  import { getDecimalPlaces } from '../lib/prices';
  import { updateOffer } from '../services/offer';

  export let offerState: OfferState;
  const { partners } = partnerState;
  const { offer, netto, tax, brutto, hasItem } = offerState;

  $: saveOffer($offer);

  function saveOffer(data: Offer) {
    updateOffer(data);
  }
</script>

<Layout>
  <section slot="left">
    <h1 class="font-bold text-lg pb-2" tabindex="-1">
      {$t('priceOffer.title')}
    </h1>

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
  </section>

  <section class="flex flex-col h-full" slot="right">
    <div class="flex gap-2">
      <h2 class="card-title flex-1" tabindex="-1">
        {$t('priceOffer.tableHeader')}
      </h2>
      <button class="btn btn-sm" on:click={offerState.removeItems}
        >{$t('priceOffer.actions.clearAll')}</button>
      <button class="btn btn-neutral btn-sm" on:click={offerState.addItem}
        >{$t('priceOffer.actions.add')}</button>
      <Link to="/preview/{$offer.id}" class="btn btn-sm btn-primary">
        {$t('priceOffer.actions.preview')}
      </Link>
    </div>

    {#if $hasItem}
      <div class="overflow-x-auto w-full py-2">
        <table class="table">
          <thead>
            <tr>
              <th class="min-w-24">{$t('priceOffer.tableColumns.item')}</th>
              <th class="max-w-32"
                >{$t('priceOffer.tableColumns.unitPrice')}</th>
              <th class="max-w-32">{$t('priceOffer.tableColumns.total')}</th>
              <th class="w-4">{$t('priceOffer.tableColumns.amount')}</th>
              <th class="min-w-36"
                >{$t('priceOffer.tableColumns.workPrice')}</th>
              <th class="min-w-36"
                >{$t('priceOffer.tableColumns.materialPrice')}</th>
              <th class="w-6"></th>
            </tr>
          </thead>
          <tbody>
            {#each $offer.items as item}
              <tr>
                <td class="min-w-24"
                  ><input
                    class="input input-bordered input-sm w-full"
                    bind:value={item.name} /></td>
                <td class="max-w-32">
                  <Money
                    value={item.workPrice + item.materialPrice}
                    currency={$offer.currency} />
                </td>
                <td class="max-w-32">
                  <Money
                    value={offerState.totalPrice(item)}
                    currency={$offer.currency} />
                </td>
                <td class="w-4"
                  ><input
                    type="number"
                    class="input input-bordered input-sm text-right w-24"
                    bind:value={item.amount} /></td>
                <td>
                  <PriceInput
                    bind:value={item.workPrice}
                    currency={$offer.currency} />
                </td>
                <td>
                  <PriceInput
                    bind:value={item.materialPrice}
                    currency={$offer.currency} />
                </td><td class="w-6">
                  <button
                    title={$t('priceOffer.actions.delete')}
                    class="btn btn-sm"
                    on:click={() => offerState.removeItem(item)}>
                    <Trash2 />
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}

    {#if !$hasItem}
      <p class="flex flex-1 justify-center items-center h-32">
        {$t('priceOffer.hint')}
      </p>
    {/if}
  </section>

  <section slot="actions">
    {#if $hasItem}
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
    {/if}
  </section>
</Layout>
