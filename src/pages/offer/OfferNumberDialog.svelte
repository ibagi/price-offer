<script lang="ts">
  import type { TRPCClientError } from '@trpc/client';
  import { t } from '../../lib/i18n';
  import {
    generateOfferNumber,
    offerNumberPrefix,
    type Offer,
  } from '../../lib/types';
  import { updateOffer } from '../../services/offer';
  import type { OfferState } from '../../state';

  export let offerState: OfferState;
  const { offer } = offerState;

  let dialogRef: HTMLDialogElement;
  let offerDate = new Date();
  let sequence: number;

  let error: TRPCClientError<any> | null;

  async function save(e: Event, offer: Offer) {
    e.preventDefault();

    error = null;
    const offerNumber = generateOfferNumber(sequence);
    error = await updateOffer({ ...offer, offerNumber });

    if (!error) {
      offerState.update({ offerNumber });
      dialogRef?.close();
    }
  }

  function cancel() {
    dialogRef?.close();
  }

  export function show(offerDate: Date, seq: number) {
    offerDate = offerDate;
    sequence = seq;
    dialogRef?.showModal();
  }
</script>

<dialog class="modal" bind:this={dialogRef}>
  <form method="dialog">
    <div class="modal-box w-96">
      <h3 class="font-bold text-lg">
        {$t('priceOffer.offerNumberDialog.title')}
      </h3>
      <div class="pt-6 flex gap-1 items-center justify-center">
        <label for="sequence" class="font-bold text-lg text-teal-600"
          >{offerNumberPrefix(offerDate)}</label>
        <input
          id="sequence"
          class="input input-bordered input-sm w-24 text-lg"
          type="number"
          name="sequence"
          bind:value={sequence} />
      </div>
      <div class="modal-action">
        {#if error}
          <div class="flex items-center text-red-500 text-sm pr-1">
            {$t(`errors.${error.message}`)}
          </div>
        {/if}
        <button class="btn btn-neutral" on:click={(e) => save(e, $offer)}
          >{$t('priceOffer.actions.save')}</button>
        <button class="btn" on:click={cancel}>
          {$t('confirmation.cancel')}
        </button>
      </div>
    </div>
  </form>
</dialog>
