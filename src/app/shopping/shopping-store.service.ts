import { Injectable } from '@angular/core';
import { ShoppingItem } from './types';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { ShoppingListItem } from 'src/types';
import { map } from 'rxjs/operators';


interface ShoppingState {
  editedId: string;
  isHideCompleted: boolean;
  shoppingList: {
    [id: string]: ShoppingItem;
  }
}

const initialState: ShoppingState = {
  editedId: null,
  isHideCompleted: false,
  shoppingList: {}
}



@Injectable({
  providedIn: 'root'
})
export class ShoppingStoreService {

  private state$: BehaviorSubject<ShoppingState> = new BehaviorSubject<ShoppingState>(initialState);

  constructor() { }

  public empty$(): Observable<boolean> {
    return this.state$.asObservable()
      .pipe(
        map(state => state.shoppingList),
        map(sl => Object.keys(sl).length === 0)
      )
  }

  public clearAll(): void {
    const state = this.state$.value;
    this.state$.next({
      ...state,
      shoppingList: {}
    })
  }


  public completedCount$(): Observable<number> {
    return this.listAll$()
      .pipe(
        map(items => {
          return items.reduce((prev, curr) => {
            if (curr.isCompleted) {
              return prev + 1
            }
            return prev;
          }, 0)
        })
      )
  }


  public notCompletedCount$(): Observable<number> {
    return this.listAll$()
      .pipe(
        map(items => {
          return items.reduce((prev, curr) => {
            if (!curr.isCompleted) {
              return prev + 1
            }
            return prev;
          }, 0)
        })
      )
  }

  public list$(): Observable<ShoppingListItem[]> {
    const list$ = this.listAll$();
    const isCompletedHidden$ = this.isCompletedHidden$();

    return combineLatest([
      list$,
      isCompletedHidden$
    ])
    .pipe(
      map(([items, isCompletedHidden]) => {
        if (!isCompletedHidden) {
          return items;
        } else {
          return items.filter(i => !i.isCompleted)
        }
      })
    )
  }


  public listAll$(): Observable<ShoppingListItem[]> {
    return this.state$.asObservable()
      .pipe(
        map(state => state.shoppingList),
        map(shopList => {
          const list = Object.keys(shopList)
            .map(key => shopList[key]);
          list.sort((a, b) => a.sequence - b.sequence);
          return list;
        })
      );
  }

  public isCompletedHidden$(): Observable<boolean> {
    return this.state$.asObservable()
      .pipe(
        map(state => state.isHideCompleted)
      )
  }

  public listCount$(): Observable<number> {
    return this.state$.asObservable()
      .pipe(
        map(state => state.shoppingList),
        map(shopList => Object.keys(shopList).length)
      );
  }

  public remove(id: string): void {
    const state = this.state$.value;
    const list = state.shoppingList;
    delete list[id];
    const newState = {
      ...state,
      shoppingList: {
        ...list
      }
    }
    this.state$.next(newState);
  }


  public create(): void {
    const state = this.state$.value;
    const id = this.randomStr();
    const prevLength = Object.keys(state.shoppingList).length;
    const newState = {
      ...state,
      editedId: id,
      shoppingList: {
        ...state.shoppingList,
        [id]: {
          id,
          displayName: '',
          sequence: prevLength,
          isCompleted: false
        }
      }
    } as ShoppingState;
    this.state$.next(newState);
  }

  public createFromExisting(id: string, displayName: string): void {
    const state = this.state$.value;
    const prevLength = Object.keys(state.shoppingList).length;
    const newState = {
      ...state,
      shoppingList: {
        ...state.shoppingList,
        [id]: {
          id,
          displayName,
          sequence: prevLength,
          isCompleted: false
        }
      }
    } as ShoppingState;
    this.state$.next(newState);
  }

  public edit(id: string): void {
    const newState = {
      ...this.state$.value,
      editedId: id
    };
    this.state$.next(newState);
  }


  public editedId$(): Observable<string> {
    return this.state$.asObservable()
      .pipe(
        map(state => state.editedId)
      )
  }

  public closeEdit(): void {
    const newState = {
      ...this.state$.value,
      editedId: null
    };
    this.state$.next(newState);
  }


  public saveChanges(id: string, updated: ShoppingListItem): void {
    const prevState = this.state$.value;
    const newState = {
      ...prevState,
      shoppingList: {
        ...prevState.shoppingList,
        [id]: {
          ...prevState.shoppingList[id],
          ...updated
        }
      }
    } as ShoppingState;

    this.state$.next(newState);
  }

  public toggleCompleted(id: string): void {
    const prevState = this.state$.value;
    const itemCompleted = prevState.shoppingList[id].isCompleted;
    const newState = {
      ...prevState,
      shoppingList: {
        ...prevState.shoppingList,
        [id]: {
          ...prevState.shoppingList[id],
          isCompleted: !itemCompleted
        }
      }
    } as ShoppingState;

    this.state$.next(newState);
  }

  public toggleHideCompleted(): void {
    const state = this.state$.value;
    const isHidden = state.isHideCompleted;
    const newState = {
      ...state,
      isHideCompleted: !isHidden
    };
    this.state$.next(newState);
  }


  public randomStr(): string {
    return '' + new Date().getTime();
  }
  


}
