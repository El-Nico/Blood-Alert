import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from 'src/app/database/db.service';
import { PlaceLocation } from 'src/app/database/models/models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-hospital',
  templateUrl: './register-hospital.component.html',
  styleUrls: ['./register-hospital.component.scss'],
})
export class RegisterHospitalComponent implements OnInit {
  
  registerHospitalForm: FormGroup

  constructor(
    private dbService: DbService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.registerHospitalForm = new FormGroup({
      name: new FormControl("hospital", {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      email: new FormControl("hospital@hospital", {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl("hospital", {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      location: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    })
  }

  onSubmitRegisterHospitalForm() {
    this.authService.doRegister(this.registerHospitalForm, "hospital");
  }

  onLocationPicked(location: PlaceLocation) {
    this.registerHospitalForm.patchValue({ location: location });
  }
}
