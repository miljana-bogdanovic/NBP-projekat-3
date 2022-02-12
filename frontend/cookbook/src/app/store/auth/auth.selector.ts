import { AppState } from "../app.state";
import { AuthState } from "./auth.reducer";
import { createSelector } from '@ngrx/store';

export const selectUserFeature = createSelector(
    (state: AppState) => state.auth,
    (auth) => auth
  );
  export const selectLoggedUserId = createSelector(
    selectUserFeature,
    (state: AuthState) => state.loggedUserId
  );
  export const selectLoggedUserUsername = createSelector(
    selectUserFeature,
    (state: AuthState) => state.loggedUserUsername
  );
  export const selectLoggedUser = createSelector(
    selectUserFeature,
    (state: AuthState) => state.loggedUser
  );
  
  