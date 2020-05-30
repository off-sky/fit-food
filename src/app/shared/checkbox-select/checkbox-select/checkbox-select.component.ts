import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CheckboxSelectService } from '../checkbox-select.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'r-checkbox-select',
  templateUrl: './checkbox-select.component.html',
  styleUrls: ['./checkbox-select.component.scss'],
  providers: [ CheckboxSelectService ]
})
export class CheckboxSelectComponent implements OnInit {

  @Output() public selectedChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private checkboxSelectService: CheckboxSelectService
  ) { }

  ngOnInit(): void {
    this.checkboxSelectService.selected$()
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(val => this.selectedChanged.emit(val))
  }

}
