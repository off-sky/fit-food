import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { ShoppingListItem } from 'src/types';
import { ShoppingStoreService } from '../../shopping-store.service';
import { Action, ActionColors } from 'src/app/shared/actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'r-shopping-root',
  templateUrl: './shopping-root.component.html',
  styleUrls: ['./shopping-root.component.scss']
})
export class ShoppingRootComponent implements OnInit {

  public list$: Observable<ShoppingListItem[]>;
  public empty$: Observable<boolean>;
  public editedId$: Observable<string>;
  public actions$: Observable<Action[]>;

  constructor(
    private store: ShoppingStoreService
  ) { }

  ngOnInit(): void {
    this.list$ = this.store.list$();
    this.empty$ = this.store.empty$();
    this.editedId$ = this.store.editedId$();
    this.actions$ = this.getActionsObs();
  }

  public onAddItem(): void {
    setTimeout(() => {
      this.store.create();
    })
  }

  public onChangeItem(event: ShoppingListItem): void {
    this.store.saveChanges(event.id, event);
  }

  public onCloseEdit(): void {
    this.store.closeEdit();
  }

  public onStartEdit(event: string): void {
    this.store.edit(event);
  }

  public onToggleCompleted(event: string): void {
    this.store.toggleCompleted(event);
  }

  public onRemove(event: string): void {
    this.store.remove(event);
  }

  private onClearAll(): void {
    this.store.clearAll();
  }

  private onToggleHideCompleted(): void {
    this.store.toggleHideCompleted();
  }

  private getActionsObs(): Observable<Action[]> {
    const listCount$ = this.store.listCount$();
    const completedCount$ = this.store.completedCount$();
    const isCompleteHidden$ = this.store.isCompletedHidden$();

    return combineLatest([
      listCount$,
      completedCount$,
      isCompleteHidden$
    ])
    .pipe(
      map(([listCount, completeCount, isCompleteHidden]) => {
        const result = [] as Action[];
        if (listCount > 0) {
          result.push({
            displayLabel: 'Clear All',
            color: ActionColors.WHITE,
            disabled: false,
            callback: this.onClearAll.bind(this)
          });
        }
        if (completeCount > 0) {
          result.push({
            displayLabel: isCompleteHidden ? 'Show Completed' : 'Hide Completed',
            color: ActionColors.WHITE,
            disabled: false,
            callback: this.onToggleHideCompleted.bind(this)
          });
        }
        return result;
      })
    )
  }

}
