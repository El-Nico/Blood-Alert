import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { StoryComponentComponent } from './story-component/story-component.component';
import { HomePageRoutingModule } from './home-routing.module';
import { AlertNotificationModule } from '../donor/alert-notification/alert-notification.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AlertNotificationModule
  ],
  declarations: [HomePage, StoryComponentComponent]
})
export class HomePageModule {}
