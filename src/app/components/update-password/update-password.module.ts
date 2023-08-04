import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePasswordComponent } from './update-password.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: UpdatePasswordComponent}
]

@NgModule({
  declarations: [
    UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UpdatePasswordModule { }
