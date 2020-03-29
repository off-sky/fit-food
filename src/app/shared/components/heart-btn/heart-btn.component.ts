import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'r-heart-btn',
  templateUrl: './heart-btn.component.html',
  styleUrls: ['./heart-btn.component.scss']
})
export class HeartBtnComponent implements OnInit {

  @Input() public checked = false;

  constructor() { }

  ngOnInit(): void {
  }

}
