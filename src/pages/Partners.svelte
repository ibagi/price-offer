<script lang="ts">
  import Layout from '../layouts/Layout.svelte';
  import { Trash2 } from 'lucide-svelte';

  import { t } from '../lib/i18n';
  import { savePartners } from '../services/partner';
  import { partnerState } from '../state';
  import SaveButton from '../components/SaveButton.svelte';

  const { partners, addPartner, removePartner } = partnerState;

  async function save() {
    await savePartners($partners);
  }
</script>

<Layout>
  <section class="flex flex-col h-full">
    <div class="flex justify-between pb-2">
      <h1 class="font-bold text-lg pb-2">{$t('partners.title')}</h1>
      <div class="flex gap-2">
        {#if $partners.length > 0}
          <button
            class="btn btn-primary btn-sm self-end text-white"
            on:click={addPartner}>{$t('partners.actions.add')}</button>
        {/if}
      </div>
    </div>

    {#if $partners.length === 0}
      <div class="flex h-full justify-center items-center">
        <div class="flex flex-col items-center gap-4">
          <p class="text-lg">{$t('partners.hint')}</p>
          <button class="btn btn-neutral btn-lg" on:click={addPartner}
            >{$t('partners.actions.addPartner')}</button>
        </div>
      </div>
    {/if}

    {#if $partners.length > 0}
      <div class="overflow-x-auto w-full">
        <table class="table">
          <thead>
            <tr>
              <th>{$t('partners.tableColumns.name')}</th>
              <th>{$t('partners.tableColumns.address')}</th>
              <th class="w-48">{$t('partners.tableColumns.companyNumber')}</th>
              <th class="w-48">{$t('partners.tableColumns.taxNumber')}</th>
              <th class="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {#each $partners as partner}
              <tr>
                <td>
                  <input
                    class="input input-sm input-bordered w-full"
                    type="text"
                    name="projectName"
                    bind:value={partner.name} />
                </td>
                <td>
                  <input
                    class="input input-sm input-bordered w-full"
                    type="text"
                    name="projectName"
                    bind:value={partner.address} />
                </td>
                <td>
                  <input
                    class="input input-sm input-bordered w-full"
                    type="text"
                    name="projectName"
                    bind:value={partner.companyNumber} />
                </td>
                <td>
                  <input
                    class="input input-sm input-bordered w-full"
                    type="text"
                    name="projectName"
                    bind:value={partner.taxNumber} />
                </td>
                <td>
                  <button
                    title={$t('partners.actions.delete')}
                    class="btn btn-sm"
                    on:click={() => removePartner(partner)}>
                    <Trash2 />
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </section>

  <section slot="actions" class="flex gap-2 justify-end border-t-2 pt-2">
    <SaveButton class="btn btn-neutral btn-sm" onSave={save}
      >{$t('partners.actions.save')}
    </SaveButton>
  </section>
</Layout>
