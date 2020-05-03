import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreenSizeService } from 'src/app/core/screen-size/screen-size.service';
import { ScreenSizes } from 'src/app/core/screen-size/interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'r-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
   
  }

}
