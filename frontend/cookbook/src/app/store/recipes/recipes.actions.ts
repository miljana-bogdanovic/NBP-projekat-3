import { createAction, props } from '@ngrx/store';
import { Recipe } from '../../models/recipe.model';
import { Update } from '@ngrx/entity';
import { Ingridient } from '../../models/ingridient.model';
import { Review } from '../../models/review.model';

export const loadRecipesSuccess = createAction(
  'Load recipes Success',
  props<{ recipes: Recipe[] }>()
);

export const loadRecipes = createAction('Load recipes');

export const selectRecipe = createAction(
  'Select Recipe',
  props<{ recipeId: string }>()
);
export const addToFavourites = createAction(
  'Favourite Recipe',
  props<{ recipeId: string }>()
);
export const selectRecipesByCategory = createAction(
  'Select Recipes by Category',
  props<{ category: string }>()
);
export const selectRecipesByFavourite = createAction(
  'Select Recipes by Favourite',
  props<{ userID: string }>()
);

export const selectRecipesByUser = createAction(
  'Select Recipe by Category',
  props<{ userID: string }>()
);

export const selectedRecipeChanged = createAction(
  'Selected recipe changed'
);

export const addRecipe = createAction(
  'Add Recipe',
  props<{
    id: string;
    name: string;
    description: string;
    photo: string;
    author: string;
    category: string;
    ingredients: Ingridient[];
    reviews : Review[];
  }>()
);

export const updateRecipe = createAction(
  'Update recipe',
  props<{ update: Update<Recipe> }>()
);
export const deleteRecipe = createAction(
  'Delete recipe',
  props<{ recipeId: string, id : string }>()
);

export const deleteFavRecipe = createAction(
  'Delete recipe',
  props<{ recipeId: string }>()
);

// export const addIngridient = createAction(
//   'Add ingirdient',
//   props<{ name: string; amount: number; unit: string }>()
// );
// export const deleteIngridient = createAction(
//   'Delete ingirdient',
//   props<{ ingridientId: string }>()
// );
