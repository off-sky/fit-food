import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'r-recent-item',
  templateUrl: './recent-item.component.html',
  styleUrls: ['./recent-item.component.scss']
})
export class RecentItemComponent implements OnInit {

  @Output() public closed: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public onClosed(): void {
    this.closed.emit();
  }

}
