import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlaceLocation } from 'src/app/database/models/models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-donor',
  templateUrl: './register-donor.component.html',
  styleUrls: ['./register-donor.component.scss'],
})
export class RegisterDonorComponent implements OnInit {
  registerDonorForm: FormGroup;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.registerDonorForm = new FormGroup({
      name: new FormControl("donor", {
        updateOn: 'blur',
        validators : [Validators.required]
      }),
      email: new FormControl("donor@donor", {
        updateOn: 'blur',
        validators : [Validators.required, Validators.email]
      }),
      password: new FormControl("donor", {
        updateOn: 'blur',
        validators : [Validators.required]
      }),
      bloodType: new FormControl("aplus", {
        updateOn: 'blur',
        validators : [Validators.required]
      })
    })
  }

  onSubmitRegisterDonorForm(){
    this.authService.doRegister(this.registerDonorForm, "donor");
  }

  onLocationPicked(location: PlaceLocation){
    this.registerDonorForm.patchValue({location:location});
  }
}
