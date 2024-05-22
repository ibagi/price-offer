<script lang="ts">
  import { Trash2 } from 'lucide-svelte';
  import Money from '../../components/Money.svelte';
  import PriceInput from '../../components/PriceInput.svelte';
  import { t } from '../../lib/i18n';
  import type { OfferState } from '../../state';

  export let offerState: OfferState;
  const { offer, hasItem } = offerState;
</script>

{#if $hasItem}
  <div class="overflow-x-auto w-full py-2">
    <table class="table">
      <thead>
        <tr>
          <th>{$t('priceOffer.tableColumns.item')}</th>
          <th class="w-32">{$t('priceOffer.tableColumns.unitPrice')}</th>
          <th class="w-32">{$t('priceOffer.tableColumns.total')}</th>
          <th class="w-36">{$t('priceOffer.tableColumns.amount')}</th>
          <th class="w-48">{$t('priceOffer.tableColumns.workPrice')}</th>
          <th class="w-48">{$t('priceOffer.tableColumns.materialPrice')}</th>
          <th>{$t('priceOffer.tableColumns.description')}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each $offer.items ?? [] as item}
          <tr>
            <td
              ><input
                class="input input-bordered input-sm w-full"
                value={item.name}
                on:input={e => (item.name = e.currentTarget.value)}/></td>
            <td>
              <Money
                value={item.workPrice + item.materialPrice}
                currency={$offer.currency} />
            </td>
            <td>
              <Money
                value={offerState.totalPrice(item)}
                currency={$offer.currency} />
            </td>
            <td
              ><input
                type="number"
                class="input input-bordered input-sm text-right w-full"
                value={item.amount}
                on:change={(e) =>
                  (item.amount = e.currentTarget.valueAsNumber)} /></td>
            <td>
              <PriceInput
                bind:value={item.workPrice}
                currency={$offer.currency} />
            </td>
            <td>
              <PriceInput
                bind:value={item.materialPrice}
                currency={$offer.currency} />
            </td>
            <td>
              <input
                class="input input-bordered input-sm w-full"
                value={item.description}
                on:input={(e) => (item.description = e.currentTarget.value)} />
            </td>
            <td class="p-0 w-4">
              <button
                title={$t('priceOffer.actions.delete')}
                class="btn btn-sm"
                on:click={() => offerState.removeItem(item)}>
                <Trash2 size={20} />
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p class="flex flex-1 justify-center items-center h-32">
    {$t('priceOffer.hint')}
  </p>
{/if}
