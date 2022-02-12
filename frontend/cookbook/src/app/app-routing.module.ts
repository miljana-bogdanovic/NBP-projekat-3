import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { ReviewAddComponent } from './components/review-add/review-add.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { AuthGuard } from './auth/auth.guard';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    //canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    component: HomePageComponent,
  },
  {
    path: 'recipe',
    //canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    component: RecipeDetailComponent,
  },
  {
    path: 'edit',
   // canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    component: RecipeEditComponent,
  },
  {
    path : 'review',
    //canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    component : ReviewAddComponent
  },
  {
    path : 'profile',
    //canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    component : ProfilePageComponent
  },
  { path: '**', redirectTo: 'recipes' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
