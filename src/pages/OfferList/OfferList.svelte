<script lang="ts">
  import { onMount } from 'svelte';
  import { Link } from 'svelte-navigator';
  import { ArrowUpLeftFromSquareIcon, CopyPlus, Trash2 } from 'lucide-svelte';
  import { t } from '../../lib/i18n';
  import { type Offer } from '../../lib/types';
  import Layout from '../../layouts/Layout.svelte';
  import OfferStatusBadge from './OfferStatusBadge.svelte';

  import {
    getOffers,
    createOffer,
    getOfferYears,
    deleteOffer,
    copyOffer,
  } from '../../services/offer';

  const dateFormat = new Intl.DateTimeFormat();

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

  onMount(async () => {
    years = await getOfferYears();
    selectedYear = years[0];
  });

  $: loadOffers(selectedYear);
</script>

<Layout>
  <section slot="right">
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
        <button class="ml-2 btn btn-sm btn-neutral" on:click={newOffer}>
          {$t('offerList.actions.add')}
        </button>
      </div>
    </div>

    <div class="flex justify-center">
      <ul class="flex flex-1 h-full flex-col gap-3 py-2 px-4">
        {#each priceOffers as offer}
          <li class="flex justify-between border-b-2 px-4 pb-2">
            <div class="flex flex-col gap-1">
              <div class="flex gap-3 items-center">
                <div class="text-teal-600 font-medium">{offer.offerNumber}</div>
                <OfferStatusBadge status={offer.status} />
              </div>
              <div class="text-sm text-gray-500">
                {dateFormat.format(offer.offerDate)}
              </div>
            </div>
            <div class="flex gap-6 self-center text-sm">
              <Link title={$t('offerList.actions.open')} to="/offer/{offer.id}">
                <ArrowUpLeftFromSquareIcon size={20} />
              </Link>
              <button
                title={$t('offerList.actions.copy')}
                on:click={() => handleCopy(offer.id)}>
                <CopyPlus size={20} />
              </button>
              <button
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
