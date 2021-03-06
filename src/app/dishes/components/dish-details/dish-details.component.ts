import { Component, OnInit, Input } from '@angular/core';
import { AbstractPopupComponent } from 'src/app/core/popupable/types/abstract-popup-component';
import { PopupRef } from 'src/app/core/popupable/types/popup-ref';
import { ToastService } from 'src/app/core/toast/toast.service';
import { Router } from '@angular/router';
import { ShoppingStoreService } from 'src/app/shopping/shopping-store.service';

@Component({
  selector: 'r-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss']
})
export class DishDetailsComponent implements OnInit, AbstractPopupComponent<any, any> {
  @Input() popupRef: PopupRef<any, any>;
  public shoppingList = []
  public addedToFav = false;

  constructor(
    private toastService: ToastService,
    private shoppingListService: ShoppingStoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public onClose(): void {
    if (this.popupRef) {
      this.popupRef.close({});
    }
  }

  public onAddToCalendar(): void {
    this.router.navigate(['dishes', 'add-to-calendar', '123']);
    this.onClose();
  }

  public onAddToShoppingList(id: number, descr: string): void {
    if (!this.isAdded(id)) {
      this.shoppingList.push(id);
      this.shoppingListService.createFromExisting('' + id, descr)
      this.toastService.openToast('Додано до списку покупок');
    } else {
      this.shoppingList = this.shoppingList.filter(item => item !== id);
      this.shoppingListService.remove('' + id);
      this.toastService.openToast('Видалено зі списку покупок');
    }
  }

  public isAdded(id: number): boolean {
    return this.shoppingList.indexOf(id) >= 0;
  }

  public onAddedToFav(): void {
    this.addedToFav = !this.addedToFav;
    if (this.addedToFav) {
      this.toastService.openToast('Додано до улюблених');
    } else {
      this.toastService.openToast('Видалено з улюблених');
    }
  }
}
