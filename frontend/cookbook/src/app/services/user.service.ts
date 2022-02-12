import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Recipe } from '../models/recipe.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient,
    private loggedUserService : LoginService) { }

  createUser(username : string, firstName : string, lastName : string, password : string, image : string)
   {
   return this.http
       .post<string>( environment.apiUrl+'/users', {
         username : username,
         name : firstName,
         lastName : lastName,
         photo : image,
         password : password
       })
       
  }

  getUser(userId:any){
    //console.log(userId)
    return this.http
    .get<any>( environment.apiUrl+'/users/'+userId.userId);
    
}

addToFavorites(id : string, recipeId : string){
  return this.http
  .post<string>( environment.apiUrl+'/users/'+id+'/favourite/'+recipeId, {
   
  })
}

deleteFromFavourites(id : string, recipeId : string){
  return this.http
  .put(environment.apiUrl + '/users/' + id+'/favourite/'+recipeId, {
    
  })
  .pipe(catchError(errorHandler));
}

getUserFavourites(id : string){
  return this.http
    .get<any>( environment.apiUrl+'/users/'+id +'/favourite');
}
}
const errorHandler = (error: HttpErrorResponse) => {
  const errorMessage =
    error.status === 0
      ? `Can't connect to API ${error.error}`
      : `Backend returned code ${error.status}`;
  return throwError(errorMessage);

};

