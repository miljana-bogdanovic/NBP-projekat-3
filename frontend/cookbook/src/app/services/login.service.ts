import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoggedUser } from '../models/logged.user.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })
export class LoginService {
  loggedUser: Subject<LoggedUser | null> = new Subject<LoggedUser | null>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,

  ) {}

  getLoggedUser(){
    //localStorage.setItem('user', 'miljana');
   return localStorage.getItem('username') || '';
  }

  getToken(){
    return localStorage.getItem('token') || '';
  }
  loginUser(username: string, password: string) {
    return this.http
      .post<{
        user : User
      }>(`${environment.apiUrl}/login`, {
        username: username,
        password: password,
      })
      // .pipe(
      //   tap((loggingData) => {
      //     if (loggingData.token !== null) {
      //       const loggedUser: LoggedUser = new LoggedUser(
      //        username,
      //         loggingData.token,
      //      );
      //      this.loggedUser.next(loggedUser);
      //       localStorage.setItem('user', loggedUser.username);
      //       localStorage.setItem('token', loggedUser.Token);
      //       this.router.navigateByUrl('/home');
      //     }
      //   })
      // );
  }



  logout() {
    //this.authService.logout();
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


}
