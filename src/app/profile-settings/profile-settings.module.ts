import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileSettingsPageRoutingModule } from './profile-settings-routing.module';

import { ProfileSettingsPage } from './profile-settings.page';
import { AppModule } from '../app.module';
import { SomeoneNeedsYourBloodPageModule } from '../donor/someone-needs-your-blood/someone-needs-your-blood.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileSettingsPageRoutingModule,
    SomeoneNeedsYourBloodPageModule
  ],
  declarations: [ProfileSettingsPage]
})
export class ProfileSettingsPageModule {}
