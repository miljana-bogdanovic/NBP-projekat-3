import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { LoginService } from '../../services/login.service';
import { AppState } from '../../store/app.state';
import { authenticationSuccess, logIn } from '../../store/auth/auth.actions';


@Component({
  selector: 'cookbook-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup | null = null;
  loading = false;
  submitted = false;
  errorMessage: string | null = null;
  loginSubscription: Subscription | null = null;
  hide = true;

  constructor(private router: Router, private loginService: LoginService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  
  get f() {
    if (this.form) return this.form.controls;
    return null;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form) {
      const username=this.form.get('username')?.value;
      const password=this.form.get('password')?.value;
      this.store.dispatch(logIn({
        username, password
      }));
      // this.loginSubscription = this.loginService
      //   .loginUser(
      //     this.form.get('username')?.value,
      //     this.form.get('password')?.value
      //   )
      //   .subscribe({
      //     next: (user ) =>
      //     {
      //       this.errorMessage = null;
      //       console.log(user 
      //        )
      //       this.store.dispatch(authenticationSuccess({ loggedUserId: user.user.id }));
      //      // this.router.navigate(['/home']); 
      //     },
      //     error: (_:any)=> {
      //       this.errorMessage = "Error, try again";
      //     }
      //     });
      
    }
  }
  

  registrate(){
    this.router.navigate(['/registration']);
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    this.submitted = false;
  }
}

