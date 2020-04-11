import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyAcXKE-QRPY4-PDoR-KW7HK0Z1b7JV9leo';
  
  userToken: string;

  //Crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient) {
    this.readToken();
  }

  logOut(){
    localStorage.removeItem('token');
  }

  loging( user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/accounts:signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(
      map( resp => {
        this.saveToken(resp['idToken']);
        return resp;
      })
    );
  }

  newUser( user: UserModel) {
    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/accounts:signUp?key=${this.apiKey}`,
      authData
    ).pipe(
      map( resp => {
        this.saveToken(resp['idToken']);
        return resp;
      })
    );
  }

  private saveToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let today = new Date();
    today.setSeconds( 3600 );

    localStorage.setItem('expire', today.getTime().toString());
  }
  
  readToken() {
    if (localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  isAuthenticate(): boolean {
    if( this.userToken.length < 2 ) {
      return false;
    }

    const expire = +localStorage.getItem('expire');
    const expireDate = new Date();

    if( expireDate > new Date() ) {
      return true;
    } else {
      return false;
    }
  }
}
