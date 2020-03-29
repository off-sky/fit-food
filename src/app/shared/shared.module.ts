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

const sharedComponents = [
    ArrowComponent,
    ButtonComponent,
    CloseBtnComponent,
    HeartBtnComponent,
    PlusBtnComponent,
    SearchInputComponent,
    SectionBottomComponent,
    SectionComponent,
    SectionContentComponent
];




@NgModule({
  declarations: [
    ...sharedComponents
  ],
  imports: [
    CommonModule,
    FilterBarModule
  ],
  exports: [
    ...sharedComponents,
    FilterBarModule
  ]
})
export class SharedModule { }
