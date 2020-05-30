import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { ShoppingListItem } from 'src/types';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { startWith, map, distinctUntilChanged, filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'r-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.scss']
})
export class ShoppingListItemComponent implements AfterViewInit, OnInit, OnChanges {

  @Input() public item: ShoppingListItem;
  @Input() public editedId: string;

  @Output() public changed: EventEmitter<ShoppingListItem> = new EventEmitter<ShoppingListItem>();
  @Output() public startedEdit: EventEmitter<string> = new EventEmitter<string>();
  @Output() public closedEdit: EventEmitter<string> = new EventEmitter<string>();
  @Output() public toggledCompleted: EventEmitter<string> = new EventEmitter<string>();
  @Output() public removed: EventEmitter<string> = new EventEmitter<string>();

  @ViewChildren('textArea') private textArea$: QueryList<ElementRef>;

  public isEdited$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public descriptionFormControl: FormControl;
  public validForSave$: Observable<boolean>;

  constructor() { }

  ngAfterViewInit(): void {
    this.textArea$.changes
      .pipe(
        map(ql => ql.first),
        startWith(this.textArea$.first),
        map(el => !!el),
        distinctUntilChanged(),
        filter(exists => !!exists)
      )
      .subscribe(tArea => {
        const elRef = this.textArea$.first;
        const textArea = elRef.nativeElement as HTMLTextAreaElement;
        textArea.focus();
      });
  }

  ngOnInit(): void {
    this.descriptionFormControl = new FormControl(this.item.displayName);
    this.validForSave$ = this.descriptionFormControl.valueChanges
      .pipe(
        startWith(this.descriptionFormControl.value),
        map(val => !!val && val.length > 0)
      );
    this.isEdited$.asObservable()
        .pipe(
          distinctUntilChanged(),
          filter(edited => !edited)
        )
        .subscribe(() => {
          this.onSave();
        });
    this.descriptionFormControl.valueChanges
        .pipe(
          debounceTime(200)
        )
        .subscribe(val => {
          this.onSave();
        })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.editedId) {
      this.isEdited$.next(this.item.id === this.editedId);
    }
  }


  public onSave(): void {
    this.changed.emit({
      ...this.item,
      displayName: this.descriptionFormControl.value || ''
    })
  }

  public onCloseEdit(): void {
    if (!this.descriptionFormControl.value) {
      this.removed.emit(this.item.id);
    } else {
      this.closedEdit.emit(this.item.id);
    }
  }

  public onRemove(): void {
    this.removed.emit(this.item.id);
  }

  public onStartEdit(): void {
    this.startedEdit.emit(this.item.id);
  }

  public onToggleCompleted(): void {
    this.toggledCompleted.emit(this.item.id);
  }

}
