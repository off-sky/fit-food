import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'r-drop-fill-indicator',
  templateUrl: './drop-fill-indicator.component.html',
  styleUrls: ['./drop-fill-indicator.component.scss']
})
export class DropFillIndicatorComponent implements OnInit, OnChanges {

  @Input() public filled: boolean[] = [];
  @Input() public selected: boolean;

  public isAnyFilled: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.isAnyFilled = this.filled.some(v => !!v);
  }

}
