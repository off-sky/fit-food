import { Meals } from "src/app/calendar/services/day-details-store.service";

const meals = {
    [Meals.BREAKFAST]: 'Breakfast',
    [Meals.SNACK_1]: 'Snack',
    [Meals.DINNER]: 'Dinner',
    [Meals.SNACK_2]: 'Snack',
    [Meals.SUPPER]: 'Supper'
};

export const getMealNameById = (mealId: number): string => {
    return meals[mealId];
}