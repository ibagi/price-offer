<script lang="ts">
  import { onMount } from 'svelte';
  import { Link } from 'svelte-navigator';
  import { Clock, CopyPlus, PrinterIcon, Trash2, User } from 'lucide-svelte';
  import { t } from '../../lib/i18n';
  import Layout from '../../layouts/Layout.svelte';
  import OfferStatusBadge from './OfferStatusBadge.svelte';
  import { partnerState } from '../../state';

  import {
    getOffers,
    createOffer,
    getOfferYears,
    deleteOffer,
    copyOffer,
  } from '../../services/offer';
  import type { Offer } from '../../../server/types';
  import Loader from '../../components/Loader.svelte';
  import PageLoadIndicator from '../../components/PageLoadIndicator.svelte';

  const dateFormat = new Intl.DateTimeFormat();
  const { partners } = partnerState;

  let priceOffers: Offer[] = [];
  let years: number[] = [];
  let selectedYear: number = 0;

  async function loadOffers(year: number) {
    priceOffers = await getOffers(year);
  }

  async function newOffer() {
    await createOffer();
    await loadOffers(selectedYear);
  }

  async function handleCopy(offerId: string) {
    await copyOffer(offerId);
    await loadOffers(selectedYear);
  }

  async function handleDelete(offerId: string) {
    await deleteOffer(offerId);
    await loadOffers(selectedYear);
  }

  function partnerName(partnerId: string) {
    return $partners.find((p) => p.id === partnerId)?.name ?? '-';
  }

  onMount(async () => {
    years = await getOfferYears();
    selectedYear = years[0];
  });
</script>

<Loader params={selectedYear} loadFn={(year) => loadOffers(year)}>
  <PageLoadIndicator slot="pending" />
  <Layout>
    <section>
      <div class="flex justify-between pr-2 sticky top-0 bg-white">
        <h1 class="font-bold text-lg pb-2">{$t('offerList.title')}</h1>
        <div>
          {#if years.length > 1}
            {#each years as year}
              <button
                title={$t('offerList.labels.yearButton', { year })}
                aria-pressed={selectedYear === year}
                class="btn btn-sm ml-2"
                class:btn-primary={year === selectedYear}
                on:click={() => (selectedYear = year)}>{year}</button>
            {/each}
          {/if}
          <button
            class="ml-2 btn btn-sm btn-primary text-white"
            on:click={newOffer}>
            {$t('offerList.actions.add')}
          </button>
        </div>
      </div>

      <div class="flex justify-center">
        <ul class="flex flex-1 h-full flex-col py-2 px-4">
          {#each priceOffers as offer}
            <li
              class="flex justify-between border-b-2 px-4 py-3 hover:bg-gray-100">
              <Link to="/offer/{offer.id}" class="flex flex-col gap-1 w-full">
                <div class="flex gap-3 items-center">
                  <div class="text-teal-600 font-medium">
                    {offer.offerNumber}
                  </div>
                  <OfferStatusBadge status={offer.status} />
                </div>
                <div class="text-sm text-gray-500 flex items-center gap-1">
                  <span><Clock size={14} /></span>
                  <span>{dateFormat.format(offer.offerDate)}</span>
                  {#if offer.partnerId}
                    <span class="ml-1"><User size={14} /></span>
                    <span class="font-medium">
                      {partnerName(offer.partnerId)}
                    </span>
                  {/if}
                </div>
              </Link>
              <div class="flex gap-6 self-center text-sm">
                <Link to="/preview/{offer.id}" class="btn btn-sm" title={$t('offerList.actions.preview')}>
                  <PrinterIcon size={20}/>
                </Link>
                <button
                  class="btn btn-sm"
                  title={$t('offerList.actions.copy')}
                  on:click={() => handleCopy(offer.id)}>
                  <CopyPlus size={20} />
                </button>
                <button
                  class="btn btn-sm"
                  title={$t('offerList.actions.delete')}
                  on:click={() => handleDelete(offer.id)}>
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </section>
  </Layout>
</Loader>
