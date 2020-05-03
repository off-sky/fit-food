import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';

export interface DishSelectorState {
  dishes: any[],
  selected: number,
}

const state: DishSelectorState = {
  dishes: [1, 2, 3, 4, 5, 6, 7],
  selected: null
}

@Injectable()
export class DishSelectorStoreService {

  private state$: BehaviorSubject<DishSelectorState> = new BehaviorSubject<DishSelectorState>(state);


  constructor() { }

  public dishes$(): Observable<any[]> {
    return this.state$.asObservable()
      .pipe(
        map(state => state.dishes)
      )
  }

  public select(dish: number): void {
    this.state$.next({ ...this.state$.value, selected: dish });
  }

  public selectedChanged(): Observable<number> {
    return this.state$.asObservable()
      .pipe(
        map(state => state.selected),
        filter(state => state !== null),
        distinctUntilChanged()
      )
  }
}
