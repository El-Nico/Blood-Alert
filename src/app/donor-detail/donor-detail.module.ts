import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonorDetailPageRoutingModule } from './donor-detail-routing.module';

import { DonorDetailPage } from './donor-detail.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonorDetailPageRoutingModule,
    SharedModule
  ],
  declarations: [DonorDetailPage],
  exports:[DonorDetailPage]
})
export class DonorDetailPageModule {}
