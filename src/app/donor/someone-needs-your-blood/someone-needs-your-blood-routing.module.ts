import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SomeoneNeedsYourBloodPage } from './someone-needs-your-blood.page';

const routes: Routes = [
  {
    path: '',
    component: SomeoneNeedsYourBloodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SomeoneNeedsYourBloodPageRoutingModule {}
