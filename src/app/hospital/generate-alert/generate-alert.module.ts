import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateAlertPageRoutingModule } from './generate-alert-routing.module';

import { GenerateAlertPage } from './generate-alert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateAlertPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GenerateAlertPage],
  exports: [GenerateAlertPage]
})
export class GenerateAlertPageModule {}
