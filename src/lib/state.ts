import {
  derived,
  writable,
  type Readable,
  type Unsubscriber,
  type Writable,
} from 'svelte/store';

function compareAsJsons<T>(a: T, b: T) {
  return JSON.stringify(a) === JSON.stringify(b);
}

interface StateOptions<T> {
  initialState: T;
  comparator?: (a: T, b: T) => boolean;
}

export abstract class State<T> {
  private readonly _memo: T;
  private _edited = false;

  state: Writable<T>;
  isDirty: Readable<boolean>;

  isDirtySubscription: Unsubscriber;

  constructor(options: StateOptions<T>) {
    this._memo = options.initialState;
    this.state = writable(structuredClone(options.initialState));

    this.isDirty = derived(this.state, (value) => {
      if (this._edited) {
        return true;
      }

      const comparator = options.comparator ?? compareAsJsons;
      return !comparator(this._memo, value);
    });

    this.isDirtySubscription = this.isDirty.subscribe((dirty) => {
      if (dirty && !this._edited) {
        this._edited = true;
      }
    });
  }

  cleanup() {
    if (this.isDirtySubscription) {
      this.isDirtySubscription();
    }
  }
}
