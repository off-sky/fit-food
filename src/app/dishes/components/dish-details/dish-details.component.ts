import { Component, OnInit, Input } from '@angular/core';
import { AbstractPopupComponent } from 'src/app/core/popupable/types/abstract-popup-component';
import { PopupRef } from 'src/app/core/popupable/types/popup-ref';

@Component({
  selector: 'r-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss']
})
export class DishDetailsComponent implements OnInit, AbstractPopupComponent<any, any> {
  @Input() popupRef: PopupRef<any, any>;

  constructor() { }

  ngOnInit(): void {
  }

  public onClose(): void {
    if (this.popupRef) {
      this.popupRef.close({});
    }
  }
}
