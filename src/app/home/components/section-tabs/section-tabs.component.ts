import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingStoreService } from 'src/app/shopping/shopping-store.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'r-section-tabs',
  templateUrl: './section-tabs.component.html',
  styleUrls: ['./section-tabs.component.scss']
})
export class SectionTabsComponent implements OnInit {

  public notCompletedShoppingCount$: Observable<number>;
  public hasUncompletedShoppings$: Observable<boolean>;

  constructor(
    private shoppingStore: ShoppingStoreService
  ) { }

  ngOnInit(): void {
    this.notCompletedShoppingCount$ = this.shoppingStore.notCompletedCount$();
    this.hasUncompletedShoppings$ = this.notCompletedShoppingCount$
      .pipe(
        map(count => count > 0)
      )
  }

}
