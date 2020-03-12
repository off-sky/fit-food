import { Component, OnInit, Input } from '@angular/core';
import { FilterBarService } from '../filter-bar.service';

@Component({
  selector: 'r-filter-bar',
  templateUrl: './filter-bar.component.html',
  providers: [ FilterBarService ],
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

  @Input() public selected: string;

  constructor(
    private filterbarService: FilterBarService
  ) { }

  ngOnInit(): void {
    if (this.selected) {
      this.filterbarService.select(this.selected);
    }
  }

}
