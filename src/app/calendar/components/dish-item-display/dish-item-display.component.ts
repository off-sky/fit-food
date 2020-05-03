import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'r-dish-item-display',
  templateUrl: './dish-item-display.component.html',
  styleUrls: ['./dish-item-display.component.scss']
})
export class DishItemDisplayComponent implements OnInit {

  @Input() public meal: any;
  @Input() public number: number;
  @Output() public mealClearClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  public onRemoveClick(): void {
    this.mealClearClicked.emit(this.meal.id);
  }

}
