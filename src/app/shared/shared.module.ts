import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBarModule } from './filter-bar/filter-bar.module';


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
import { RoundFillIndicatorComponent } from './components/round-fill-indicator/round-fill-indicator.component';
import { RectangleFillIndicatorComponent } from './components/rectangle-fill-indicator/rectangle-fill-indicator.component';
import { DropFillIndicatorComponent } from './components/drop-fill-indicator/drop-fill-indicator.component';
import { BackBtnComponent } from './components/back-btn/back-btn.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { CalendarIconComponent } from './components/calendar-icon/calendar-icon.component';
import { ActionsComponent } from './components/actions/actions.component';
import { SectionBodyComponent } from './components/section-body/section-body.component';
import { DishSelectorModule } from './dish-selector/dish-selector.module';
import { ActionsModule } from './actions/actions.module';

const sharedComponents = [
    ArrowComponent,
    BackBtnComponent,
    ButtonComponent,
    CalendarIconComponent,
    CloseBtnComponent,
    HeartBtnComponent,
    PlusBtnComponent,
    // DropFillIndicatorComponent,
    // RoundFillIndicatorComponent,
    // RectangleFillIndicatorComponent,
    SearchInputComponent,
    SectionBottomComponent,
    SectionBodyComponent,
    SectionHeaderComponent,
    SectionComponent,
    SectionContentComponent
];




@NgModule({
  declarations: [
    ...sharedComponents
  ],
  imports: [
    CommonModule,
    DatePickerModule,
    FilterBarModule
  ],
  exports: [
    ...sharedComponents,
    DatePickerModule,
    FilterBarModule
  ]
})
export class SharedModule { }
