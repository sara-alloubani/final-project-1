import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup !:FormGroup;

  constructor( private router:Router,
    private _authService:AuthService,
    private formBuilder:FormBuilder
    ){}


  ngOnInit(): void {
    this.formGroup=this.formBuilder.group({

      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}'),
      ],
    ],
    });
  }
  onloginClicked()
  {
    if(this.formGroup.invalid)
    {
      this.validateFormGroup()

    }
    else
    {
      this._authService.login(this.email.value,this.password.value);

    }
  }

  validateFormGroup()
  {
    Object.keys( this.formGroup.controls).forEach(filed=>{
      const control=this.formGroup.get(filed);
      control?.markAsTouched({onlySelf:true});
    })
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
  get email()
  {
    return this.formGroup.controls['email'] as FormControl;

  }
  get password()
  {
    return this.formGroup.controls['password'] as FormControl;

  }
}
