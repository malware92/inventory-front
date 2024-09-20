import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginResponse } from './interfaces/login-response';

interface LoginData{
  username: string, 
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login( loginData: LoginData ){
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth`, loginData);
  }

}
