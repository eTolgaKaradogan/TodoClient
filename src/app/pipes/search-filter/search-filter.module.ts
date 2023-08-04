import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterPipe } from './search-filter.pipe';



@NgModule({
  declarations: [SearchFilterPipe],
  imports: [
  
  ],
  exports: [
    SearchFilterPipe
  ]
})
export class SearchFilterModule { }
