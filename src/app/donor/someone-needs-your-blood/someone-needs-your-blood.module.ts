import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SomeoneNeedsYourBloodPageRoutingModule } from './someone-needs-your-blood-routing.module';

import { SomeoneNeedsYourBloodPage } from './someone-needs-your-blood.page';
import { AlertNotificationComponent } from '../alert-notification/alert-notification.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SomeoneNeedsYourBloodPageRoutingModule
  ],
  declarations: [SomeoneNeedsYourBloodPage, AlertNotificationComponent],
  exports: [AlertNotificationComponent]
})
export class SomeoneNeedsYourBloodPageModule {}
