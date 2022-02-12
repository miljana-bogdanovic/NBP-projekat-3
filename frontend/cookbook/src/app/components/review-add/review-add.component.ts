import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Recipe } from '../../models/recipe.model';
import { Review } from '../../models/review.model';
import { ReviewService } from '../../services/review.service';
import { AppState } from '../../store/app.state';
import { selectLoggedUserId, selectLoggedUserUsername } from '../../store/auth/auth.selector';
import { updateRecipe } from '../../store/recipes/recipes.actions';
import {
  selectSelectedRecipe
} from '../../store/recipes/recipes.selectors';

@Component({
  selector: 'cookbook-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.scss'],
})
export class ReviewAddComponent implements OnInit {
  reviewForm: FormGroup | null = null;
  recipe: Recipe | null = null;
  loggedUserId ='';
  constructor(private store: Store<AppState>, private router: Router, private reviewService : ReviewService) {}

  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      grade: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]),
      comment: new FormControl(null, Validators.required),
    });
    this.store
      .select(selectSelectedRecipe)
      .subscribe((recipe: Recipe | null) => {
        this.recipe = recipe;
      });
      this.store.select(selectLoggedUserId)
      .subscribe((id : string )=> {
        this.loggedUserId=id;
        console.log(this.loggedUserId)
      });
  }
  onSubmit() {
    if (this.recipe) {
      // const update: Update<Recipe> = {
      //   id: this.recipe.id,
      //   changes: {
      //     ...this.recipe,
      //   },
      // };
     
        this.reviewService.createReview( this.reviewForm?.get('comment')?.value,
               this.reviewForm?.get('grade')?.value,
               this.loggedUserId,
               this.recipe?.id ?? '',
               this.recipe?.name,
               this.recipe?.author,
               this.recipe?.photo).subscribe(()=>{
                this.router.navigate(['/recipes']);
               });
        //
        // update.changes.reviews = this.recipe?.reviews.concat([
        //   new Review(
        //     '',
        //     this.reviewForm?.controls.comment.value,
        //     this.reviewForm?.controls.grade.value,
        //     this.loggedUserId
        //   ),
        // ]);
        // this.store.dispatch(
        //   updateRecipe({
        //     update,
        //   })
        // );

    
     

    }
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }
}
