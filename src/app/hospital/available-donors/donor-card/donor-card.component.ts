import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DonorDetailPage } from 'src/app/donor-detail/donor-detail.page';

@Component({
  selector: 'donor-card',
  templateUrl: './donor-card.component.html',
  styleUrls: ['./donor-card.component.scss'],
})
export class DonorCardComponent implements OnInit {

  constructor(
    public modalController : ModalController
  ) { }

  ngOnInit() {
    
  }
status="uncontacted"
onContactDonorClicked(){
  console.log("clicked" +this.status);
  this.status="awaiting response..."
}

goToDonor(){
//open modal
this.presentModal()

}
async presentModal(){
    
  const modal = await this.modalController.create({
    component: DonorDetailPage
  });
  return await modal.present();
}
}
