import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBarModule } from './filter-bar/filter-bar.module';


import { SectionComponent } from './components/grid/section/section.component';
import { SectionBottomComponent } from './components/grid/section-bottom/section-bottom.component';
import { SectionContentComponent } from './components/grid/section-content/section-content.component';
import { SearchInputComponent } from './components/search-input/search-input.component';

const sharedComponents = [
    SearchInputComponent,
    SectionBottomComponent,
    SectionComponent,
    SectionContentComponent,
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
