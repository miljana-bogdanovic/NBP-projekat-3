import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './../models/recipe.model';
import { environment } from './../../../src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { addRecipe } from '../store/recipes/recipes.actions';
import { Ingridient } from '../models/ingridient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http
      .get<Recipe[]>(environment.apiUrl + '/recipes')
      .pipe(catchError(errorHandler));
  }

  getByCategory(category : string) {
    return this.http
      .get<Recipe[]>(environment.apiUrl + '/recipes/category/'+category)
      .pipe(catchError(errorHandler));
  }

  getByUserId(id : string) {
    return this.http
      .get<Recipe[]>(environment.apiUrl + '/users/'+id+'/recipes')
      .pipe(catchError(errorHandler));
  }

  getByFavourites(id : string) {
    return this.http
      .get<Recipe[]>(environment.apiUrl + '/users/'+id+'/favourite')
      .pipe(catchError(errorHandler));
  }

  addRecipe(
    name: string,
    description: string,
    photo: string,
    author: string,
    category: string,
    ingredients: Ingridient[]
  ) {
    return this.http
      .post(environment.apiUrl + '/recipes', { 
        description,
        photo,
        name,
        author,
        category,
        ingredients,
      })
      .pipe(catchError(errorHandler));
  }

  updateRecipe(recipeId: string, changes: Partial<Recipe>) {
    console.log(changes);
    return this.http
      .put(environment.apiUrl + '/recipes/' + recipeId, changes)
      .pipe(catchError(errorHandler));
  }
  // addIngridient(recipeId: string, name: string, amount: number, unit: string) {
  //   return this.http
  //     .patch(environment.apiUrl + '/recipes/ingridient/' + recipeId, {
  //       name,
  //       amount,
  //       unit,
  //     })
  //     .pipe(catchError(errorHandler));
  // }
  // deleteIngridient(recipeId: string, ingridientId: string) {
  //   return this.http
  //     .patch(
  //       environment.apiUrl +
  //         '/recipes/ingridient/' +
  //         recipeId +
  //         '/' +
  //         ingridientId,
  //       {}
  //     )
  //     .pipe(catchError(errorHandler));
  //}
  deleteRecipe(recipeId: string, id : string) {
    return this.http
      .delete(environment.apiUrl + '/recipes/' + recipeId+'/author/'+id)
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
