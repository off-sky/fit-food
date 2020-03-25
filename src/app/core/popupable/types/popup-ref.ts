import { Observable, Subject } from 'rxjs';

export class PopupRef<D, R> {
    private closeSubj: Subject<R> = new Subject<R>();
    data: D;
    close(result?: R): void {
        this.closeSubj.next(result);
    }
    closed(): Observable<R> {
        return this.closeSubj.asObservable();
    }
}