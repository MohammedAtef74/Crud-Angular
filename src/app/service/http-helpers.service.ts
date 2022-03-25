import { baseUrl } from './global.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpHelpersService {

  constructor(private _HttpClient:HttpClient) { }

  get( endPoint: string): Observable<any> 
  {
     return this._HttpClient.get(baseUrl + endPoint)
  };
   
  getUserID(endPoint : string  ,id : string):Observable <any>
  {
      return this._HttpClient.get(`${baseUrl}/users/${id}` )
  };
  
  Post(endPoint : string ,model: any): Observable<any> {
    return this._HttpClient.post<any>(baseUrl + endPoint, model)
  };

  Put(endPoint : string ,model: any): Observable<any> {
    return this._HttpClient.put<any>(`${baseUrl}`+endPoint,`${model}`)
  };

  Delete(endPoint : string, model:any): Observable<any> 
  {
    return this._HttpClient.delete<any>(`${baseUrl}/users/${model}`)
  };
  DeleteNote(endPoint : string, model:any): Observable<any> 
  {
    return this._HttpClient.delete<any>(`${baseUrl}/notifications/${model}`)
  };

  DeleteClient(endPoint : string, model : any): Observable<any>
  {
    return this._HttpClient.delete<any>(`${baseUrl}/clients/${model}`)
  };
  
};


/*   */

