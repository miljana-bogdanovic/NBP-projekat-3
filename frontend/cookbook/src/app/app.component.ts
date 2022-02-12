import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { loadRecipes } from './store/recipes/recipes.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cookbook';
  constructor(private store: Store<AppState>, private router: Router) {}

  
  ngOnInit() {
    this.store.dispatch(loadRecipes());
  }
}
