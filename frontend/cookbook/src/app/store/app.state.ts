import { AuthState } from './auth/auth.reducer';
import { RecipesState } from './recipes/recipes.reducer';
import { ReviewsState } from './reviews/reviews.reducer';

export interface AppState {
  recipes: RecipesState;
  auth : AuthState;
  reviews : ReviewsState;
}
