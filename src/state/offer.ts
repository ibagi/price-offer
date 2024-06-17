import { derived, type Readable } from 'svelte/store';
import * as prices from '../lib/prices';
import {
  defaultOffer,
  defaultOfferItem,
  type Offer,
  type OfferItem,
} from '../../server/types';
import { State } from '../lib/state';

export class OfferState extends State<Offer> {
  hasItem: Readable<boolean>;
  netto: Readable<number>;
  tax: Readable<number>;
  brutto: Readable<number>;

  get offer() {
    return this.state;
  }

  constructor(from: Offer | null = null) {
    super({
      initialState: from ?? { ...defaultOffer },
    });

    this.netto = derived([this.offer], ([$offer]) =>
      prices.netto(($offer.items ?? []).map(this.totalPrice), $offer.currency),
    );

    this.tax = derived([this.offer, this.netto], ([$offer, $netto]) =>
      prices.tax($netto, $offer.taxRate, $offer.currency),
    );

    this.brutto = derived(
      [this.netto, this.tax],
      ([$netto, $tax]) => $netto + $tax,
    );
    this.hasItem = derived(
      this.offer,
      ($offer) => ($offer.items?.length ?? 0) > 0,
    );
  }

  addItem = () => {
    this.offer.update(($offer) => ({
      ...$offer,
      items: [...($offer.items ?? []), { ...defaultOfferItem }],
    }));
  };

  removeItem = (item: OfferItem) => {
    this.offer.update(($offer) => ({
      ...$offer,
      items: $offer.items?.filter((i) => i !== item) ?? [],
    }));
  };

  removeItems = () => {
    this.offer.update(($offer) => ({
      ...$offer,
      items: [],
    }));
  };

  update = (update: Partial<Offer>) => {
    this.offer.update(($offer) => ({
      ...$offer,
      ...update,
    }));
  };

  totalPrice(item: OfferItem) {
    return (item.materialPrice + item.workPrice) * item.amount;
  }
}
