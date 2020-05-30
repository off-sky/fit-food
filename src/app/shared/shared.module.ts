import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBarModule } from './filter-bar/filter-bar.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SectionComponent } from './components/grid/section/section.component';
import { SectionBottomComponent } from './components/grid/section-bottom/section-bottom.component';
import { SectionContentComponent } from './components/grid/section-content/section-content.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { PlusBtnComponent } from './components/plus-btn/plus-btn.component';
import { CloseBtnComponent } from './components/close-btn/close-btn.component';
import { ArrowComponent } from './components/arrow/arrow.component';
import { ButtonComponent } from './components/button/button.component';
import { HeartBtnComponent } from './components/heart-btn/heart-btn.component';
import { DatePickerModule } from './date-picker/date-picker.module';
import { BackBtnComponent } from './components/back-btn/back-btn.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { CalendarIconComponent } from './components/calendar-icon/calendar-icon.component';
import { SectionBodyComponent } from './components/section-body/section-body.component';
import { EditBtnComponent } from './components/edit-btn/edit-btn.component';
import { AddBtnRoundComponent } from './components/add-btn-round/add-btn-round.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { SectionLeftComponent } from './components/grid/section-left/section-left.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CheckboxSelectModule } from './checkbox-select/checkbox-select.module';



const sharedComponents = [
    AddBtnRoundComponent,
    ArrowComponent,
    BackBtnComponent,
    ButtonComponent,
    CalendarIconComponent,
    CloseBtnComponent,
    EditBtnComponent,
    HeartBtnComponent,
    PlusBtnComponent,
    SearchInputComponent,
    SideBarComponent,
    SectionBottomComponent,
    SectionBodyComponent,
    SectionHeaderComponent,
    SectionLeftComponent,
    SectionComponent,
    SectionContentComponent
];

const sharedDirectives = [
  ClickOutsideDirective
];




@NgModule({
  declarations: [
    ...sharedComponents,
    ...sharedDirectives
  ],
  imports: [
    CommonModule,
    CheckboxSelectModule,
    DatePickerModule,
    FilterBarModule,
    ReactiveFormsModule
  ],
  exports: [
    ...sharedComponents,
    ...sharedDirectives,
    CheckboxSelectModule,
    DatePickerModule,
    FilterBarModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
