import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class FilterBarService {

  private selectedSubj: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() { }


  public select(id: string): void {
    this.selectedSubj.next(id);
  }

  public selected$(): Observable<string> {
    return this.selectedSubj.asObservable();
  }

}
