import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckboxSelectService } from '../checkbox-select.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'r-checkbox-select-item',
  templateUrl: './checkbox-select-item.component.html',
  styleUrls: ['./checkbox-select-item.component.scss']
})
export class CheckboxSelectItemComponent implements OnInit {

  @Input() public value: string;
  public selected$: Observable<boolean>;

  constructor(
    private checkboxSelectService: CheckboxSelectService
  ) { }

  ngOnInit(): void {
    this.selected$ = this.checkboxSelectService.selected$()
      .pipe(
        tap(val => console.log(val)),
        map(selected => selected === this.value),
     
      );
  }

  public onClick(): void {
    this.checkboxSelectService.toggleSelect(this.value);
  }

}
