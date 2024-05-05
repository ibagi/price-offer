<script lang="ts">
  import { t } from '../lib/i18n';
  import { contactState } from '../state';
  import { saveContact } from '../services/contact';
  import Layout from '../layouts/Layout.svelte';
  import type { Contact } from '../../server/types';
  import SaveButton from '../components/SaveButton.svelte';

  type Field = keyof Contact;
  const fields: Field[] = [
    'title',
    'subtitle',
    'phone',
    'email',
    'address',
    'companyNumber',
    'taxNumber',
    'person',
  ];

  const { contact } = contactState;

  async function save() {
    await saveContact($contact);
  }
</script>

<Layout>
  <section class="flex flex-col">
    <h1 class="font-bold text-lg pb-2">{$t('company.title')}</h1>
    <div class="flex flex-col gap-2 self-center">
      {#each fields as field}
        <div class="flex items-center w-full">
          <label class="font-medium label text-sm w-36" for={field}>
            {$t(`company.labels.${field}`)}
          </label>
          <input
            id={field}
            class="input input-sm input-bordered w-96"
            type="text"
            name={field}
            bind:value={$contact[field]} />
        </div>
      {/each}
    </div>
  </section>

  <section slot="actions" class="flex gap-2 justify-end border-t-2 pt-2">
    <SaveButton class="btn btn-neutral btn-sm" onSave={save}
      >{$t('company.actions.save')}
    </SaveButton>
  </section>
</Layout>
