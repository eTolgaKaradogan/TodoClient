import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TasksModule } from './tasks/tasks.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordModule } from './update-password/update-password.module';
import { RegisterModule } from './register/register.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [ 
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TasksModule,
    PasswordResetModule,
    UpdatePasswordModule,
    RegisterModule,
    LoginModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class ComponentsModule { }
