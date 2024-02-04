<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { Edit } from 'lucide-svelte';

  import Layout from '../layouts/Layout.svelte';
  import DateInput from '../components/DateInput.svelte';

  import { t } from '../lib/i18n';
  import {
    taxRate,
    offer,
    tax,
    offerItems,
    hasItem,
    netto,
    brutto,
    addItem,
    removeItem,
    removeItems,
    totalPrice,
    partners,
    selectedPartner,
  } from '../lib/state';
  import PriceInput from '../components/PriceInput.svelte';
  import { currencies } from '../lib/types';
  import Money from '../components/Money.svelte';
  import { getDecimalPlaces } from '../lib/prices';
</script>

<Layout>
  <section slot="left" class="w-64">
    <h1 class="font-bold text-lg pb-2" tabindex="-1">
      {$t('priceOffer.title')}
    </h1>
    <label class="font-medium label" for="partner">
      {$t('priceOffer.labels.partner')}
    </label>

    <div class="flex gap-2">
      <select
        id="partner"
        placeholder={$t('priceOffer.labels.partner')}
        class="select select-sm select-bordered w-full max-w-xs"
        name="partner"
        disabled={$partners.length === 0}
        bind:value={$selectedPartner}>
        {#each $partners as partner}
          <option value={partner}>{partner.name}</option>
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

    <label class="font-medium label" for="offerNumber">
      {$t('priceOffer.labels.offerNumber')}
    </label>
    <input
      id="offerNumber"
      placeholder={$t('priceOffer.labels.offerNumber')}
      class="input input-sm input-bordered w-full max-w-xs"
      type="text"
      name="offerNumber"
      bind:value={$offer.offerNumber} />

    <label class="font-medium label" for="projectName"
      >{$t('priceOffer.labels.project')}
    </label>
    <input
      id="projectName"
      placeholder={$t('priceOffer.labels.project')}
      class="input input-sm input-bordered w-full max-w-xs"
      type="text"
      name="projectName"
      bind:value={$offer.projectName} />

    <label class="font-medium label" for="offerPlace">
      {$t('priceOffer.labels.offerPlace')}
    </label>
    <input
      id="offerPlace"
      placeholder={$t('priceOffer.labels.offerPlace')}
      class="input input-sm input-bordered w-full max-w-xs"
      name="offerPlace"
      bind:value={$offer.offerPlace} />

    <label class="font-medium label" for="offerDate">
      {$t('priceOffer.labels.offerDate')}
    </label>
    <DateInput
      id="offerDate"
      placeholder={$t('priceOffer.labels.offerDate')}
      name="offerDate"
      bind:value={$offer.offerDate} />

    <label class="font-medium label" for="validity">
      {$t('priceOffer.labels.validity')}
    </label>
    <input
      id="validity"
      placeholder={$t('priceOffer.labels.validity')}
      class="input input-sm input-bordered w-full max-w-xs"
      type="number"
      name="validity"
      bind:value={$offer.validity} />

    <label class="font-medium label" for="taxRate">
      {$t('priceOffer.labels.taxRate')}
    </label>
    <input
      id="taxRate"
      placeholder={$t('priceOffer.labels.taxRate')}
      class="input input-sm input-bordered w-full max-w-xs"
      type="number"
      name="taxRate"
      bind:value={$taxRate} />

    <label class="font-medium label" for="productionTime">
      {$t('priceOffer.labels.productionTime')}
    </label>
    <input
      id="productionTime"
      placeholder={$t('priceOffer.labels.productionTime')}
      class="input input-sm input-bordered w-full max-w-xs"
      type="number"
      name="productionTime"
      bind:value={$offer.productionTimeInDays} />

    <label class="font-medium label" for="currency">
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
      <button class="btn btn-sm" on:click={removeItems}
        >{$t('priceOffer.actions.clearAll')}</button>
      <button class="btn btn-neutral btn-sm" on:click={addItem}
        >{$t('priceOffer.actions.add')}</button>
    </div>

    {#if $hasItem}
      <div class="overflow-x-auto w-full">
        <table class="table">
          <thead>
            <tr>
              <th>{$t('priceOffer.tableColumns.item')}</th>
              <th>{$t('priceOffer.tableColumns.unitPrice')}</th>
              <th>{$t('priceOffer.tableColumns.amount')}</th>
              <th>{$t('priceOffer.tableColumns.total')}</th>
              <th>{$t('priceOffer.tableColumns.workPrice')}</th>
              <th>{$t('priceOffer.tableColumns.materialPrice')}</th>
              <th class="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {#each $offerItems as item}
              <tr>
                <td
                  ><input
                    class="input input-bordered input-sm w-full max-w-xs"
                    bind:value={item.name} /></td>
                <td>{item.workPrice + item.materialPrice} {$offer.currency}</td>
                <td
                  ><input
                    type="number"
                    class="input input-bordered input-sm text-right"
                    bind:value={item.amount} /></td>
                <td>{totalPrice(item)} {$offer.currency}</td>
                <td>
                  <PriceInput
                    bind:value={item.workPrice}
                    currency={$offer.currency} />
                </td><td>
                  <PriceInput
                    bind:value={item.materialPrice}
                    currency={$offer.currency} />
                </td><td>
                  <button class="btn btn-sm" on:click={() => removeItem(item)}>
                    {$t('priceOffer.actions.delete')}
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="divider"></div>
      <div class="font-bold flex justify-end gap-6">
        <div class="text-center">
          <span>{$t('priceOffer.summary.netto')}</span>
          <Money value={$netto} currency={$offer.currency} fractions={getDecimalPlaces($offer.currency)}></Money>
        </div>
        <div class="text-center">
          <span>{$t('priceOffer.summary.tax')}</span>
          <Money value={$tax} currency={$offer.currency} fractions={getDecimalPlaces($offer.currency)}></Money>
        </div>
        <div class="text-center">
          <span>{$t('priceOffer.summary.brutto')}</span>
          <Money value={$brutto} currency={$offer.currency} fractions={getDecimalPlaces($offer.currency)}></Money>
        </div>
      </div>
    {/if}

    {#if !$hasItem}
      <p class="flex flex-1 justify-center items-center h-32">
        {$t('priceOffer.hint')}
      </p>
    {/if}
  </section>
</Layout>
