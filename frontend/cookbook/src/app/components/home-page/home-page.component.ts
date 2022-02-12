import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { AppState } from '../../store/app.state';
import { loadRecipes, selectRecipesByCategory } from '../../store/recipes/recipes.actions';
import { selectAllRecipes } from '../../store/recipes/recipes.selectors';

@Component({
  selector: 'cookbook-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  recipes: Observable<Recipe[] | null> = of([]);
  categories: string[] = ['none','beginer', 'intermediate', 'advanced'];
  category = 'none';
  constructor(private store : Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadRecipes());
    this.recipes = this.store.select(selectAllRecipes);
    
   
  }

  changeCategory(value : string){
    this.category=value;
    if (value!='none')

      this.store.dispatch(selectRecipesByCategory({ category: this.category}))

    else{
      this.store.dispatch(loadRecipes());
    }
    this.store.select(selectAllRecipes);
  }

}
