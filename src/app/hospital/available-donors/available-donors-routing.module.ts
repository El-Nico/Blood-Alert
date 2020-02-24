import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvailableDonorsPage } from './available-donors.page';

const routes: Routes = [
  {
    path: '',
    component: AvailableDonorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvailableDonorsPageRoutingModule {}
