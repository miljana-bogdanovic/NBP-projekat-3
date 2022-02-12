import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';


@Component({
  selector: 'cookbook-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe | null = null;
  @Output() recipeSelected: EventEmitter<string> = new EventEmitter<string>();
  isHovered = false;
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isHovered=false;
   
  }
  onClickDetalji() {
    if (this.recipe) this.recipeSelected.emit(this.recipe.id);
  }
}
