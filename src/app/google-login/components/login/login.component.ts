import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { WindowService } from '../../services/window.service';
import { RecaptchaVerifier, Auth } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public password: string = '';


  public phoneNumber: string = '';
  public otp: string = '';
  public windowRef: any;


  constructor(
              private angularFireAuth: AngularFireAuth,
              private loginService: LoginService) 
              {}



  ngOnInit(): void { }


  login(){

    if(this.email == ''){
      alert('Please enter email');
      return;
    }
    if(this.password == ''){
      alert('Please enter password');
      return;
    }

    this.loginService.login(this.email,this.password);
    this.email = '';
    this.password = '';
    
  }


  singnInWithGoogle(){
    this.loginService.singnInWithGoogle();
  };





}
