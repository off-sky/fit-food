import { Route } from '@angular/router';
import { CalendarRootComponent } from './containers/calendar-root/calendar-root.component';
import { DayRootComponent } from './containers/day-root/day-root.component';
import { DayDetailsComponent } from './containers/day-details/day-details.component';
import { DayEditorComponent } from './containers/day-editor/day-editor.component';
import { SelectDishComponent } from './containers/select-dish/select-dish.component';

export const calendarRoutes: Route[] = [
    {
        path: 'calendar',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: CalendarRootComponent
            },
            {
                path: 'day/:dayId',
                component: DayRootComponent,
                children: [
                    {
                        path: 'details',
                        component: DayDetailsComponent
                    },
                    {
                        path: 'edit/:mealId',
                        component: SelectDishComponent
                    },
                    {
                        path: 'edit',
                        component: DayEditorComponent
                    }
                ]
            }
        ]
    }
];