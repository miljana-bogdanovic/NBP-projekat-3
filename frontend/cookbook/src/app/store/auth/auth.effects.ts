import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { User } from "../../models/user.model";
import { LoginService } from "../../services/login.service";
import { UserService } from "../../services/user.service";
import { AppState } from "../app.state";
import * as AuthActions from './auth.actions'
import { authenticationSuccess } from "./auth.actions";

@Injectable()
export class AuthEffect {
  constructor(
      private store : Store<AppState>,
    private loggedUserService: LoginService,
    private actions$: Actions,
    private router: Router,
    private userService : UserService
  ) {}

  loadEffect$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.logIn),
    mergeMap((userInfo : any) =>
    this.loggedUserService.loginUser(userInfo.username, userInfo.password).pipe(
        map(( loggingData ) => {
            
            return handleAuthentication(
              loggingData, this.store, this.router
            );
            
        })
        // ,
        // catchError(() => {
        //     return AuthActions.authenticationFail;
        //   })
      ))
  ),
  //{ dispatch: true }
);

loadUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      mergeMap((userId : any) =>
        this.userService.getUser(userId).pipe(
          map((user) => 
          {
            return  AuthActions.userLoaded({user});
          })
          //,
         // catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );
}



const handleAuthentication = ( loggingData : any, store : Store<AppState>, router : Router
  ) => {
    console.log("HANDLE")
      console.log((<User>loggingData).id)
            const loggedUser: User =loggingData;
            localStorage.setItem('username', loggedUser.username);
            localStorage.setItem('id', loggedUser.id);

            store.dispatch( authenticationSuccess({
        id: (<User>loggingData).id,  username: (<User>loggingData).username, 
      }));
       router.navigateByUrl('/home');
      return  AuthActions.authenticationSuccess({
        id: (<User>loggingData).id,  username: (<User>loggingData).username, });
}
  

