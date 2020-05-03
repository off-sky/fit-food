import { Component, OnInit, Input } from '@angular/core';
import { ScreenSizeService } from 'src/app/core/screen-size/screen-size.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScreenSizes } from 'src/app/core/screen-size/interfaces';
import { Action } from '..';

@Component({
  selector: 'r-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  @Input() public actions: Action[];
  
  public isMobile$: Observable<boolean>;

  constructor(
    private screenSizeService: ScreenSizeService
  ) { }

  ngOnInit(): void {
    this.isMobile$ = this.screenSizeService.screenSize$()
      .pipe(
        map(size => size === ScreenSizes.MOBILE)
      )
  }

}
