import { createSelector } from '@ngrx/store';
import { Review } from '../../models/review.model';
import { AppState } from '../app.state';
import { ReviewsState } from './reviews.reducer';

export const selectReviewsFeature = createSelector(
  (state: AppState) => state.reviews,
  (reviews) => reviews
);
export const selectAllReviews = createSelector(
    selectReviewsFeature,
  (state: ReviewsState) =>
    Object.values(state.entities)
      .filter((reviews) => reviews != null)
      .map((reviews) => <Review>reviews)
);

