import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateAlertPageRoutingModule } from './generate-alert-routing.module';

import { GenerateAlertPage } from './generate-alert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateAlertPageRoutingModule
  ],
  declarations: [GenerateAlertPage],
  exports: [GenerateAlertPage]
})
export class GenerateAlertPageModule {}
