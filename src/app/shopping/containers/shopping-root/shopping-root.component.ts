import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingListItem } from 'src/types';
import { ShoppingStoreService } from '../../shopping-store.service';

@Component({
  selector: 'r-shopping-root',
  templateUrl: './shopping-root.component.html',
  styleUrls: ['./shopping-root.component.scss']
})
export class ShoppingRootComponent implements OnInit {

  public list$: Observable<ShoppingListItem[]>;

  constructor(
    private store: ShoppingStoreService
  ) { }

  ngOnInit(): void {
    this.list$ = this.store.list$();
  }

}
