<script lang="ts">
  import { t } from '../lib/i18n';

  type OnConfirmFn = (value: boolean) => () => void;

  let dialogRef: HTMLDialogElement | undefined = $state();
  let title = $state('');
  let message = $state('');
  let onConfirm: OnConfirmFn = $state(() => () => {});

  export function show(props: { title: string; message: string }) {
    title = props.title;
    message = props.message;
    dialogRef?.showModal();

    return new Promise<boolean>((resolve) => {
      onConfirm = (value: boolean) => () => {
        dialogRef?.close();
        resolve(value);
      };
    });
  }
</script>

<dialog class="modal" bind:this={dialogRef}>
  <div class="modal-box">
    <h3 class="font-bold text-lg">{title}</h3>
    <p class="py-4">{message}</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-neutral" onclick={onConfirm(true)}>
          {$t('confirmation.yes')}
        </button>
        <button class="btn" onclick={onConfirm(false)}>
          {$t('confirmation.cancel')}
        </button>
      </form>
    </div>
  </div>
</dialog>
