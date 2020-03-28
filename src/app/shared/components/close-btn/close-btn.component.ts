import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'r-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrls: ['./close-btn.component.scss']
})
export class CloseBtnComponent implements OnInit {

  @Input() public width: string = '15px';

  constructor() { }

  ngOnInit(): void {
  }

}
