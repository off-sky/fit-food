import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'r-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.scss']
})
export class ArrowComponent implements OnInit {

  @Input() public orientation: 'left' | 'right';
  
  constructor() { }

  ngOnInit(): void {
  }

}
