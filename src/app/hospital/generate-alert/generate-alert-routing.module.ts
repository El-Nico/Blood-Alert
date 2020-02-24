import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateAlertPage } from './generate-alert.page';

const routes: Routes = [
  {
    path: '',
    component: GenerateAlertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateAlertPageRoutingModule {}
