import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Review } from "../../models/review.model";

export const loadReviewsSuccess = createAction(
    'Load reviews Success',
    props<{ reviews: Review[] }>()
  );
  
  export const loadReviews = createAction('Load reviews');
  
  export const selectReview = createAction(
    'Select Review',
    props<{ id: string }>()
  );

  export const selectReviewsByRecipe = createAction(
    'Select Reviews by recipe',
    props<{ id: string }>()
  );
  
  export const selectReviewsByUser = createAction(
    'Select Reviews by User',
    props<{ userID: string }>()
  );
  
  
  export const addReview = createAction(
    'Add Review',
    props<{
      id: string;
      content: string;
      grade: number;
      userID: string;
      recipeId : string;
      recipeName : string;
      recipeAuthor : string;
      recipePhoto : string;
    }>()
  );
  
  export const updateReview = createAction(
    'Update Review',
    props<{ update: Update<Review> }>()
  );
  export const deleteReview = createAction(
    'Delete Review',
    props<{ id: string, recipeId : string }>()
  );
  