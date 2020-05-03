import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'r-no-dishes-for-day',
  templateUrl: './no-dishes-for-day.component.html',
  styleUrls: ['./no-dishes-for-day.component.scss']
})
export class NoDishesForDayComponent implements OnInit {

  @Output() public addClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public onAddClicked(): void {
    this.addClicked.emit();
  }

}
