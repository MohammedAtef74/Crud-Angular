import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from './notifications/notifications.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ClientsComponent } from './clients/clients.component';

const routes: Routes = [
  {path:'' , component:UsersComponent},
  {path:'users' , component:UsersComponent},
  {path:'notifications' , component:NotificationsComponent},
  {path:'clients' , component:ClientsComponent},
  //{path:'edit-user/:id' , component:EditUserComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
