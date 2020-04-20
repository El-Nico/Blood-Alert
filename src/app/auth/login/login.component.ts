import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("hospital@hospital.com", {
        updateOn: 'blur',
        validators : [Validators.required,Validators.email]
      }),
      password: new FormControl("hospital", {
        updateOn: 'blur',
        validators : [Validators.required]
      })
    })
  }

  onSubmitLoginForm(){
    this.authService.doLogin(this.loginForm);
  }

}
