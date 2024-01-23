<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { offer, offerItems, netto, tax, brutto } from '../lib/store';

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
    <img height="150" width="250" src="logo.png" alt="Cég"/>
    <h1 class="flex-1 font-bold text-5xl">Árajánlat</h1>

    <button class="btn btn-sm btn-primary" class:no-print={saving} on:click={print}>
      Nyomtatás
    </button>
    <button class="btn btn-sm btn-neutral" class:no-print={saving}>
      <Link to="/">Vissza</Link>
    </button>
  </div>

  <div class="data-container px-6 py-2">
    <div class="flex pb-2 justify-between">
      <div class="text-sm"><i>Küldő/Von/From</i></div>
      <div class="flex-1"></div>
      <div class="text-sm"><i>Címzett/An/To</i></div>
    </div>

    <div class="font-bold text-lg">
      P-TOOL 
    </div>
    <div class="font-bold text-lg pb-4">
      Szerszámgyártó Kft.
    </div>

    <div class="flex text-md">
      <div class="w-48 font-bold">Mobiltelefon:</div>
      <div>+36 30 908 9291</div>
    </div>

    <div class="flex text-md">
      <div class="w-48 font-bold">E-mail:</div>
      <div>ptool.kft@gmail.com</div>
    </div>

    <div class="flex text-md">
      <div class="w-48 font-bold">Cím:</div>
      <div>2234 Maglód Ady Endre utca 25-39 5/B</div>
      <div class="flex-1"></div>
      <div class="w-48 font-bold">Cím:</div>
      <div></div>
    </div>

    <div class="flex text-md">
      <div class="w-48 font-bold">Cégjegyzéksz.:</div>
      <div>13-09-217197</div>
      <div class="flex-1"></div>
      <div class="w-48 font-bold">Cégjegyzéksz.:</div>
      <div></div>
    </div>

    <div class="flex text-md">
      <div class="w-48 font-bold">Adószám:</div>
      <div>27541706-2-13</div>
      <div class="flex-1"></div>
      <div class="w-48 font-bold">Adószám:</div>
      <div></div>
    </div>

    <div class="flex text-md">
      <div class="w-48 font-bold">Bankszámlaszám:</div>
      <div>12011739-01798762-00100009</div>
    </div>
  </div>

  <div class="flex justify-end pt-4">
    <div class="font-bold pr-6">Ajánlat száma:</div>
    <div class="font-bold border-full flex justify-center w-48">
      <span>{$offer.offerNumber}</span>
    </div>
  </div>

  <div class="font-bold text-2xl py-4">
    <i>Tisztelt Partnerünk!</i>
  </div>

  <div class="text-xl pb-6">
    Mellékelten küldjük a kért árajánlatot:
  </div>

  <table class="w-full">
    <thead>
      <tr>
        <th class="table-header" rowspan="2">Ajánlat száma</th>
        <th class="table-header" rowspan="2">Munka megnevezése</th>
        <th class="table-header" rowspan="2">Darab</th>
        <th class="table-header" rowspan="2">Ár/db</th>
        <th class="table-header" rowspan="2">Érték</th>
        <th class="table-header" colspan="2">Leírás, megjegyzések</th>
      </tr>
      <tr>
        <th class="table-header">Marás</th>
        <th class="table-header">Anyag</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="table-cell" rowspan={$offerItems.length + 1}>{$offer.offerNumber}</td>
      </tr>
      {#each $offerItems as item}
      <tr>
        <td class="table-cell">{item.name}</td>
        <td class="table-cell">{item.amount}</td>
        <td class="table-cell">{item.unitPrice}</td>
        <td class="table-cell">{item.unitPrice * item.amount} {$offer.currency}</td>
        <td class="table-cell">{item.workPrice} {$offer.currency}</td>
        <td class="table-cell">{item.materialPrice} {$offer.currency}</td>
      </tr>
      {/each}
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td class="font-bold px-2">Nettó: </td>
        <td class="font-bold px-2 text-right">{$netto} {$offer.currency}</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td class="font-bold px-2">ÁFA: </td>
        <td class="font-bold px-2 text-right">{$tax} {$offer.currency}</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td class="font-bold px-2 summary-underline">Bruttó: </td>
        <td class="font-bold px-2 summary-underline text-right">{$brutto} {$offer.currency}</td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>

  <div class="font-bold pb-6">
    Projekt megnevezése:
  </div>

  <div class="font-bold">
    Számlázás:
  </div>
  <div class="text-sm pb-2">
    Áfa: {$offer.taxRate * 100} %
  </div>

  <div class="font-bold">
    Ajánlat érvényessége:
  </div>
  <div class="text-sm pb-2">
    {$offer.validity} nap
  </div>

  <div class="pb-2">
    A további együttműködés reményében köszönjük megtisztelő megkeresését!
  </div>
  <div>
    {$offer.offerPlace}, {new Intl.DateTimeFormat().format($offer.offerDate)}
  </div>

  <div class="py-2 flex justify-end text-xl">
    Üdvözlettel: <strong class="px-1">Papp Zoltán</strong>
  </div>
</main>

<style>
  .no-print {
    display: none !important;
  }

  .data-container {
    background-color: #daeef3;
    border: 3px solid black;
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
    padding: .25rem;
    border: 3px solid black;
    background-color: #f2f2f2;
  }

  .summary-underline {
    border-bottom: 3px solid black;
  }
</style>
