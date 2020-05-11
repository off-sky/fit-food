import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

interface State {
  items: string[];
  collapsed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RecentItemService {

  private state$: BehaviorSubject<State> = new BehaviorSubject<State>({ items: [], collapsed: true });

  constructor() { }

  public add(id: string): void {
    const state = this.state$.value;
    state.items.push(id);
    this.state$.next(state);
  }

  public remove(id: string): void {
    const state = this.state$.value;
    const items = state.items.filter(item => item !== id);
    this.state$.next({...state, items });
  }

  public list(): Observable<string[]> {
    return this.state$.asObservable()
      .pipe(
        map(state => state.items)
      )
  }

  public collapsed(): Observable<boolean> {
    return this.state$.asObservable()
      .pipe(
        map(state => state.collapsed)
      )
  }

  public toggleCollapsed(): void {
      const state = this.state$.value;
      this.state$.next({...state, collapsed: !state.collapsed });
  }


}
