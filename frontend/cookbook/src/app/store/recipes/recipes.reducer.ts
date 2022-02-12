import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../../models/recipe.model';
import * as Actions from './recipes.actions';

export interface RecipesState extends EntityState<Recipe> {
  selectedRecipeId: string;
}

const adapter = createEntityAdapter<Recipe>();

const initialState: RecipesState = adapter.getInitialState({
  selectedRecipeId: '',
});

export const recipesReducer = createReducer(
  initialState,
  on(Actions.loadRecipesSuccess, (state, { recipes }) =>
    adapter.setAll(recipes, state)
  ),
  on(Actions.addRecipe, (state, action) => {
    return adapter.addOne(
      new Recipe(
        action.id,
        action.name,
        action.description,
        action.photo,
        action.author,
        action.category,
        action.ingredients,
        action.reviews
      ),
      state
    );

  }),
  on(Actions.updateRecipe, (state, action) => {
    return adapter.updateOne(action.update, state);
  }),
  on(Actions.selectRecipe, (state, { recipeId }) => ({
    ...state,
    selectedRecipeId: recipeId,
  })),
  on(Actions.deleteRecipe, (state, action) => {
    return adapter.removeOne(action.recipeId, state);
  }),
  on(Actions.deleteFavRecipe, (state, action) => {
    return adapter.removeOne(action.recipeId, state);
  })
);
