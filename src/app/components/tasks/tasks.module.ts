import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CompletedListComponent } from './completed-list/completed-list.component';
import { TasksComponent } from './tasks.component';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFilterModule } from 'src/app/pipes/search-filter/search-filter.module';
import { CreateModule } from './create/create.module';

const routes: Routes = [
  {
    path: '', component: TasksComponent, children: [
      {
        path: '', component: ListComponent
      },
      {
        path: 'tasks/today',
        loadChildren: () => import(`./today-list/today-list.module`)
          .then((mod) => mod.TodayListModule)
      },
      {
        path: 'tasks/completeds', component: CompletedListComponent
      }
    ]
  },
];


@NgModule({
  declarations: [
    TasksComponent,
    ListComponent,
    HeaderComponent,
    CompletedListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DialogsModule,
    ReactiveFormsModule,
    SearchFilterModule,
    CreateModule
  ],
})
export class TasksModule { }
