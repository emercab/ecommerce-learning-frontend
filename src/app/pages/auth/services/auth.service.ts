import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { URL_SERVICES } from '../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _http: HttpClient = inject(HttpClient);
  private _router: Router = inject(Router);

  public token: string = '';
  public user: any = null;

  constructor() {
    this.initAuth();
  }


  public initAuth(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token) {
      this.token = token;
      this.user = user ? JSON.parse(user ?? '') : null;
    }
  }
  
  
  public login(email: string, password: string): Observable<any> {
    const url = `${URL_SERVICES}auth/login-ecommerce`;
    const loginData = { email, password };

    return this._http.post(url, loginData).pipe(
      map((resp: any) => {
        const result = this.saveLocalStorage(resp);
        return result;
      }),
      catchError((err: any) => {
        console.log(err);
        return of(err);
      })
    )
  }


  public saveLocalStorage(resp: any): boolean {
    if (resp && resp.accessToken) {
      localStorage.setItem('token', resp.accessToken);
      localStorage.setItem('user', JSON.stringify(resp.user));
      return true;
    }
    return false;
  }


  public register(data: any): Observable<any> {
    const url = `${URL_SERVICES}auth/register`;
    return this._http.post(url, data).pipe(
      map((resp: any) => {
        console.log(resp);
        return resp;
      }),
      catchError((err: any) => {
        console.log(err);
        return of(err);
      })
    )
  }


  public verifyEmail(code: string): Observable<any> {
    const url = `${URL_SERVICES}auth/login/verify-email`;
    return this._http.post(url, { code }).pipe(
      map((resp: any) => {
        console.log(resp);
        return resp;
      }),
      catchError((err: any) => {
        console.log(err);
        return of(err);
      })
    )
  }


  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.token = '';
    this.user = null;

    this._router.navigate(['/login']);
  }
}
