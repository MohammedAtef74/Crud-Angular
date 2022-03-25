import { baseUrl, UsersEndPoient } from './../service/global.service';
import { HttpHelpersService } from './../service/http-helpers.service';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AnimationsService, buildRouteTransition, } from 'ngx-animations';
import { animations } from "ngx-animations";
import { getAnimations } from '../animations';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn,fadeInLeft ,bounceInDown ,bounceInUp , bounceInRight , bounceInLeft, tada , jello , lightSpeedIn ,zoomIn} from 'ngx-animate';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

declare let $: any

HttpHelpersService
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [trigger('fadeIn' , [transition('* => *', useAnimation(fadeIn))]),
  trigger('fadeInLeft',[transition('*=>*' , useAnimation(fadeInLeft))]),
  trigger('bounceInDown',[transition('*=>*' , useAnimation(bounceInDown))]),
  trigger('bounceInUp',[transition('*=>*' , useAnimation(bounceInUp))]),
  trigger('bounceInRight',[transition('*=>*' , useAnimation(bounceInRight))]),
  trigger('tada',[transition('*=>*' , useAnimation(tada))]),
  trigger('jello',[transition('*=>*' , useAnimation(jello))]),
  trigger('zoomIn',[transition('*=>*' , useAnimation(zoomIn))]),],

})

export class UsersComponent implements OnInit {
  allUsers:any;
  allUsersFilter:any;
  isLoading = false;
  p: any;
  userId: any;
  fadeInLeft: any;
  bounceInLeft:any;
  fadeIn:any;
  bounceInDown:any;
  myTiming:any;
  myDelay:any;
  bounceInUp:any;
  bounceInRight:any;
  tada:any;
  zoomIn:any;
  jello:any;
  currentLang : string = '';

  updateUser = new FormGroup({
    'name':new FormControl(null),
    'phone':new FormControl(null),
    'email':new FormControl(null),
    'country':new FormControl(null),
    'birthday':new FormControl(null),
    'createdAt':new FormControl(null),
    'id':new FormControl(null)
  });

  constructor(private _HttpHelpersService:HttpHelpersService ,
     private loadingBar: LoadingBarService ,
     private animationsService: AnimationsService ,
     public translate:TranslateService ,
     private toastr: ToastrService,
     )
     {
       this.currentLang = localStorage.getItem('currentLang')||'en';
       this.translate.use(this.currentLang);
     }

    addUser=new FormGroup({
    name:new FormControl(null),
    phone:new FormControl(null),
    email:new FormControl(null),
    country:new FormControl(null),
    birthday:new FormControl(null),
    createdAt:new FormControl(null),
  });

  changeCurrentLanguage(lang:string)
{
    this.translate.use(lang);
    localStorage.setItem('currentLang',lang)
};
 
showSuccess()
{
  this.toastr.success('Added Successfully');
};

showDelete()
{
  this.toastr.error('Delete Successfully');
};

  startLoading()
  {
    this.loadingBar.start();
  };

  stopLoading()
  {
    this.loadingBar.complete();
  };

  getUsers()
  {
    this._HttpHelpersService.get(UsersEndPoient.GET).subscribe(({
      next:responce=>{
        this.isLoading = true;
        this.allUsers = responce;
        this.setValueById();
        this.stopLoading();
        this.allUsersFilter= this.allUsers;
        console.log(this.allUsers)
       

      }
    }))
  };
   
  addedData()
  {
     let model =
     {
      name : this.addUser.value.name,
      phone: this.addUser.value.phone,
      email: this.addUser.value.email,
      country : this.addUser.value.country,
      birthday: this.addUser.value.birthday,
      createdAt: this.addUser.value.createdAt
     }
     this._HttpHelpersService.Post(UsersEndPoient.POST , model).subscribe(({
       next : responce =>
       {
         this.allUsers = responce.allUsers;
         this.startLoading();
         $('#add').modal('hide');

         this.getUsers();
         this.addUser.reset();
       },
       error:error=>
       {
          alert(error)
       }
       
     }));
  };

  getId(id:any)
  {
     this.userId = id ;
     console.log(this.userId);
  };

  setValueById()
  {
    
    for(let i = 0 ; i< this.allUsers.length ; i++)
    {
       if(this.allUsers[i].id == this.userId)
       {
         this._HttpHelpersService.getUserID(UsersEndPoient.GET, this.userId).subscribe(({
           next:response=>
           {
             this.updateUser.patchValue(response)
           }
         }))   
       }
    }

  };

  deletedData()
  {
     this._HttpHelpersService.Delete(UsersEndPoient.DELETE , this.userId).subscribe(({
       next: responce =>
       {
        $('#delete').modal('hide');
         this.allUsers = responce ;
         this.getUsers();
       },
       error: error=>{
         alert(error);
       }
       
     }));
  };

  search(event:any)
  {
    const value = event.target.value;
    this.allUsersFilter = this.allUsers.filter((user:any)=>
     user.name.toLowerCase().includes(value)
    );
  };

  editData()
  {
    let model=
    {
      'id': this.updateUser.value.id,
      'name': this.updateUser.value.name,
      'phone': this.updateUser.value.phone,
      'email': this.updateUser.value.email,
      'country': this.updateUser.value.country,
      'birthday': this.updateUser.value.birthday,
      'createdAt': this.updateUser.value.createdAt,
    }

    this._HttpHelpersService.Put(UsersEndPoient.PUT , model).subscribe(({
      next : responce =>
      {
        this.getUsers();
      },
      error: error=>
      {
        alert(error)
      }
    }))
  }
  ngOnInit(): void 
  {
     this.getUsers();
     this.startLoading();     
  }

}
