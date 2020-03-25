import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { PopupableComponent } from './popupable/popupable.component';

@Injectable({
  providedIn: 'root'
})
export class PopupableService {

  private resultDataSubj: Subject<any> = new Subject<any>();

  constructor() { }

  public open<C, D, R>(component: C, data: D): Observable<R> {
    return PopupableComponent.open<C, D, R>(component, data);
  }

}
