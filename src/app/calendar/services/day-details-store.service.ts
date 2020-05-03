import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum Meals {
  BREAKFAST = 0,
  SNACK_1 = 1,
  DINNER = 2,
  SNACK_2 = 3,
  SUPPER = 4
}

const state = {
  meals: [
    {
      id: Meals.BREAKFAST,
      displayLabel: 'Breakfast',
      dish: null
    },
    {
      id: Meals.SNACK_1,
      displayLabel: 'Snack',
      dish: null
    },
    {
      id: Meals.DINNER,
      displayLabel: 'Dinner',
      dish: null
    },
    {
      id: Meals.SNACK_2,
      displayLabel: 'Snack',
      dish: null
    },
    {
      id: Meals.SUPPER,
      displayLabel: 'Supper',
      dish: null
    },
  ]
};



@Injectable()
export class DayDetailsStoreService {

  private state$: BehaviorSubject<any> = new BehaviorSubject<any>(state);


  constructor() { }


  public dishes$(): Observable<any[]> {
    return this.state$.asObservable()
      .pipe(
        map(state => state.dishes)
      )
  }

  public meals$(): Observable<any[]> {
    return this.state$.asObservable()
      .pipe(
        map(state => state.meals)
      )
  }


  public empty$(): Observable<boolean> {
    return this.state$.asObservable()
      .pipe(
        map(state => state.meals.length === 0 || state.meals.every(d => !d.dish))
      )
  }

  public addDish(dish: any, selectedMeal: Meals): void {
    const state = this.state$.value;
    const newMeals = state.meals.map(meal => {
      if (meal.id === selectedMeal) {
        return {
          ...meal,
          dish: dish
        }
      } 
      return { ...meal }
    })
    this.state$.next({...state, meals: newMeals });
  }


  public clearDish(selectedMeal: Meals): void {
    const state = this.state$.value;
    const newMeals = state.meals.map(meal => {
      if (meal.id === selectedMeal) {
        return {
          ...meal,
          dish: null
        }
      } 
      return { ...meal }
    })
    this.state$.next({...state, meals: newMeals });
  }
}
