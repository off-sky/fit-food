import { Component, OnInit, Input } from '@angular/core';
import { Action } from '..';

@Component({
  selector: 'r-actions-desktop',
  templateUrl: './actions-desktop.component.html',
  styleUrls: ['./actions-desktop.component.scss']
})
export class ActionsDesktopComponent implements OnInit {

  @Input() public actions: Action[];

  constructor() { }

  ngOnInit(): void {
  }

  public onActionClick(action: Action): void {
    action.callback();
  }

}
