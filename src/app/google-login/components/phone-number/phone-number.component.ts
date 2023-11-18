import { Component } from '@angular/core';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss']
})
export class PhoneNumberComponent {

  public phoneNumber: string = '';
  public otp: string = '';
  public windowRef: any;

  constructor(){}


}
