import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    NgxPaginationModule,
    CommonModule
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
