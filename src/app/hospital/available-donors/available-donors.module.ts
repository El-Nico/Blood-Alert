import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvailableDonorsPageRoutingModule } from './available-donors-routing.module';

import { AvailableDonorsPage } from './available-donors.page';
import { DonorCardComponent } from './donor-card/donor-card.component';
import { DonorDetailPageModule } from 'src/app/donor-detail/donor-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvailableDonorsPageRoutingModule,
    DonorDetailPageModule
  ],
  declarations: [
    AvailableDonorsPage,
  DonorCardComponent
  ]
})
export class AvailableDonorsPageModule {}
