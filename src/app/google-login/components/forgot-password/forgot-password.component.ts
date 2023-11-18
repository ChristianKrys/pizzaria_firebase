import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public email: string = '';

  constructor(private loginService: LoginService){}


  ngOnInit(): void {}


  forgotPassword(){
    this.loginService.forgotPassword(this.email);
    this.email = '';
  }

}
