import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'tasks', pathMatch: 'full'},
  { path: 'tasks', loadChildren: () => import("../app/components/tasks/tasks.module").then(m => m.TasksModule)},  
  { path: 'register', loadChildren: () => import("../app/components/register/register.module").then(m => m.RegisterModule)},
  { path: 'login', loadChildren: () => import("../app/components/login/login.module").then(m => m.LoginModule)},
  { path: 'password-reset', loadChildren: () => import("../app/components/password-reset/password-reset.module").then(m => m.PasswordResetModule)},
  { path: 'update-password/:userId/:resetToken', loadChildren: () => import("../app/components/update-password/update-password.module").then(m => m.UpdatePasswordModule)},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
