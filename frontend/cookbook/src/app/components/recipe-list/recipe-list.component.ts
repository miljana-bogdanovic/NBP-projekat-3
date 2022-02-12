import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppState } from './../../store/app.state';
import { Store } from '@ngrx/store';
import { Recipe } from '../../models/recipe.model';
import { Observable, of } from 'rxjs';
import {

  selectSelectedRecipe,
} from './../../store/recipes/recipes.selectors';
import { selectRecipe } from '../../store/recipes/recipes.actions';
import { selectLoggedUserId, selectLoggedUserUsername } from '../../store/auth/auth.selector';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'cookbook-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipe: Observable<Recipe | null> = of(null);
  @Input() recipes: Observable<Recipe[] | null> = of([]);
  @Output() removeFav: EventEmitter<string>=new EventEmitter<string>();
  mine=false;
  loggedUser='';
  showRecipe = false;
  favourites : Recipe[]=[];
  inFav =false;
  constructor(private store: Store<AppState>, private userService : UserService) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
    this.store.select(selectLoggedUserUsername).subscribe((username)=> {
    this.loggedUser=username;
   
   })

   this.store.select(selectLoggedUserId).subscribe((username)=> {
    this.userService.getUserFavourites(username).subscribe((recipes)=>{
      this.favourites=recipes;
    })
   })
  
  

  
  }
  onDetailsClick(recipe: any) {
    this.showRecipe=false;
    this.store.dispatch(selectRecipe({ recipeId: recipe.toString() }));
    this.recipe = this.store.select(selectSelectedRecipe);
    this.recipe.subscribe((recipe)=> {
      this.mine=this.loggedUser===recipe?.author ? true : false;
      this.inFav=this.favourites.find(r => r.id===recipe?.id)==undefined ? false : true;
      this.showRecipe = true;
    })
    
  }
  onCloseClick(value: boolean) {
    this.showRecipe = false;
    console.log('close')
    this.store.dispatch(selectRecipe({ recipeId: '' })); // ??
  }
  onRemoveFav(id: string) {
    const i=this.favourites.findIndex(r=>r.id===id);
    this.favourites.splice(i, 1);
    this.removeFav.emit(id);
  }
}
