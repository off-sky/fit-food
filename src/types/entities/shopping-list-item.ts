import { Quantity } from "./quantity";
import { Product } from "./product";

export interface ShoppingListItem {
    id?: string;
    isCompleted: boolean;
    displayName: string;
    product?: Product;
    productQuantity?: Quantity;
}