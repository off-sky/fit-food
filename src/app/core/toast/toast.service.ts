import { Injectable } from '@angular/core';
import { ToastOptions } from './toast-options';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ToastComponent } from './toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public readonly CLOSE_TIMEOUT = 3000;
  private currCloseTimer;
  private openSubj: Subject<ToastOptions> = new Subject<ToastOptions>();

  constructor() {
    this.openSubj.asObservable()
      .pipe(
        filter(opts => !!opts)
      )
      .subscribe(opts => {
        if (this.currCloseTimer) {
          clearTimeout(this.currCloseTimer);
          this.currCloseTimer = undefined;
        }
        ToastComponent.openToast(opts);
        this.currCloseTimer = setTimeout(() => {
          ToastComponent.openToast({ text: null })
        }, this.CLOSE_TIMEOUT);
      })
  }

  public openToast(text: string): void {
    this.openSubj.next({ text });
  }

}
