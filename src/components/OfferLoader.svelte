<script lang="ts">
  import { getOffer } from '../data/offer';
  import { OfferState } from '../state';

  export let offerId = '';
  let offerState: OfferState;

  $: loadOffer(offerId);

  function loadOffer(id: string) {
    if (id) {
      getOffer(id).then((data) => {
        offerState = new OfferState(data);
      });
    }
  }
</script>

{#if offerState}
  <slot {offerState} />
{:else}
  <h1>Loading...</h1>
{/if}
