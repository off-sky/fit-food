import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'r-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {

  @Input() public alignCenter = false;

  @Output() public backClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public onBackClick(): void {
    this.backClicked.emit();
  }

}
