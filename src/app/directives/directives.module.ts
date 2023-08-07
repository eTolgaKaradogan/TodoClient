import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteDirective } from './complete.directive';
import { DeleteDirective } from './delete.directive';
import { DetailsDirective } from './details.directive';



@NgModule({
  declarations: [
    CompleteDirective,
    DeleteDirective,
    DetailsDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CompleteDirective,
    DeleteDirective,
    DetailsDirective
  ]
})
export class DirectivesModule { }
