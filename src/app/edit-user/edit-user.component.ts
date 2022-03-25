import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { HttpHelpersService } from './../service/http-helpers.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private _UsersComponent:UsersComponent, 
    private _HttpHelpersService:HttpHelpersService ,
    private _ActivatedRoute:ActivatedRoute) {

      _ActivatedRoute.snapshot.params
     }

  ngOnInit() {
  }

}
