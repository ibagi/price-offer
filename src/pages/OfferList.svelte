<script lang="ts">
  import { onMount } from 'svelte';
  import { Link } from 'svelte-navigator';
  import { ArrowUpLeftFromSquareIcon } from 'lucide-svelte';
  import { t } from '../lib/i18n';
  import { type Offer } from '../lib/types';
  import Layout from '../layouts/Layout.svelte';
  import { getOffers, createOffer } from '../data/offer';

  const dateFormat = new Intl.DateTimeFormat();
  let priceOffers: Offer[] = [];

  async function newOffer() {
    await createOffer();
    priceOffers = await getOffers();
  }

  onMount(async () => {
    priceOffers = await getOffers();
  });
</script>

<Layout>
  <section slot="right">
    <div class="flex justify-between pr-2 sticky top-0 bg-white">
      <h1 class="font-bold text-lg pb-2">{$t('priceOfferList.title')}</h1>
      <button class="btn btn-sm btn-neutral" on:click={newOffer}>
        Hozzáadás
      </button>
    </div>

    <div class="flex justify-center">
      <ul class="flex flex-1 h-full flex-col gap-3 py-2 px-4">
        {#each priceOffers as offer}
          <li class="flex justify-between border-b-2 px-4 py-2">
            <div class="flex flex-col gap-1">
              <div class="flex gap-2 items-center font-medium">
                <div class="text-teal-600">{offer.offerNumber}</div>
                <div
                  class="text-sm text-gray-600 bg-gray-100 border text-center w-24 rounded">
                  {$t(`offer.status.${offer.status}`)}
                </div>
              </div>
              <div class="text-sm text-gray-500">
                {dateFormat.format(offer.offerDate)}
              </div>
            </div>
            <div>
              <Link to="/offer/{offer.id}">
                <ArrowUpLeftFromSquareIcon />
              </Link>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </section>
</Layout>
