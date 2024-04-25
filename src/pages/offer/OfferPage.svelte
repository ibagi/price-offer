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
  const { offer, hasItem } = offerState;

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

    <OfferForm {offerState} />
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
      <OfferItems {offerState} />
    {:else}
      <p class="flex flex-1 justify-center items-center h-32">
        {$t('priceOffer.hint')}
      </p>
    {/if}
  </section>

  <section slot="actions">
    {#if $hasItem}
      <OfferSummary {offerState} />
    {/if}
  </section>
</Layout>
