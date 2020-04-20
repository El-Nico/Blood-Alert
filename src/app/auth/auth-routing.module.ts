import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import { RegisterDonorComponent } from './register-donor/register-donor.component';
import { RegisterHospitalComponent } from './register-hospital/register-hospital.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children:[
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent},
      { path: 'register-donor', component: RegisterDonorComponent},
      {path: 'register-hospital',component: RegisterHospitalComponent,}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
