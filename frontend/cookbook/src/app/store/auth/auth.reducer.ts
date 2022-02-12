
import {  createReducer, on, } from '@ngrx/store';
import * as Actions from './auth.actions';
import { User } from "../../models/user.model";

export interface AuthState  {
    loggedUserId: string;
    loggedUserUsername : string;
    loggedUser : User | null;
  }
  
  //const adapter = createEntityAdapter<LoggedUser>();
    
  export const getInitialState=()=>{
      return { loggedUserId : localStorage.getItem('id') ?? '' 
      , loggedUserUsername : localStorage.getItem('username') ?? '', loggedUser : null};
  }
  const initialState: AuthState = getInitialState();


  export const authReducer = createReducer(
    initialState,
    on(Actions.authenticationSuccess, (state, { id, username }) => ({
        ...state,
        loggedUserId: id,
        loggedUserUsername : username
      })),
      on(Actions.authenticationFail, (state) => ({
        ...state,
        loggedUserId: '',
        loggedUserUsername : ''
      })),
      on(Actions.logOut, (state) => ({
        ...state,
        loggedUserId: '',
        loggedUserUsername : ''
      })),
      on(Actions.logIn, (state)=>({...state}))
      ,
      on(Actions.userLoaded, (state, {user}) => ({
        ...state,
        loggedUser: user
      }))
      );

    