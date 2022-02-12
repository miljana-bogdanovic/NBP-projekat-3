import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { deleteRecipe,  } from '../../store/recipes/recipes.actions';
import { MatDialog } from '@angular/material/dialog';
import { UpozorenjeDialogComponent } from '../upozorenje-dialog/upozorenje-dialog.component';
import { Actions } from '@ngrx/effects';
import { selectLoggedUserId, selectLoggedUserUsername } from '../../store/auth/auth.selector';
import { UserService } from '../../services/user.service';
import { selectReviewsByRecipe } from '../../store/reviews/reviews.actions';
import { selectAllReviews } from '../../store/reviews/reviews.selector';
import { Review } from '../../models/review.model';


@Component({
  selector: 'cookbook-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe | null = null;
  reviews : Review[]=[];
  @Output() closeRecipe: EventEmitter<boolean>=new EventEmitter<boolean>();
  @Output() removeFav: EventEmitter<string>=new EventEmitter<string>();
  @Input() mine =false;;
  add =false;
  loggedUser='';
  @Input() inFav=false;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private userService : UserService
  ) {}

  ngOnInit(): void {
    this.add=this.inFav;
    this.store.select(selectLoggedUserId).subscribe((username)=> {
      this.loggedUser=username;
     }).unsubscribe();
     this.store.dispatch(selectReviewsByRecipe({id : this.recipe?.id ?? ''}))
     this.store.select(selectAllReviews).subscribe((reviews)=>{
       this.reviews=reviews;
     })
    }

    ngOnChanges():void{
      this.add=this.inFav;
      this.store.dispatch(selectReviewsByRecipe({id : this.recipe?.id ?? ''}))
      this.store.select(selectAllReviews).subscribe((reviews)=>{
        this.reviews=reviews;
      })
    }
  onClickIzmeni() {
    this.router.navigate(['edit'], { queryParams: { new: 'false' } });
  }
  onClickIzbrisi() {
    if (this.recipe) {
      const dialogRef = this.dialog.open(UpozorenjeDialogComponent, {
        data: { pitanje: `Deleting recipe ${this.recipe.name}. Are you sure?` },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == 'true') {
          if (this.recipe)
            this.store.dispatch(deleteRecipe({ recipeId: this.recipe.id ,id :  this.loggedUser}));
          this.close();
        }
      });
    }
  }
  close() {
    //console.log('close')
    this.closeRecipe.emit(true);
  }
  onClickAddReview() {
    this.router.navigate(['review']);
  }

  onClickFavourite(){
    if (this.recipe)
    this.userService.addToFavorites(this.loggedUser,this.recipe.id).subscribe((res)=>{
      console.log(res)
    });
    //this.inFav=!this.inFav;
    this.add=!this.add;
  }

  onClickNotFavourite(){
    if (this.recipe)
    this.userService.deleteFromFavourites(this.loggedUser,this.recipe.id).subscribe((res)=>{
      console.log(res)
    });
    //this.inFav=!this.inFav;
    this.add=!this.add;
    this.removeFav.emit(this.recipe?.id);
  }
}
