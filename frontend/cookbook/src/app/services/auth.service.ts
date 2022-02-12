import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user='';

  isAuthorized() {
    if(this.user=='' && localStorage.getItem('user')!=null)
        this.user= localStorage.getItem('user' ) || '' ;
      return !!this.user;
  }

  logout() {
    this.user = '';
  }
}
