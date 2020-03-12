import { Component, OnInit, Input } from '@angular/core';
import { FilterBarService } from '../filter-bar.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'r-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss']
})
export class FilterItemComponent implements OnInit {

  @Input() public value: string;
  public selected$: Observable<boolean>;

  constructor(
    private filterBarService: FilterBarService
  ) { }

  ngOnInit(): void {
    this.selected$ = this.filterBarService.selected$()
      .pipe(
        map(selectedId => selectedId === this.value)
      )
  }

  public onClick(): void {
    this.filterBarService.select(this.value);
  }

}
