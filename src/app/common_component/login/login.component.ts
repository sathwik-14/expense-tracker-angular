import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
import { MsalService } from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionStatus,
  PopupRequest,
} from '@azure/msal-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  drop =false;
  user!: SocialUser;
  msalBroadcastService: any;
  loggedIn!: boolean;
  public signInForm!: FormGroup;
  public signUpForm!: FormGroup;
  constructor(
    readonly builder: FormBuilder,
    private authService: SocialAuthService,
    private msalService: MsalService
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

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
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
    if (!this.drop) {
      console.log(this.signInForm.value);
    }
    console.log(this.signUpForm.value);
  }

  resetForm(form:string) {
    form === 'signUp' ? this.signUpForm.reset() : this.signInForm.reset();
  }
}
