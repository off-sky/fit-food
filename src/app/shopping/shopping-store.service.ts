import { Injectable } from '@angular/core';
import { ShoppingItem } from './types';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingListItem } from 'src/types';
import { map } from 'rxjs/operators';


interface ShoppingState {
  editedId: string;
  shoppingList: {
    [id: string]: ShoppingItem;
  }
}

const initialState: ShoppingState = {
  editedId: null,
  shoppingList: {}
}



@Injectable({
  providedIn: 'root'
})
export class ShoppingStoreService {

  private state$: BehaviorSubject<ShoppingState> = new BehaviorSubject<ShoppingState>(initialState);

  constructor() { }


  public list$(): Observable<ShoppingListItem[]> {
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

  public listCount$(): Observable<number> {
    return this.state$.asObservable()
      .pipe(
        map(state => state.shoppingList),
        map(shopList => Object.keys(shopList).length)
      );
  }


  public create(): void {
    const state = this.state$.value;
    const id = this.randomStr();
    const prevLength = Object.keys(state.shoppingList).length;
    const newState = {
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

  public edit(id: string): void {
    const newState = {
      ...this.state$.value,
      editedId: id
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

  public complete(id: string): void {
    const prevState = this.state$.value;
    const newState = {
      ...prevState,
      shoppingList: {
        ...prevState.shoppingList,
        [id]: {
          ...prevState.shoppingList[id],
          isCompleted: true
        }
      }
    } as ShoppingState;

    this.state$.next(newState);
  }


  public randomStr(): string {
    return '' + new Date().getTime();
  }
  


}
