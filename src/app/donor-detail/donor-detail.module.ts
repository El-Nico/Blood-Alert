import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonorDetailPageRoutingModule } from './donor-detail-routing.module';

import { DonorDetailPage } from './donor-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonorDetailPageRoutingModule
  ],
  declarations: [DonorDetailPage],
  exports:[DonorDetailPage]
})
export class DonorDetailPageModule {}
