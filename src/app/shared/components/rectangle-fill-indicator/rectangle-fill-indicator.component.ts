import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'r-rectangle-fill-indicator',
  templateUrl: './rectangle-fill-indicator.component.html',
  styleUrls: ['./rectangle-fill-indicator.component.scss']
})
export class RectangleFillIndicatorComponent implements OnInit {

  @Input() public filled: boolean[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
