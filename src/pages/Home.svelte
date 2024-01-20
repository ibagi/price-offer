<script lang="ts">
  import { Link } from 'svelte-navigator';

  import CardLayout from '../layouts/CardLayout.svelte';
  import { t } from '../lib/i18n';
  import {
    offerItems,
    hasItem,
    netto,
    brutto,
    partners,
    selectedPartner,
    selectedProject,
    addItem,
    removeItem,
    removeItems,
  } from '../lib/store';
</script>

<CardLayout>
  <section slot="left" class="w-64">
    <h1 class="font-bold text-xl pb-2" tabindex="-1">
      {$t('home.title')}
    </h1>

    <form on:submit={(e) => e.preventDefault()}>
      <label class="font-medium label" for="project"
        >{$t('home.labels.project')}
      </label>
      <input
        id="project"
        placeholder="A projekt neve"
        class="input input-sm input-bordered w-full max-w-xs"
        type="text"
        name="project"
        bind:value={$selectedProject} />

      <label class="font-medium label" for="partner">
        {$t('home.labels.partner')}
      </label>
      <select
        id="partner"
        class="select select-sm select-bordered w-full max-w-xs"
        name="partner"
        bind:value={$selectedPartner}>
        {#each $partners as partner}
          <option value={partner}>{partner}</option>
        {/each}
      </select>
    </form>
  </section>

  <section slot="right">
    <div class="flex gap-4">
      <h2 class="card-title flex-1" tabindex="-1">
        {$t('home.tableHeader')}
      </h2>
      <button class="btn btn-sm" on:click={removeItems}
        >{$t('home.actions.clearAll')}</button>
      <button class="btn btn-sm" on:click={addItem}
        >{$t('home.actions.add')}</button>
    </div>

    {#if $hasItem}
      <div class="overflow-x-auto w-full">
        <table class="table">
          <thead>
            <tr>
              <th>{$t('home.tableColumns.item')}</th>
              <th>{$t('home.tableColumns.unitPrice')}</th>
              <th>{$t('home.tableColumns.amount')}</th>
              <th>{$t('home.tableColumns.total')}</th>
              <th class="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {#each $offerItems as item}
              <tr>
                <td
                  ><input
                    class="input input-bordered input-sm w-full max-w-xs"
                    bind:value={item.name} /></td>
                <td
                  ><input
                    type="number"
                    class="input input-bordered input-sm w-full max-w-xs text-right"
                    bind:value={item.unitPrice} /></td>
                <td
                  ><input
                    type="number"
                    class="input input-bordered input-sm text-right"
                    bind:value={item.amount} /></td>
                <td>{item.amount * item.unitPrice}</td>
                <td>
                  <button class="btn btn-sm" on:click={() => removeItem(item)}>
                    {$t('home.actions.delete')}
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="divider"></div>
      <div class="flex justify-end gap-2">
        <strong>{$t('home.summary.netto', { netto: $netto })}</strong>
        <strong
          >{$t('home.summary.brutto', {
            brutto: $brutto,
          })}</strong>
      </div>
      <div class="flex justify-end"></div>
    {/if}

    {#if !$hasItem}
      <p class="flex justify-center items-center h-32">
        {$t('home.hint')}
      </p>
    {/if}
  </section>

  <section slot="actions" class="pt-3">
    <button class="btn btn-neutral" disabled={!$hasItem}>
      <Link to="/preview">{$t('home.actions.preview')}</Link>
    </button>
  </section>
</CardLayout>
