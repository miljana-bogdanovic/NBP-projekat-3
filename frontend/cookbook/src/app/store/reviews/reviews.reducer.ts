import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Review } from '../../models/review.model';
import * as Actions from './reviews.actions';

export interface ReviewsState extends EntityState<Review> {
    selectedReviewId : string;
}

const adapter = createEntityAdapter<Review>();

const initialState: ReviewsState = adapter.getInitialState({
    selectedReviewId: '',
});

export const reviewsReducer = createReducer(
  initialState,
  on(Actions.loadReviewsSuccess, (state, { reviews }) =>
    adapter.setAll(reviews, state)
  ),
  on(Actions.addReview, (state, action) => {
    return adapter.addOne(
      new Review(
          action.id,
        action.content,
        action.grade,
        action.userID,
        action.recipeId,
        action.recipeName,
        action.recipeAuthor,
        action.recipePhoto
      ),
      state
    );

  }),
  on(Actions.deleteReview, (state, action) => {
    return adapter.removeOne(action.id, state);
  })
);
