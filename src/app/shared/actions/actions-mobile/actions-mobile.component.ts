import { Component, OnInit, Input } from '@angular/core';
import { Action } from '..';

@Component({
  selector: 'r-actions-mobile',
  templateUrl: './actions-mobile.component.html',
  styleUrls: ['./actions-mobile.component.scss']
})
export class ActionsMobileComponent implements OnInit {

  @Input() public actions: Action[];

  constructor() { }

  ngOnInit(): void {
  }

  public onActionClick(action: Action): void {
    action.callback();
  }

}
