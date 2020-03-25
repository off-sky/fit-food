import { Observable } from 'rxjs';

export interface AbstractPopupable {
    open(component: any, data: any): Observable<any>;
}