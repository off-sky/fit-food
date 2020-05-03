import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromTypes from '../../../../types';
import * as moment from 'moment';

@Component({
  selector: 'r-calendar-root',
  templateUrl: './calendar-root.component.html',
  styleUrls: ['./calendar-root.component.scss']
})
export class CalendarRootComponent implements OnInit {

  public dayFilledMap = {};

  constructor(
    private router: Router,
    private activated: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initMockDayFilledMap();
  }

  public onDayClicked(day: any): void {
    this.router.navigate(['day', day.id, 'details'], { relativeTo: this.activated });
  }

  private initMockDayFilledMap() {
    const m = moment();
    const map = {};

    map[fromTypes.utils.getMomentId(m)] = [true, false, false, true];
    map[fromTypes.utils.getMomentId(moment(m.add(1, 'd')))] = [false, true, true, true, false];

    this.dayFilledMap = map;
  }

}
