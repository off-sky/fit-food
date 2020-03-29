import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastOptions } from '../toast-options';

@Component({
  selector: 'r-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  public static openToast(opts: ToastOptions): void {
    ToastComponent.currToast$.next(opts);
  }
  private static currToast$: Subject<ToastOptions> = new Subject<ToastOptions>();

  public text$: Observable<string>;

  constructor() { }

  ngOnInit(): void {
    this.text$ = ToastComponent.currToast$.asObservable()
      .pipe(
        map(opts => opts.text || null)
      )
  }

}
