import { Component, OnInit, Input } from '@angular/core';
import { ShoppingListItem } from 'src/types';

@Component({
  selector: 'r-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.scss']
})
export class ShoppingListItemComponent implements OnInit {

  @Input() public item: ShoppingListItem;

  constructor() { }

  ngOnInit(): void {
  }

}
