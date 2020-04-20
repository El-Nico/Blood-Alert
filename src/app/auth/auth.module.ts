import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { RegisterDonorComponent } from './register-donor/register-donor.component';
import { RegisterHospitalComponent } from './register-hospital/register-hospital.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AuthPageRoutingModule,
    SharedModule
  ],
  declarations: [AuthPage,RegisterDonorComponent,RegisterHospitalComponent,LoginComponent]
})
export class AuthPageModule {}
