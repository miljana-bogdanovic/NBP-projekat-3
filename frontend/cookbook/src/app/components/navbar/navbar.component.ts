import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { logOut } from '../../store/auth/auth.actions';
import { selectLoggedUserId } from '../../store/auth/auth.selector';

@Component({
  selector: 'cookbook-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  logged = false;
  constructor(private router: Router, private store : Store<AppState>) {
    this.store.select(selectLoggedUserId).subscribe((id : string)=> {
      this.logged= id != '' ? true : false;
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}
  dodajNovi() {
    this.router.navigate([
    'edit'
    ],
    { queryParams: { new: 'true' } })
  }

  logout(){
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    this.store.dispatch(logOut());
    this.router.navigateByUrl('/login')
  }
}
