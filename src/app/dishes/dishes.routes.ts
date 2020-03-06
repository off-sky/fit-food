import { Route } from '@angular/router';
import { DishListRootComponent } from './containers/dish-list-root/dish-list-root.component';

export const dishesRoutes: Route[] = [
    {
        path: 'dishes',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: DishListRootComponent
            }
        ]
    }
];