import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSuccessStoryPage } from './create-success-story.page';

const routes: Routes = [
  {
    path: '',
    component: CreateSuccessStoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSuccessStoryPageRoutingModule {}
