import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'r-dish-item-edit',
  templateUrl: './dish-item-edit.component.html',
  styleUrls: ['./dish-item-edit.component.scss']
})
export class DishItemEditComponent implements OnInit {

  @Input() public number: number;
  @Input() public meal: any;

  @Output() public mealEditClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() public mealClearClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  public onEditMealClicked(): void {
    this.mealEditClicked.emit(this.meal.id);
  }

  public onClearMealClicked(): void {
    this.mealClearClicked.emit(this.meal.id);
  }

}
