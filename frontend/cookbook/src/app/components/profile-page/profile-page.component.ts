import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { Review } from '../../models/review.model';
import { AppState } from '../../store/app.state';
import { selectLoggedUserId, selectLoggedUser } from '../../store/auth/auth.selector';
import { deleteFavRecipe, selectRecipesByFavourite, selectRecipesByUser } from '../../store/recipes/recipes.actions';
import { selectAllRecipes } from '../../store/recipes/recipes.selectors';
import { deleteReview, selectReviewsByUser } from '../../store/reviews/reviews.actions';
import { selectAllReviews } from '../../store/reviews/reviews.selector';

@Component({
  selector: 'rwa-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  recipes: Observable<Recipe[] | null> = of([]);
  reviews: Observable<Review[] | null> = of([]);
  deleteSubject = new Subject();
  categories: string[] = ['Recipes', 'Favourites', 'Reviews'];
  category = 'Recipes';
  loggedUserId ='';
  constructor(private store : Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectLoggedUserId).subscribe((id)=>{
      this.loggedUserId=id;
      console.log(this.loggedUserId)
      //this.store.dispatch(loadUser({userId:id}));
      if (this.category=='Recipes')
      {
        this.store.dispatch(selectRecipesByUser({userID:id}));
        this.recipes = this.store.select(selectAllRecipes);
      }

     else if(this.category=="Favourites")
     {
     this.store.dispatch(selectRecipesByFavourite({userID:id}))
     this.recipes = this.store.select(selectAllRecipes);
     }
     else {
       this.store.dispatch(selectReviewsByUser({userID:id}));
       this.reviews=this.store.select(selectAllReviews);
     }
     
      
    })
    
   
  }

  changeCategory(value : string){
    this.category=value;
    if (this.category=='Recipes')
    {
      this.store.dispatch(selectRecipesByUser({userID:this.loggedUserId}));
      this.recipes = this.store.select(selectAllRecipes);

    }

   else if(this.category=="Favourites")
   {
   this.store.dispatch(selectRecipesByFavourite({userID:this.loggedUserId}))
   this.recipes = this.store.select(selectAllRecipes);
   } else {
    this.store.dispatch(selectReviewsByUser({userID:this.loggedUserId}));
    this.reviews=this.store.select(selectAllReviews);
  }
    
  }

  onClickIzbrisi(review : Review){
    this.store.dispatch(deleteReview({id : review.id, recipeId : review.recipeId}))
  }

  onRemoveFav(id : string){
    if(this.category=="Favourites"){
      this.store.dispatch(deleteFavRecipe({recipeId : id}))
    }
  }
}
