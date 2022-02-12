import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Review } from '../models/review.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http : HttpClient,
    private loggedUserService : LoginService) { }

  createReview(content : string, grade : number, userID : string, recipeId : string, recipeName : string, recipeAuthor : string, recipePhoto : string)
   {
   return this.http
       .post<string>( environment.apiUrl+'/reviews/'+recipeId, {
        content: content,
        grade: grade,
        userId: userID,
        recipeId : recipeId,
        recipeName : recipeName,
        recipeAuthor : recipeAuthor,
        recipePhoto : recipePhoto
       })
       .pipe(catchError(errorHandler));
  }

  getByUserId(id : string) {
    return this.http
      .get<Review[]>(environment.apiUrl + '/reviews/user/'+id)
      .pipe(catchError(errorHandler));
  }

  getByRecipeId(id : string) {
    return this.http
      .get<Review[]>(environment.apiUrl + '/reviews/recipe/'+id)
      .pipe(catchError(errorHandler));
  }



  deleteReview(id: string, recipeId : string) {
    return this.http
      .delete(environment.apiUrl + '/reviews/' + id+'/recipe/'+recipeId)
      .pipe(catchError(errorHandler));
  }
}
const errorHandler = (error: HttpErrorResponse) => {
  const errorMessage =
    error.status === 0
      ? `Can't connect to API ${error.error}`
      : `Backend returned code ${error.status}`;
  return throwError(errorMessage);
};

