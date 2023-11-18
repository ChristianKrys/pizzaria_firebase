import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public email: string = '';
  public password: string = '';

  constructor(private loginService: LoginService){}


  ngOnInit(): void { }


  register(){

    if(this.email == ''){
      alert('Please enter email');
      return;
    }
    if(this.password == ''){
      alert('Please enter password');
      return;
    }

    this.loginService.register(this.email,this.password);
    this.email = '';
    this.password = '';
    
  }





}
