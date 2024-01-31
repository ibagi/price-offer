<script lang="ts">
  import Layout from '../layouts/Layout.svelte';
  import { saveState } from '../lib/db';
  import { t } from '../lib/i18n';

  import { contact } from '../lib/state';
  import type { Contact } from '../lib/types';

  type Field = keyof Contact;

  const fields: Field[] = [
    'title',
    'subtitle',
    'phone',
    'email',
    'address',
    'companyNumber',
    'taxNumber',
    'bankAccountNumber',
    'person',
  ];

  function saveChanges(update: Contact) {
    saveState({ contact: update });
  }

  $: saveChanges($contact);
</script>

<Layout>
  <section slot="right" class="flex flex-col gap-2 self-center">
    {#each fields as field}
      <div class="flex items-center w-full">
        <label class="font-medium label w-52" for={field}>
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
  </section>
</Layout>
