import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user/user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'create-users', component: UserComponent },
  { path: 'list-events', component: ListEventsComponent },
  { path: 'create-event', component: EventComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
