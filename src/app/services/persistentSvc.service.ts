import { Injectable, WritableSignal, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistentSvc {
  private storeKey = 'store';

  private saveStore(store: any): void {
    localStorage.setItem(this.storeKey, JSON.stringify(store));
  }

  private getStore(): any {
    const store = localStorage.getItem(this.storeKey);
    return store ? JSON.parse(store) : {};
  }

  PSignal<T>(key: string, initialState: T): WritableSignal<T> {
    const store = this.getStore();
    const SignalState = signal<T>(
      store[key] !== undefined ? store[key] : initialState
    );

    effect(() => {
      const newState = SignalState();
      const currentStore = this.getStore();
      currentStore[key] = newState;
      this.saveStore(currentStore);
    });

    return SignalState;
  }
}
