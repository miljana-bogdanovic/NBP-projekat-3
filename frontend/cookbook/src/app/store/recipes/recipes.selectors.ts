import { createSelector } from '@ngrx/store';
import { Recipe } from '../../models/recipe.model';
import { AppState } from '../app.state';
import { RecipesState } from './recipes.reducer';

export const selectRecipesFeature = createSelector(
  (state: AppState) => state.recipes,
  (recipes) => recipes
);
export const selectAllRecipes = createSelector(
  selectRecipesFeature,
  (state: RecipesState) =>
    Object.values(state.entities)
      .filter((recipe) => recipe != null)
      .map((recipe) => <Recipe>recipe)
);
export const selectAllRecipesAsDict = createSelector(
  selectRecipesFeature,
  (state: RecipesState) => state.entities
);
export const selectSelectedRecipeId = createSelector(
  selectRecipesFeature,
  (state: RecipesState) => state.selectedRecipeId
);

export const selectSelectedRecipe = createSelector(
  selectAllRecipesAsDict,
  selectSelectedRecipeId,
  (recipes, selectedRecipeId) => recipes[selectedRecipeId] ?? null
);
