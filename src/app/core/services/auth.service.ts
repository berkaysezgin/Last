import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { LoginRequestModel } from '../models/loginRequestModel';
import { LoginResponseModel } from '../models/loginResponseModel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
contrellerUrl: string=`${environment.apiUrl}/auth`;
  constructor(
    private httpClient:HttpClient,
    private jwtHelperService:JwtHelperService,
    private localStorageService:LocalStorageService ) { }

  login(request:LoginRequestModel): Observable<LoginResponseModel>{
 return this.httpClient.post<LoginResponseModel>(
  this.contrellerUrl + '/login',
  request
 );
  }
  get isAuthenticated():boolean{
    let token =this.localStorageService.get('token');
    if(!token) return false;
    if(this.jwtHelperService.isTokenExpired())return false;
    return true;
  }
}
