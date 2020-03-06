import { Ingredient } from './ingredient';
import { Quantity } from './quantity';
import { DishTag } from './dish-tag';

export interface DishListItem {
    id: string;
    isBreakfast: boolean;
    isDinner: boolean;
    isSnack: boolean;
    isSupper: boolean;
    name: string;
    tags: DishTag[];
}

export interface Dish {
    id?: string;
    ingredients: Ingredient[];
    isBreakfast: boolean;
    isDinner: boolean;
    isSnack: boolean;
    isSupper: boolean;
    name: string;
    ratingAverage: number;
    ratedCount: number;
    ratingUser: number;
    steps: DishStep[];
    tags?: DishTag[];
    quantity?: Quantity; 
}

export interface DishStep {
    id?: string;
    orderNumber: number;
    description: string;
}