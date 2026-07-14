<script lang="ts">
  import { run } from 'svelte/legacy';

  import { Link as NavigatorLink } from 'svelte-navigator';
  import Layout from '../../layouts/Layout.svelte';
  import { t } from '../../lib/i18n';
  import { OfferState } from '../../state';
  import { autoUpdateOffer } from '../../services/offer';
  import OfferItems from './OfferItems.svelte';
  import OfferForm from './OfferForm.svelte';
  import OfferSummary from './OfferSummary.svelte';

  interface Props {
    offerState: OfferState;
  }

  let { offerState }: Props = $props();
  const Link = NavigatorLink as any;
  let isDirty = $derived(offerState.isDirty);
  let offer = $derived(offerState.offer);

  const tabs = ['form', 'items'];

  let activeTab: (typeof tabs)[number] = $state(tabs[0]);

  run(() => {
    $isDirty && autoUpdateOffer($offer);
  });
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
              onclick={() => (activeTab = tab)}>
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

  {#snippet actions()}
    <section class="flex gap-2 justify-end border-t-2 pt-2">
      {#if activeTab === 'items'}
        <button class="btn btn-sm" onclick={offerState.removeItems}
          >{$t('priceOffer.actions.clearAll')}</button>
        <button class="btn btn-neutral btn-sm" onclick={offerState.addItem}
          >{$t('priceOffer.actions.add')}</button>
      {/if}
    </section>
  {/snippet}
</Layout>

<style>
  .tab-active {
    color: #fff !important;
  }
</style>
