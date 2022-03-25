import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { zoomIn } from 'ngx-animate';
import { baseUrl, NotificationsEndPoient } from '../service/global.service';
import { HttpHelpersService } from './../service/http-helpers.service';
import { tada } from 'ngx-animate';

declare let $: any

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [trigger('zoomIn' , [transition('* => *', useAnimation(zoomIn))])],
})
export class NotificationsComponent implements OnInit {
allNotifications : any ;
isLoading = false ;
zoomIn: any;
userId: any;
arrayId :any ;
bounce: any;
p : any ;
notificationsFilter :any ;
usersForm: any = new FormGroup({
  "title": new FormControl(null),
  "message": new FormControl(null)
})
  constructor(private _HttpHelpersService:HttpHelpersService , private loadingBar: LoadingBarService) { }

  chekChange(e :any)
  {
    this.arrayId.push(e.target.value)
    console.log(e.target.value)
  };

  user(x:any)
  {
     let model =
     {
       'id' : this.arrayId,
       'title' : x.controls.title.value,
       'message' : x.controls.message.value,
     }

     this._HttpHelpersService.Post(NotificationsEndPoient.POST , model).subscribe(({
       next:responce=>
       {
         this.arrayId = [];

         this._HttpHelpersService.get(NotificationsEndPoient.GET).subscribe(({
           next:responce=>
           {
             this.allNotifications = responce;
           }
         }))
       }

      
     }));
     this.isLoading = true;
     this.usersForm.reset();

     console.log(model)
  };

  startLoading() {
    this.loadingBar.start();
  };

  stopLoading() {
    this.loadingBar.complete();
  };

  search( e : any)
  {
    const value = e.target.value;
    console.log(value);
    this.notificationsFilter = this.allNotifications.filter((note:any)=>
    note.name.toLowerCase().includes(value));
  };

  getNotifications()
  {
    this._HttpHelpersService.get(NotificationsEndPoient.GET).subscribe(({
      next: responce =>
      {
        this.isLoading = true;
        this.allNotifications = responce;
        this.notificationsFilter = this.allNotifications;
        console.log(this.allNotifications);
        this.stopLoading();
      }
    }))
  };

  getId(id : any)
  {
     this.userId = id;
     console.log(this.userId)
  };

  deleteNotification()
  {
     this._HttpHelpersService.DeleteNote(NotificationsEndPoient.DELETE , this.userId).subscribe(({
       next:response=>
       {
        $('#delete').modal('hide');
         this.allNotifications = response ;
         this.getNotifications();
       },
       error:error=>
       {
         alert(error)
       }
     }))
  };

  myChoice(e:any) {
    console.log(e.target.value);
    if(e.target.value == "specialUser")
    (document.querySelector(".userTable") as HTMLElement).style.display = "flex";
    else
    (document.querySelector(".userTable") as HTMLElement).style.display = "none";
   };

  ngOnInit()
  {
    this.getNotifications();
    this.startLoading();
  };

}
