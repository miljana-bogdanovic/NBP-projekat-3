import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'cookbook-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  form: FormGroup | null= null;
  submitted = false;
  imageSrc='https://www.senertec.de/wp-content/uploads/2020/04/blank-profile-picture-973460_1280.png';
  hide=true;
  errorMessage: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService : UserService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      opis: new FormControl(''),
    });
  }
  onSubmit(){
    if (!this.form?.invalid)
    {
      this.userService.createUser(this.form?.controls['username'].value,
      this.form?.controls['firstName'].value,
      this.form?.controls['lastName'].value,
      this.form?.controls['password'].value,
      this.imageSrc
      ).subscribe({
        next : (_: any)=> {
          this.router.navigateByUrl( `/login`);
        },
        error : (_ : any)=> {
          this.errorMessage = "Error, try changing the username";
        }
      })
    }
   
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

