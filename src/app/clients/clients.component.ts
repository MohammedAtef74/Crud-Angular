import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ClientsEndPoient } from '../service/global.service';
import { HttpHelpersService } from './../service/http-helpers.service';
import { FormControl, FormGroup } from '@angular/forms';
import { transition, trigger, useAnimation } from '@angular/animations';
import { zoomIn } from 'ngx-animate';
import { AnimationsService, buildRouteTransition, } from 'ngx-animations';
declare let $: any

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  animations: [trigger('zoomIn' , [transition('* => *', useAnimation(zoomIn))])],
})
export class ClientsComponent implements OnInit {
  isLoading = false;
  p: any;
  userId: any;
  zoomIn: any;
  allClients : any;
  clientId : any ;
  //urlImg = 'http://placeimg.com/640/480/sports';

  addClient = new FormGroup({
    name:new FormControl(null),
    email:new FormControl(null),
    gender:new FormControl(null),
    createdAt:new FormControl(null),
    img :new FormControl(null),
  });
  constructor(private _HttpHelpersService:HttpHelpersService, private loadingBar: LoadingBarService) { }
 
  getClients()
 {
    this._HttpHelpersService.get(ClientsEndPoient.GET).subscribe(({
      next:response=>
      {
        this.isLoading = true;
        this.allClients = response;
        this.stopLoading();
        console.log(this.allClients);
      },
      error:error=>
      {
        alert(error)
      }
    }));
 };

 startLoading() {
  this.loadingBar.start();
 };

 stopLoading() {
  this.loadingBar.complete();
 };

 addData()
 {
   let model =
   {
     name: this.addClient.value.name,
     email: this.addClient.value.email,
     gender: this.addClient.value.gender,
     createdAt: this.addClient.value.createdAt,
     img: this.addClient.value.img,
   }

   this._HttpHelpersService.Post(ClientsEndPoient.POST, model).subscribe(({
     next:response=>
     {
       this.isLoading = false;
        this.allClients = response.allClients;
        this.startLoading();
        $('#add').modal('hide');
        this.getClients();
     },
     error:error=>
     {
       alert(error)
     }
   }));
 };

//  onSelect(event : any)
//  {
   
//     if(event.target.files[0])
//     {
//       let reader = new FileReader();
//       reader.readAsDataURL(event.target.files[0]);
//       reader.onload = (event:any)=>
//       {
//          this.urlImg = event.target.result;
//       }
//     }
//  }

 getId(id : any)
 {
    this.clientId = id ;
    console.log(this.clientId)
 }
 deletedData()
 {
    this._HttpHelpersService.DeleteClient(ClientsEndPoient.DELETE , this.clientId).subscribe(({
      next:responce=>
      {
        $('#delete').modal('hide');
        this.allClients = responce ;
        this.getClients();
      },
      error:error=>
      {
        alert(error)
      }
    }));
 };

  ngOnInit() 
  {
    this.getClients();
    this.startLoading();
  };

};
