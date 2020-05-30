import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScreenSizes } from 'src/app/core/screen-size/interfaces';
import { ScreenSizeService } from 'src/app/core/screen-size/screen-size.service';

@Component({
  selector: 'r-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public isMobile$: Observable<boolean>;
  
  constructor(
    private screenSizeService: ScreenSizeService
  ) { }

  ngOnInit(): void {
    this.isMobile$ = this.screenSizeService.screenSize$()
      .pipe(
        map(size => size === ScreenSizes.MOBILE)
      );
  }

}
