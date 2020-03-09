import { Route } from '@angular/router';
import { ShoppingRootComponent } from './containers/shopping-root/shopping-root.component';

export const shoppingRoutes: Route[] = [
    {
        path: 'shopping',
        children: [
            {
                path: '',
                component: ShoppingRootComponent
            }
        ]
    }
];