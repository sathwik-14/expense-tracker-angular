import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
import { MsalService } from '@azure/msal-angular';
import {
  AuthenticationResult,

} from '@azure/msal-browser';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loading = false;
  drop =false;
  user!: SocialUser;
  msalBroadcastService: any;
  loggedIn!: boolean;
  errMsg = '';
  public signInForm!: FormGroup;
  public signUpForm!: FormGroup;
  constructor(
    readonly builder: FormBuilder,
    private authService: SocialAuthService,
    private msalService: MsalService,
    private http: HttpClient,
    private toast: NgToastService,
    private route:Router
  ) {
    this.signInForm = this.builder.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
          Validators.required,
        ],
      ],
    });

    this.signUpForm = this.builder.group({
      name: this.builder.group({
        fName: [
          '',
          [
            Validators.minLength(1),
            Validators.maxLength(20),
            Validators.required,
          ],
        ],
        lName: [
          '',
          [
            Validators.minLength(1),
            Validators.maxLength(20),
            Validators.required,
          ],
        ],
      }),
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
          Validators.required,
        ],
      ],
      isAgreed: [],
    });
  }

  // get the signInPassword for error checking
  get signInpassword() {
    return this.signInForm.get('password');
  }

  // get the signupPassword for error checking
  get signUpPassword() {
    return this.signUpForm.get('password');
  }


  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
    this.msalService.instance
    .initialize()
    .then(() => {
    // MSAL is now initialized, you can make MSAL API calls here if needed.
    })
    .catch((error) => {
      console.error("MSAL initialization error", error);
    });
  }

  microsoftLogin() {
    this.msalService.instance.loginPopup({
      scopes: ["User.Read"],
    }).then((res: AuthenticationResult) => {
      console.log(res);
      
    });
    
  }



  onSubmit() {
    this.loading = true;
    if (!this.drop) {
      const signInObj = {
        email: this.signInForm.value.email,
        password:this.signInForm.value.password
      }
      this.http.post('https://j7zbx560-3000.asse.devtunnels.ms/auth/login', signInObj).subscribe((res:any) => {
        if (res.success) {
          this.loading = false;
          this.toast.success({detail:'Success',summary:'Login Suceessfull'})
          this.route.navigate(['home']);

        }
        else {
          this.loading = false;
          this.errMsg = res.msg;
          this.toast.error({detail:'Error Message',summary:this.errMsg})
        }
      }
        
      )
      return;
      
    }
    const obj = {
      fn: this.signUpForm.value.name.fName,
      ln: this.signUpForm.value.name.lName,
      email: this.signUpForm.value.email,
      password:this.signUpForm.value.password
    }
    
    this.http.post('https://j7zbx560-3000.asse.devtunnels.ms/auth/register', obj).subscribe((res:any)=> {
      if (res.success) {
        this.loading = false;
        this.toast.success({ detail: 'Success', summary: 'SignUp successfull' })
        this.drop = !this.drop;
      }
      else {
        this.loading = false;
        this.errMsg = res.msg;
        this.toast.error({detail:'Error Message',summary:this.errMsg})
      }
      
    })
  }

  resetForm(form:string) {
    form === 'signUp' ? this.signUpForm.reset() : this.signInForm.reset();
  }
}
