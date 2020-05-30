import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Directive({
  selector: '[rClickOutside]'
})
export class ClickOutsideDirective {

  private listening: boolean;
  private globalClick: Subscription;

  @Output() private rClickOutside: EventEmitter<Event>;

  constructor(private _elRef: ElementRef) {
    this.listening = false;
    this.rClickOutside = new EventEmitter<Event>();
  }

  public ngOnInit() {
    this.globalClick = fromEvent(document, 'click').pipe(
      delay(1),
      tap(() => {
        this.listening = true;
      }),).subscribe((event: MouseEvent) => {
        this.onGlobalClick(event);
      });
  }

  public ngOnDestroy() {
    this.globalClick.unsubscribe();
  }

  public onGlobalClick(event: MouseEvent) {
    if (event instanceof MouseEvent && this.listening === true) {
      const isDescendant = this.isDescendant(this._elRef.nativeElement, event.target);
      if (isDescendant === true) {
        return;
      } else {
        this.rClickOutside.emit(event);
      }
    }
  }

  private isDescendant(parent, child) {
    let node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      } else {
        node = node.parentNode;
      }
    }
    return false;
  }

}
