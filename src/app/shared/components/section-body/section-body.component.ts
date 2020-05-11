import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'r-section-body',
  templateUrl: './section-body.component.html',
  styleUrls: ['./section-body.component.scss']
})
export class SectionBodyComponent implements OnInit {

  @Input() public alignCenter = false;

  constructor() { }

  ngOnInit(): void {
  }

}
