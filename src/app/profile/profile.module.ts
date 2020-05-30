import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ProfileSettingsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProfileModule { }
