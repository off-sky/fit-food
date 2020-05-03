import { Component, OnInit, Input } from '@angular/core';
import { PopupableService } from 'src/app/core/popupable/popupable.service';
import { DishDetailsComponent } from '../dish-details/dish-details.component';

@Component({
  selector: 'r-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() public selected: boolean;

  constructor(
    private popupableService: PopupableService
  ) { }

  ngOnInit(): void {
  }

  public onViewDetailsClick(): void {
    this.popupableService.open<any, any, any>(DishDetailsComponent, {})
      .subscribe(res => {
      })
  }

}
