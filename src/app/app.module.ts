import { NgModule } from '@angular/core';
import { NotificationsComponent } from './notifications/notifications.component';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAnimationsModule } from 'ngx-animations';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ClientsComponent } from './clients/clients.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [			
    AppComponent,
    UsersComponent,
    NavbarComponent,
    NotificationsComponent,
      EditUserComponent,
      ClientsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule,
    LoadingBarModule,
    BrowserAnimationsModule,
    NgxAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    
    TranslateModule.forRoot({
      defaultLanguage:'en',
      loader:{
        provide:TranslateLoader,
        useFactory:createTranslateLoader,
        deps:[HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(http:HttpClient)
{
   return new TranslateHttpLoader (http,'./assets/i18n/','.json')
}