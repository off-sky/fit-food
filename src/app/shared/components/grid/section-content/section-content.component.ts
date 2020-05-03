import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreenSizeService } from 'src/app/core/screen-size/screen-size.service';
import { map } from 'rxjs/operators';
import { ScreenSizes } from 'src/app/core/screen-size/interfaces';

@Component({
  selector: 'r-section-content',
  templateUrl: './section-content.component.html',
  styleUrls: ['./section-content.component.scss']
})
export class SectionContentComponent implements OnInit {

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
