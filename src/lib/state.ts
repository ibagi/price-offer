import { derived, writable, type Readable, type Writable } from 'svelte/store';

export abstract class ResetableState<T> {
  private readonly _memo: T;
  private readonly _isDirty: Writable<boolean>;

  state: Writable<T>;
  isDirty: Readable<boolean>;

  constructor(initialState: T) {
    this._memo = initialState;
    this.state = writable(structuredClone(initialState));

    this._isDirty = writable(false);
    this.isDirty = derived(this._isDirty, (value) => value);

    // TODO: unsubscribe
    this.state.subscribe((_) => this._isDirty.set(true));
  }

  reset() {
    this.state.set(structuredClone(this._memo));
    this._isDirty.set(false);
  }
}
