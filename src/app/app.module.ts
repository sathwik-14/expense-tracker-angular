import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './common_component/login/login.component';
import { CardComponent } from './card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig,GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';

import {  MSAL_INSTANCE, MsalModule, MsalService } from "@azure/msal-angular";
import {  IPublicClientApplication,  PublicClientApplication } from "@azure/msal-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function MSALInstanceFactory():IPublicClientApplication{
  return new PublicClientApplication({
    auth:{
      clientId:'a0ea4061-3a36-4b74-a0e2-46cc41982221',
      redirectUri:'http://localhost:4200',
      authority: '887aa0fa-80f4-4405-b6f0-91b25cfe11c0'
    }
  })
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    MsalModule,
    BrowserAnimationsModule,
   
  ],
  providers:  [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '4327640465-33ug6nijmjov0h4skdio96l47r79a2am.apps.googleusercontent.com'
            )
          },
          // {
          //   id: FacebookLoginProvider.PROVIDER_ID,
          //   provider: new FacebookLoginProvider('clientId')
          // }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    MsalService,
    {
      provide:MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },   

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
