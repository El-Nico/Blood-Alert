import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DonorDetailService } from './donor-detail.service';
import { aDonor } from '../database/models/models';

@Component({
  selector: 'app-donor-detail',
  templateUrl: './donor-detail.page.html',
  styleUrls: ['./donor-detail.page.scss'],
})
export class DonorDetailPage implements OnInit {
  @Input('selectable') selectable:boolean=false
  @Input('closeButtonText') closeButtonText:string='close'
  @Input('title') title: string='mytitledefault'
  @Input('mapCentre') mapCentre: { lat: number, lng: number }={lat:1, lng:-1}
  @Input('donor') donor:aDonor=null;

  approximateETA:string;
  status:string;
  donorAddress:string;

  constructor(
    public modalCtrl : ModalController,
    private donorDetailService: DonorDetailService
  ) { }

  ngOnInit() {
    this.approximateETA=this.donorDetailService.getApproximateETA();
    this.status=this.donorDetailService.getStatus();
    this.donorAddress= this.donorDetailService.getDonorAddress();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
