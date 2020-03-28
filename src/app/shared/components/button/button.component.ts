import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'r-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() public width: string = '100%';
  @Input() public disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
