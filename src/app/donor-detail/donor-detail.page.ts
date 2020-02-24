import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-donor-detail',
  templateUrl: './donor-detail.page.html',
  styleUrls: ['./donor-detail.page.scss'],
})
export class DonorDetailPage implements OnInit {

  constructor(
    public modalCtrl : ModalController
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
