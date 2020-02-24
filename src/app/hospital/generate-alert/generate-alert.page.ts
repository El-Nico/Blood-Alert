import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-generate-alert',
  templateUrl: './generate-alert.page.html',
  styleUrls: ['./generate-alert.page.scss'],
})
export class GenerateAlertPage implements OnInit {

  constructor(
    public router: Router,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  showAvailableDonors(){
    this.router.navigateByUrl('/hospital/available-donors')
    this.dismiss()
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
