import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MainMenuDesktopComponent } from './components/main-menu-desktop/main-menu-desktop.component';
import { MainMenuMobileComponent } from './components/main-menu-mobile/main-menu-mobile.component';
import { SectionTabsComponent } from './components/section-tabs/section-tabs.component';



@NgModule({
  declarations: [
    HomeComponent,
    MainMenuComponent,
    MainMenuDesktopComponent,
    MainMenuMobileComponent,
    SectionTabsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
