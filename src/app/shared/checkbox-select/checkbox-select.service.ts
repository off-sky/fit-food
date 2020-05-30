import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckboxSelectService {

  private state$: BehaviorSubject<{ selected: string}> = new BehaviorSubject<any>({ selected: null });

  constructor() { }

  public toggleSelect(value: string): void {
    const selected = this.state$.value.selected;
    if (selected === value) {
      this.state$.next({
        ...this.state$.value,
        selected: null
      });
    } else {
      this.state$.next({
        ...this.state$.value,
        selected: value
      });
    }
  }

  public selected$(): Observable<string> {
    return this.state$.asObservable()
      .pipe(
        map(state => state.selected)
      )
  }
}
