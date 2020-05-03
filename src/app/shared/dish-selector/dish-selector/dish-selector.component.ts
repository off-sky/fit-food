import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { DishSelectorStoreService } from '../dish-selector-store.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'r-dish-selector',
  templateUrl: './dish-selector.component.html',
  styleUrls: ['./dish-selector.component.scss'],
  providers: [ DishSelectorStoreService ]
})
export class DishSelectorComponent implements OnInit {

  public dishes$: Observable<any[]>;
  public selectedChanged$: Observable<number>;

  @Output() public selectedChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private store: DishSelectorStoreService
  ) { }

  ngOnInit(): void {
    this.dishes$ = this.store.dishes$();
    this.selectedChanged$ = this.store.selectedChanged()
      .pipe(
        tap(val => this.selectedChanged.emit(val))
      );
  }


  public onSelect(dish: number): void {
    this.store.select(dish);
  }

}
