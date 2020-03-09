import { Route } from '@angular/router';
import { CalendarRootComponent } from './containers/calendar-root/calendar-root.component';

export const calendarRoutes: Route[] = [
    {
        path: 'calendar',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: CalendarRootComponent
            }
        ]
    }
];