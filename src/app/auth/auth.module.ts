import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { RegisterDonorComponent } from './register-donor/register-donor.component';
import { RegisterHospitalComponent } from './register-hospital/register-hospital.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule
  ],
  declarations: [AuthPage,RegisterDonorComponent,RegisterHospitalComponent]
})
export class AuthPageModule {}
