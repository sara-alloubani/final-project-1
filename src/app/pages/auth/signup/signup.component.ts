import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  color = "#cccbce";
  formGroup!: FormGroup;
  constructor(private router:Router ,private _authservice:AuthService ,private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.formGroup=this.formBuilder.group({
      name:[null,Validators.required],
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')]]
    })
  }


  onSignupClicked()
  {
    if(this.formGroup.invalid)
    {
      this.validateFormGroup()

    }else
    {


this.signup();

    }

  }
 signup()
 {

  this._authservice.signup(this.email.value,this.password.value)
  .pipe(switchMap((user: any)=>{
 return this._authservice.createUser
 (user.user.uid ,this.email.value,this.name.value);

  }))
  .subscribe(result=>{
this.router.navigate(['/home'])

  })

 }
  validateFormGroup()
  {
    Object.keys( this.formGroup.controls).forEach(filed=>{
      const control=this.formGroup.get(filed);
      control?.markAsTouched({onlySelf:true});
    })
  }

  get name()
  {
    return this.formGroup.controls['name'] as FormControl;

  }

  get email()
  {
    return this.formGroup.controls['email'] as FormControl;

  }
  get password()
  {
    return this.formGroup.controls['password'] as FormControl;

  }

  getEmailErrorMessage()
  {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';

  }

  getPasswordErrorMessage()
  {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return  'Not a valid password' ;

  }

}
