import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loginSignup=true;
  notAMember=false;
  registerDonor=false;
  registerHospital=false;
  onClickNotAMember(){
    this.notAMember=true;
    //this.loginSignup=false;
  }
  showRegisterDonor(){
    this.notAMember=false
    this.registerDonor=true;
  }
  showRegisterHospital(){
    this.notAMember=false;
    this.registerHospital=true;
  }
}
