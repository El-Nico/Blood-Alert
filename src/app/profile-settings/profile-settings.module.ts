import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileSettingsPageRoutingModule } from './profile-settings-routing.module';

import { ProfileSettingsPage } from './profile-settings.page';
import { AlertNotificationModule } from '../donor/alert-notification/alert-notification.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileSettingsPageRoutingModule,
    AlertNotificationModule
  ],
  declarations: [ProfileSettingsPage]
})
export class ProfileSettingsPageModule {}
