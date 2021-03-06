import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'r-plus-btn',
  templateUrl: './plus-btn.component.html',
  styleUrls: ['./plus-btn.component.scss']
})
export class PlusBtnComponent implements OnInit {

  @Input() public width: string = '18px';
  @Input() public focused: boolean = false;
  @Input() public disabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
