<script lang="ts">
  import type { OfferStatus } from '../../lib/types';
  import { t } from '../../lib/i18n';

  export let status: OfferStatus;

  type ClassMap = Record<OfferStatus, string>;

  const bgColors: ClassMap = {
    created: 'bg-slate-100',
    sent: 'bg-slate-500',
    accepted: 'bg-emerald-500',
    rejected: 'bg-red-500',
  };

  const colors: ClassMap = {
    created: 'text-gray-600',
    sent: 'text-white',
    accepted: 'text-white',
    rejected: 'text-white',
  };
</script>

<div
  class="text-sm text-center w-24 rounded {bgColors[status]} {colors[status]}">
  {$t(`offer.status.${status}`)}
</div>
