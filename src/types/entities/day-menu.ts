import { Dish } from "./dish";

export interface DayMenu {
    first: DayMenuItem;
    second: DayMenuItem;
    third: DayMenuItem;
    fourth: DayMenuItem;
    fifth: DayMenuItem;
    sixth: DayMenuItem;
}

export interface DayMenuItem {
    orderNumber: number;
    dish: Dish;
}