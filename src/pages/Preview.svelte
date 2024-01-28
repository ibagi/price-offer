<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { t } from '../lib/i18n';
  import {
    contact,
    partner,
    offer,
    offerItems,
    netto,
    taxRate,
    tax,
    brutto,
    totalPrice,
  } from '../lib/state';

  let saving = false;

  function print(e: MouseEvent) {
    e.preventDefault();
    saving = true;

    window.requestAnimationFrame(() => {
      window.print();
      saving = false;
    });
  }
</script>

<main class="max-w-7xl mx-auto">
  <div class="flex items-center gap-2">
    <img height="100" width="200" src="logo.png" alt="Cég" />
    <h1 class="flex-1 font-bold text-4xl">
      {$t('preview.title')}
    </h1>
    <button class="btn btn-sm btn-neutral" class:no-print={saving}>
      <Link to="/">{$t('preview.actions.back')}</Link>
    </button>
    <button
      class="btn btn-sm btn-primary"
      class:no-print={saving}
      on:click={print}>
      {$t('preview.actions.print')}
    </button>
  </div>

  <div class="data-container px-6 py-2 text-md">
    <div class="flex pb-2 justify-between">
      <div class="flex flex-1 justify-center">
        <div class="text-sm"><i>{$t('preview.labels.from')}</i></div>
      </div>
      <div class="flex flex-1 justify-center">
        <div class="text-sm"><i>{$t('preview.labels.to')}</i></div>
      </div>
    </div>

    <div class="font-bold text-lg">
      {$contact.title}
    </div>
    <div class="font-bold text-lg pb-4">
      {$contact.subtitle}
    </div>

    <div class="flex">
      <div class="w-36 font-bold">{$t('preview.labels.phone')}</div>
      <div>{$contact.phone}</div>
    </div>

    <div class="flex">
      <div class="w-36 font-bold">{$t('preview.labels.email')}</div>
      <div>{$contact.email}</div>
    </div>

    <div class="flex">
      <div class="flex flex-1">
        <div class="w-36 font-bold">{$t('preview.labels.address')}</div>
        <div>{$contact.address}</div>
      </div>

      <div class="flex flex-1">
        <div class="w-36 font-bold">{$t('preview.labels.address')}</div>
        <div>{$partner.address}</div>
      </div>
    </div>

    <div class="flex">
      <div class="flex flex-1">
        <div class="w-36 font-bold">{$t('preview.labels.companyNumber')}</div>
        <div>{$contact.companyNumber}</div>
      </div>
      <div class="flex flex-1">
        <div class="w-36 font-bold">{$t('preview.labels.companyNumber')}</div>
        <div>{$partner.companyNumber}</div>
      </div>
    </div>

    <div class="flex">
      <div class="flex flex-1">
        <div class="w-36 font-bold">{$t('preview.labels.taxNumber')}</div>
        <div>{$contact.taxNumber}</div>
      </div>

      <div class="flex flex-1">
        <div class="w-36 font-bold">{$t('preview.labels.taxNumber')}</div>
        <div>{$partner.taxNumber}</div>
      </div>

    </div>

    <div class="flex">
      <div class="w-36 font-bold">{$t('preview.labels.bankAccountNumber')}</div>
      <div>{$contact.bankAccountNumber}</div>
    </div>
  </div>

  <div class="flex justify-end pt-4">
    <div class="font-bold pr-6 underline">{$t('preview.labels.offerNumber')}</div>
    <div class="font-bold border-full flex justify-center w-48">
      <span>{$offer.offerNumber}</span>
    </div>
  </div>

  <div class="font-bold text-xl py-4">
    <i>{$t('preview.greeting')}</i>
  </div>

  <div class="text-lg pb-6">{$t('preview.tableLabel')}</div>

  <table class="w-full">
    <thead>
      <tr>
        <th class="table-header" rowspan="2"
          >{$t('preview.table.offerNumber')}</th>
        <th class="table-header" rowspan="2">{$t('preview.table.itemName')}</th>
        <th class="table-header" rowspan="2">{$t('preview.table.amount')}</th>
        <th class="table-header" rowspan="2"
          >{$t('preview.table.unitPrice')}</th>
        <th class="table-header" rowspan="2">{$t('preview.table.price')}</th>
        <th class="table-header" colspan="2"
          >{$t('preview.table.description')}</th>
      </tr>
      <tr>
        <th class="table-header">{$t('preview.table.workPrice')}</th>
        <th class="table-header">{$t('preview.table.materialPrice')}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="table-cell" rowspan={$offerItems.length + 1}
          >{$offer.offerNumber}</td>
      </tr>
      {#each $offerItems as item}
        <tr>
          <td class="table-cell">{item.name}</td>
          <td class="table-cell">{item.amount}</td>
          <td class="table-cell">{item.workPrice + item.materialPrice}</td>
          <td class="table-cell">{totalPrice(item)} {$offer.currency}</td>
          <td class="table-cell">{item.workPrice} {$offer.currency}</td>
          <td class="table-cell">{item.materialPrice} {$offer.currency}</td>
        </tr>
      {/each}
      <tr>
        <td colspan="3"></td>
        <td class="font-bold px-2">{$t('preview.table.netto')}</td>
        <td class="font-bold px-2 text-right">{$netto} {$offer.currency}</td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td colspan="3"></td>
        <td class="font-bold px-2">{$t('preview.table.tax')}</td>
        <td class="font-bold px-2 text-right">{$tax} {$offer.currency}</td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td colspan="3"></td>
        <td class="font-bold px-2 summary-underline"
          >{$t('preview.table.brutto')}</td>
        <td class="font-bold px-2 summary-underline text-right"
          >{$brutto} {$offer.currency}</td>
        <td colspan="2"></td>
      </tr>
    </tbody>
  </table>

  <div class="font-bold">{$t('preview.labels.project')}</div>
  <div class="text-sm pb-2">
    {$offer.projectName}
  </div>

  <div class="font-bold">{$t('preview.labels.taxation')}</div>
  <div class="text-sm pb-2">
    {$t('preview.fields.taxation', { tax: $taxRate })}
  </div>

  <div class="font-bold">{$t('preview.labels.validity')}</div>
  <div class="text-sm pb-2">
    {$t('preview.fields.validity', { days: $offer.validity })}
  </div>

  <div class="pb-2">
    {$t('preview.farawell')}
  </div>
  <div>
    {$offer.offerPlace}, {Intl.DateTimeFormat().format($offer.offerDate)}
  </div>

  <div class="py-2 flex justify-end text-xl">
    {$t('preview.regards')}<strong class="px-1">{$contact.person}</strong>
  </div>
</main>

<style>
  .no-print {
    display: none !important;
  }

  .data-container {
    background-color: #daeef3;
    border: 3px double black;
  }

  .border-full {
    border: 3px solid black;
  }

  .table-header {
    font-weight: bold !important;
    background-color: #daeef3;
    border: 3px solid black;
  }

  .table-cell {
    font-weight: bold;
    text-align: center;
    padding: 0.25rem;
    border: 3px solid black;
    background-color: #f2f2f2;
  }

  .summary-underline {
    border-bottom: 3px solid black;
  }
</style>
