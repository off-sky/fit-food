import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { calendarRoutes } from '../calendar/calendar.routes';
import { dishesRoutes } from '../dishes/dishes.routes';
import { shoppingRoutes } from '../shopping/shopping.routes';


const homeRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dishes'
      },
      ...calendarRoutes,
      ...dishesRoutes,
      ...shoppingRoutes,
    ]
  }
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
