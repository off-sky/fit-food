import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

type Direction = 'left' | 'right' | 'down' | 'up';

@Component({
  selector: 'r-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.scss']
})
export class ArrowComponent implements AfterViewInit, OnInit {

  @Input() public width: number = 15;
  @Input() public direction: Direction = 'down';
  @ViewChild('svgEl') private svgEl: ElementRef;
  public height: number = 9;

  constructor() { }

  ngOnInit(): void {
    if (this.width !== 15) {
      this.height = Math.floor(this.width * ( 9 / 15))
    }
  }

  ngAfterViewInit(): void {
    const { x, y, width, height } = this.svgEl.nativeElement.getBBox();
    const viewBoxValue = `${x} ${y} ${width} ${height}`;
  }

}
