<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { Edit } from 'lucide-svelte';
  import CardLayout from '../layouts/CardLayout.svelte';
  import { t } from '../lib/i18n';

  import {
    contact,
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

  import DateInput from '../components/DateInput.svelte';
</script>

<CardLayout>
  <section slot="left" class="w-64">
    <h1 class="font-bold text-xl pb-2" tabindex="-1">
      {$t('home.title')}
    </h1>
      <label class="font-medium label" for="partner">
        {$t('home.labels.partner')}
      </label>

      <div class="flex gap-2">
        <select
          id="partner"
          placeholder={$t('home.labels.partner')}
          class="select select-sm select-bordered w-full max-w-xs"
          name="partner"
          disabled={$partners.length === 0}
          bind:value={$selectedPartner}>
          {#each $partners as partner}
            <option value={partner}>{partner.name}</option>
          {/each}
        </select>
        <button class="btn btn-sm btn-neutral p-0 px-1">
          <Link to="/partners">
            <Edit />
          </Link>
        </button>
      </div>

      <label class="font-medium label" for="offerNumber">
        {$t('home.labels.offerNumber')}
      </label>
      <input
        id="offerNumber"
        placeholder={$t('home.labels.offerNumber')}
        class="input input-sm input-bordered w-full max-w-xs"
        type="text"
        name="offerNumber"
        bind:value={$offer.offerNumber} />

      <label class="font-medium label" for="projectName"
        >{$t('home.labels.project')}
      </label>
      <input
        id="projectName"
        placeholder={$t('home.labels.project')}
        class="input input-sm input-bordered w-full max-w-xs"
        type="text"
        name="projectName"
        bind:value={$offer.projectName} />

      <label class="font-medium label" for="offerPlace">
        {$t('home.labels.offerPlace')}
      </label>
      <input
        id="offerPlace"
        placeholder={$t('home.labels.offerPlace')}
        class="input input-sm input-bordered w-full max-w-xs"
        name="offerPlace"
        bind:value={$offer.offerPlace} />

      <label class="font-medium label" for="offerDate">
        {$t('home.labels.offerDate')}
      </label>
      <DateInput
        id="offerDate"
        placeholder={$t('home.labels.offerDate')}
        name="offerDate"
        bind:value={$offer.offerDate} />

      <label class="font-medium label" for="validity">
        {$t('home.labels.validity')}
      </label>
      <input
        id="validity"
        placeholder={$t('home.labels.validity')}
        class="input input-sm input-bordered w-full max-w-xs"
        type="number"
        name="validity"
        bind:value={$offer.validity} />

      <label class="font-medium label" for="taxRate">
        {$t('home.labels.taxRate')}
      </label>
      <input
        id="taxRate"
        placeholder={$t('home.labels.taxRate')}
        class="input input-sm input-bordered w-full max-w-xs"
        type="number"
        name="taxRate"
        bind:value={$taxRate} />

      <label class="font-medium label" for="currency">
        {$t('home.labels.currency')}
      </label>
      <input
        id="currency"
        placeholder={$t('home.labels.currency')}
        class="input input-sm input-bordered w-full max-w-xs"
        name="currency"
        bind:value={$offer.currency} />
  </section>

  <section class="flex flex-col h-full" slot="right">
    <div class="flex gap-2">
      <h2 class="card-title flex-1" tabindex="-1">
        {$t('home.tableHeader')}
      </h2>
      <button class="btn btn-sm" on:click={removeItems}
        >{$t('home.actions.clearAll')}</button>
      <button class="btn btn-neutral btn-sm" on:click={addItem}
        >{$t('home.actions.add')}</button>
      <button class="btn btn-sm btn-primary" disabled={!$hasItem}>
        <Link to="/preview">{$t('home.actions.preview')}</Link>
      </button>
    </div>

    {#if $hasItem}
      <div class="overflow-x-auto w-full">
        <table class="table">
          <thead>
            <tr>
              <th>{$t('home.tableColumns.item')}</th>
              <th>{$t('home.tableColumns.unitPrice')}</th>
              <th>{$t('home.tableColumns.amount')}</th>
              <th>{$t('home.tableColumns.total')}</th>
              <th>{$t('home.tableColumns.workPrice')}</th>
              <th>{$t('home.tableColumns.materialPrice')}</th>
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
                <td>{item.workPrice + item.materialPrice}</td>
                <td
                  ><input
                    type="number"
                    class="input input-bordered input-sm text-right"
                    bind:value={item.amount} /></td>
                <td>{totalPrice(item)}</td>
                <td
                  ><input
                    type="number"
                    class="input input-bordered input-sm w-full max-w-xs text-right"
                    bind:value={item.workPrice} /></td>
                <td
                  ><input
                    type="number"
                    class="input input-bordered input-sm w-full max-w-xs text-right"
                    bind:value={item.materialPrice} /></td>
                <td>
                  <button class="btn btn-sm" on:click={() => removeItem(item)}>
                    {$t('home.actions.delete')}
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="divider"></div>
      <div class="font-bold flex justify-end gap-4">
        <div>
          {$t('home.summary.netto', {
            netto: $netto,
            currency: $offer.currency,
          })}
        </div>
        <div>
          {$t('home.summary.tax', { tax: $tax, currency: $offer.currency })}
        </div>
        <div>
          {$t('home.summary.brutto', {
            brutto: $brutto,
            currency: $offer.currency,
          })}
        </div>
      </div>
    {/if}

    {#if !$hasItem}
      <p class="flex flex-1 justify-center items-center h-32">
        {$t('home.hint')}
      </p>
    {/if}
  </section>
</CardLayout>
