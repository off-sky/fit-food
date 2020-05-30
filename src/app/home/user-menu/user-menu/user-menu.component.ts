import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface UserMenuState {
  isOpen: boolean;
}

const initialUserMenuState = {
  isOpen: false
}

@Component({
  selector: 'r-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  public isOpen$: Observable<boolean>;
  private state$: BehaviorSubject<UserMenuState> = new BehaviorSubject<UserMenuState>(initialUserMenuState);

  constructor() { }

  ngOnInit(): void {
    this.isOpen$ = this.state$
      .asObservable()
      .pipe(
        map(state => state.isOpen)
      )
  }

  public open(): void {
    this.state$.next({
      ...this.state$.value,
      isOpen: true
    });
  }

  public close(): void {
    this.state$.next({
      ...this.state$.value,
      isOpen: false
    });
  }

}
