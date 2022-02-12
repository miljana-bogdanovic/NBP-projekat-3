import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { StoreModule } from '@ngrx/store';
import { recipesReducer } from './store/recipes/recipes.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RecipesEffect } from './store/recipes/recipes.effects';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { UpozorenjeDialogComponent } from './components/upozorenje-dialog/upozorenje-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReviewAddComponent } from './components/review-add/review-add.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffect } from './store/auth/auth.effects';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ReviewsEffect } from './store/reviews/reviews.effects';
import { reviewsReducer } from './store/reviews/reviews.reducer';
@NgModule({
  declarations: [
    AppComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeEditComponent,
    NavbarComponent,
    RecipeDetailComponent,
    UpozorenjeDialogComponent,
    ReviewAddComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    ProfilePageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    StoreModule.forRoot({ recipes: recipesReducer, auth: authReducer, reviews: reviewsReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot([RecipesEffect, AuthEffect, ReviewsEffect]),
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
