<script lang="ts">
  import { Link } from 'svelte-navigator';
  import Layout from '../../layouts/Layout.svelte';
  import { t } from '../../lib/i18n';
  import { OfferState } from '../../state';
  import { updateOffer } from '../../services/offer';
  import { type Offer } from '../../lib/types';
  import OfferItems from './OfferItems.svelte';
  import OfferForm from './OfferForm.svelte';
  import OfferSummary from './OfferSummary.svelte';

  export let offerState: OfferState;
  const { offer } = offerState;

  const tabs = ['form', 'items'];
  let activeTab: (typeof tabs)[number] = tabs[0];

  async function saveOffer() {
    await updateOffer($offer);
  }
</script>

<Layout>
  <section class="flex flex-col h-full">
    <div class="sticky top-0 bg-white z-10">
      <div class="flex items-center justify-between pb-2">
        <h1 class="sr-only">
          {$t('priceOffer.title', { offerNumber: $offer.offerNumber })}
        </h1>
        <div class="font-bold text-lg pb-2 breadcrumbs">
          <ul>
            <li>
              <Link to="/">
                {$t('navigation.priceOfferList')}
              </Link>
            </li>
            <li>
              <Link class="font-bold text-teal-600" to="/offer/{$offer.id}">
                {$offer.offerNumber}
              </Link>
            </li>
          </ul>
        </div>
        <div class="flex gap-2">
          <OfferSummary {offerState} />
          <Link
            to="/preview/{$offer.id}"
            class="btn btn-sm btn-primary text-white">
            {$t('priceOffer.actions.preview')}
          </Link>
        </div>
      </div>

      <div class="flex justify-start">
        <div role="tablist" class="tabs tabs-sm tabs-boxed">
          {#each tabs as tab}
            <button
              role="tab"
              class="tab font-semibold w-32"
              class:tab-active={activeTab === tab}
              on:click={() => (activeTab = tab)}>
              {$t(`priceOffer.tabs.${tab}`)}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <div class="p-2">
      {#if activeTab === 'form'}
        <OfferForm {offerState} />
      {/if}

      {#if activeTab === 'items'}
        <OfferItems {offerState} />
      {/if}
    </div>
  </section>

  <section slot="actions" class="flex gap-2 justify-end border-t-2 pt-2">
    {#if activeTab === 'items'}
      <button class="btn btn-sm" on:click={offerState.removeItems}
        >{$t('priceOffer.actions.clearAll')}</button>
      <button class="btn btn-neutral btn-sm" on:click={offerState.addItem}
        >{$t('priceOffer.actions.add')}</button>
    {/if}
    <button class="btn btn-neutral btn-sm" on:click={saveOffer}
      >{$t('priceOffer.actions.save')}</button>
  </section>
</Layout>

<style>
  .tab-active {
    color: #fff !important;
  }
</style>
