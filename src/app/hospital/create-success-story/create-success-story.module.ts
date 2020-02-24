import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSuccessStoryPageRoutingModule } from './create-success-story-routing.module';

import { CreateSuccessStoryPage } from './create-success-story.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateSuccessStoryPageRoutingModule
  ],
  declarations: [CreateSuccessStoryPage]
})
export class CreateSuccessStoryPageModule {}
