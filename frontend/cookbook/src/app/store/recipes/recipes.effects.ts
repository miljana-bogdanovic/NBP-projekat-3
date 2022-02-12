import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  tap,
} from 'rxjs/operators';
import { RecipesService } from '../../services/recipes.service';
import { AppState } from '../app.state';
import * as RecipeActions from './recipes.actions';

@Injectable()
export class RecipesEffect {
  constructor(
    private recipesService: RecipesService,
    private actions$: Actions,
    private router: Router,
    private store : Store<AppState>
  ) {}

  loadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.loadRecipes),
      mergeMap(() =>
        this.recipesService.getAll().pipe(
          map((recipes) => RecipeActions.loadRecipesSuccess({ recipes })),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );

  loadByCategoryEffect$ = createEffect(() =>
  this.actions$.pipe(
    ofType(RecipeActions.selectRecipesByCategory),
    mergeMap((category ) =>
      this.recipesService.getByCategory(category.category).pipe(
        map((recipes) => RecipeActions.loadRecipesSuccess({ recipes })),
        catchError(() => of({ type: 'load error' }))
      )
    )
  )
);

loadByUserEffect$ = createEffect(() =>
this.actions$.pipe(
  ofType(RecipeActions.selectRecipesByUser),
  mergeMap((payload) =>
    this.recipesService.getByUserId(payload.userID).pipe(
      map((recipes) => RecipeActions.loadRecipesSuccess({ recipes })),
      catchError(() => of({ type: 'load error' }))
    )
  )
)
);

loadByFavouritesEffect$ = createEffect(() =>
this.actions$.pipe(
  ofType(RecipeActions.selectRecipesByFavourite),
  mergeMap((payload) =>
    this.recipesService.getByFavourites(payload.userID).pipe(
      map((recipes) => RecipeActions.loadRecipesSuccess({ recipes })),
      catchError(() => of({ type: 'load error' }))
    )
  )
)
);

  addRecipe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipeActions.addRecipe),
        concatMap((action) =>
          this.recipesService.addRecipe(
            action.name,
            action.description,
            action.photo,
            action.author,
            action.category,
            action.ingredients
          )
        ),
        tap(() => this.router.navigateByUrl('/recipes'))
      ),
    { dispatch: false }
  );

  deleteRecipe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipeActions.deleteRecipe),
        concatMap((action) => this.recipesService.deleteRecipe(action.recipeId, action.id))
      ),
    { dispatch: false }
  );

  updateRecipe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipeActions.updateRecipe),
        concatMap((action) =>
          this.recipesService.updateRecipe(
            action.update.id.toString(),
            action.update.changes
          )
        ),
        tap(() => this.router.navigateByUrl('/recipes'))
      ),
    { dispatch: false }
  );

  onSelectRecipe$ = createEffect(
    () =>
    this.actions$.pipe(
      ofType(RecipeActions.selectRecipe),
      map((action) =>
        this.store.dispatch(RecipeActions.selectedRecipeChanged())
      )
    ),
  { dispatch: false }
  )
}
