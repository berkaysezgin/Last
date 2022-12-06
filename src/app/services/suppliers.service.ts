import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
public controllerUrl:string=`${environment.apiUrl}/suppliers`
  constructor(
    private httpClient:HttpClient,
  ) { }

  getList(): Observable<Supplier[]>{
    return this.httpClient.get<Supplier[]>(this.controllerUrl);
      } 

}
