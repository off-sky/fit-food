import { PopupRef } from './popup-ref';

export interface AbstractPopupComponent<D, R> {
    popupRef: PopupRef<D, R>;
}