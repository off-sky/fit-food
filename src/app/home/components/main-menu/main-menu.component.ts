import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'r-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  @Input() public isMobile = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
