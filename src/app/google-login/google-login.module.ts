import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleLoginRoutingModule } from './google-login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { PhoneNumberComponent } from './components/phone-number/phone-number.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    PhoneNumberComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GoogleLoginRoutingModule,
    AngularFireAuthModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ]
})
export class GoogleLoginModule { }
