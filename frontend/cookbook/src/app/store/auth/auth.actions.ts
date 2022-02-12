import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const authenticationSuccess = createAction(
    'Authentication Success',
    props<{ id: string, username : string }>()
  );

  export const authenticationFail = createAction(
    'Authentication Fail'
  );
  export const logOut = createAction(
    'Log out'
  );

  export const logIn= createAction(
      'Log in',
      props<{ username: string, password : string }>()
  );

  export const loadUser= createAction(
    'User loaded',
    props<{ userId : string }>()
);
  export const userLoaded= createAction(
    'User loaded',
    props<{ user : User }>()
);