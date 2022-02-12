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
import { ReviewService } from '../../services/review.service';
import { AppState } from '../app.state';
import * as ReviewActions from './reviews.actions';
@Injectable()
export class ReviewsEffect {
  constructor(
    private reviewService: ReviewService,
    private actions$: Actions,
    private router: Router,
    private store : Store<AppState>
  ) {}

  loadByUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewActions.selectReviewsByUser),
      mergeMap((payload) =>
        this.reviewService.getByUserId(payload.userID).pipe(
          map((reviews) => ReviewActions.loadReviewsSuccess({ reviews })),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );

  loadByRecipeEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewActions.selectReviewsByRecipe),
      mergeMap((payload) =>
        this.reviewService.getByRecipeId(payload.id).pipe(
          map((reviews) => ReviewActions.loadReviewsSuccess({ reviews })),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );


  addReview$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReviewActions.addReview),
        concatMap((action) =>
          this.reviewService.createReview(
            action.content,
            action.grade,
            action.userID,
            action.id,
            action.recipeName,
            action.recipeAuthor,
            action.recipePhoto
          )
        ),
        tap(() => this.router.navigateByUrl('/recipes'))
      ),
    { dispatch: false }
  );

  deleteReview$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReviewActions.deleteReview),
        concatMap((action) => this.reviewService.deleteReview(action.id, action.recipeId))
      ),
    { dispatch: false }
  );

 
}
