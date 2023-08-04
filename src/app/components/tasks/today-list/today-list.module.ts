import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TodayListComponent } from './today-list.component';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFilterModule } from 'src/app/pipes/search-filter/search-filter.module';
import { CreateModule } from '../create/create.module';

const routes: Routes = [
  {path: '', component: TodayListComponent}
]

@NgModule({
  declarations: [
    TodayListComponent,
],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatListModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    DialogsModule,
    ReactiveFormsModule,
    SearchFilterModule,
    CreateModule
  ]
})
export class TodayListModule { }
