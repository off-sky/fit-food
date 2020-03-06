import { Product } from './product';
import { Quantity } from './quantity';

export interface Ingredient {
    product: Product;
    quantity: Quantity;
}