import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../../models/recipe.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  addRecipe,
  updateRecipe,
} from '../../store/recipes/recipes.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { selectSelectedRecipe } from '../../store/recipes/recipes.selectors';
import { Update } from '@ngrx/entity';
import { Ingridient } from '../../models/ingridient.model';
import { UpozorenjeDialogComponent } from '../upozorenje-dialog/upozorenje-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {  selectLoggedUserUsername } from '../../store/auth/auth.selector';
@Component({
  selector: 'cookbook-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  loggedUser ='';
  recipeForm: FormGroup | null = null;
  recipe: Recipe | null = null;
  newIngridient = false;
  category: string[] = ['beginer', 'intermediate', 'advanced'];
  units : string[]= ['grams', 'ml', 'cup', 'tsp', 'tbsp', 'piece'];
  imageSrc='https://static.thenounproject.com/png/558642-200.png';
  ingridients: Ingridient[] = [];
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      nameIng: new FormControl(null, Validators.required),
      unit: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });

    this.route.queryParams.subscribe((params) => {
      if (params['new'] == 'false') {
        this.store
          .select(selectSelectedRecipe)
          .subscribe((recipe: Recipe | null) => {
            this.recipe = recipe;
          });
         
      } else {
        this.recipe = null;
        this.recipeForm?.reset();
      }
      this.store.select(selectLoggedUserUsername)
      .subscribe((id : string )=> {
        this.loggedUser=id;
        console.log(this.loggedUser)
      });
    });
    if (this.recipe) {
      this.recipeForm.patchValue({
        name: this.recipe.name,
        description: this.recipe.description,
        category: this.recipe.category,
      });
      this.ingridients = this.recipe.ingredients.slice();
      this.imageSrc=this.recipe.photo;
    }
  }
  onSubmit() {
    if (!this.recipe)
      this.store.dispatch(
        addRecipe({
          id: '',
          name: this.recipeForm?.get('name')?.value,
          description: this.recipeForm?.get('description')?.value,
          photo: this.imageSrc,
          author:this.loggedUser,
          category: this.recipeForm?.get('category')?.value,
          ingredients: this.ingridients,
          reviews : []
        })
      );
    else if (this.recipeForm) {
      const update: Update<Recipe> = {
        id: this.recipe.id,
        changes: {
          ...this.recipe,
          ...this.recipeForm.value,
        },
      };
      update.changes.ingredients = this.ingridients.slice();
      this.store.dispatch(
        updateRecipe({
          update,
        })
      );
    }
    this.router.navigate(['/recipes']);
  }
  onCancel() {
    this.router.navigate(['/recipes']);
  }

  addNewIngridient() {
    this.newIngridient = true;
  }
  addIngridient() {
    this.ingridients.push(
      new Ingridient(
        '',
        this.recipeForm?.get('nameIng')?.value,
        this.recipeForm?.get('amount')?.value,
        this.recipeForm?.get('unit')?.value
      )
    );
  }
  deleteIngridient(index: number) {
    const dialogRef = this.dialog.open(UpozorenjeDialogComponent, {
      data: {
        pitanje: `Deleting ingredient ${this.ingridients[index].name}. Are you sure?`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.ingridients.splice(index, 1);
      }
    });
  }

  handleInputChange(e:any) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e:any) {
    const reader = e.target;
    this.imageSrc = reader.result;
  }
}
