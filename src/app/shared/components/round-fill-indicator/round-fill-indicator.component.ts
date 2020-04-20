import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'r-round-fill-indicator',
  templateUrl: './round-fill-indicator.component.html',
  styleUrls: ['./round-fill-indicator.component.scss']
})
export class RoundFillIndicatorComponent implements OnInit {


  /**         filled[2]
   *    filled[1]    filled[3]
   * filled[0]         filled[4]
   *    filled[7]    filled[5]
   *          filled[6]
   */
  @Input() public filled: boolean[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
