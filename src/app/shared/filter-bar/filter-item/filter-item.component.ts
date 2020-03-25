import { Component, OnInit, Input } from '@angular/core';
import { FilterBarService } from '../filter-bar.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

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
    this.selected$
      .pipe(
        take(1)
      )
      .subscribe(isAlreadySelected => {
        if (isAlreadySelected) {
          this.filterBarService.select(null);
        } else {
          this.filterBarService.select(this.value);
        }
      })
    
  }

}
