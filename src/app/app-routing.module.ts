import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user/user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
