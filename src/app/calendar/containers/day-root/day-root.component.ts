import { Component, OnInit } from '@angular/core';
import { DayDetailsStoreService } from '../../services/day-details-store.service';

@Component({
  selector: 'r-day-root',
  templateUrl: './day-root.component.html',
  styleUrls: ['./day-root.component.scss'],
  providers: [ DayDetailsStoreService ]
})
export class DayRootComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
