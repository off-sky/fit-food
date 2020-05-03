import { Route } from '@angular/router';
import { DishListRootComponent } from './containers/dish-list-root/dish-list-root.component';
import { AddToCalendarComponent } from './containers/add-to-calendar/add-to-calendar.component';

export const dishesRoutes: Route[] = [
    {
        path: 'dishes',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: DishListRootComponent
            },
            {
                path: 'add-to-calendar/:dishId',
                component: AddToCalendarComponent
            }
        ]
    }
];